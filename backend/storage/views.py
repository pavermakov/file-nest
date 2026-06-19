from django.core import signing
from django.http import FileResponse
from django.urls import reverse
from django.shortcuts import get_object_or_404
from django.conf import settings
from filetype import filetype
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import StoredFile
from .utils import bucket_path

class CreateUploadView(APIView):
    def post(self, request):
        bucket = request.data.get("bucket")

        if not bucket:
            return Response({"error": "No bucket provided"}, status=status.HTTP_400_BAD_REQUEST)

        if bucket not in settings.BUCKETS:
            return Response({"error": f"Unknown bucket: {bucket!r}"}, status=status.HTTP_400_BAD_REQUEST)

        stored = StoredFile.objects.create(
            bucket=bucket,
            original_name="",
            content_type="",
            size=0,
            status=StoredFile.Status.PENDING
        )

        token = signing.dumps({ "bucket": bucket, "file_id": str(stored.id) })
        upload_path = reverse("upload-direct", args=[token])
        uploaded_url = request.build_absolute_uri(upload_path)

        return Response({"upload_url": uploaded_url}, status=status.HTTP_201_CREATED)


class DirectUploadView(APIView):
    def put(self, request, token):
        try:
            data = signing.loads(token, max_age=settings.TOKEN_TTL)
        except signing.SignatureExpired:
            return Response({"error_type": "token_violation", "error_message": "Token expired"}, status=status.HTTP_403_FORBIDDEN)
        except signing.BadSignature:
            return Response({"error_type": "token_violation", "error_message": "Token is tampered or invalid"}, status=status.HTTP_403_FORBIDDEN)

        bucket = data.get("bucket")
        file_id = data.get("file_id")

        try:
            stored = StoredFile.objects.get(id=file_id)
        except StoredFile.DoesNotExist:
            return Response({"error": "File not found"}, status=status.HTTP_404_NOT_FOUND)

        if stored.is_uploaded:
            return Response({"error": "File already uploaded"}, status=status.HTTP_409_CONFLICT)

        # стрим даты, не напрямую
        uploaded = request.FILES.get("file")

        if uploaded is None:
            return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)

        config = settings.BUCKETS[bucket]

        if uploaded.size > config["max_size"]:
            return Response({"error": "File too large"}, status=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE)

        if uploaded.content_type not in config["allowed_types"]:
            return Response({"error": f"content-type {uploaded.content_type!r} not allowed for this bucket"}, status=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE)


        kind = filetype.guess(uploaded.read(261))
        uploaded.seek(0)

        if kind is None:
            return Response({"error": "File contents do not match the declared content-type"}, status=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE)

        allowed = config["allowed_types"]

        if kind.mime not in allowed:
            return Response({"error": f"Rejected: real type '{kind.mime}' not allowed in bucket '{bucket}'"}, status=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE)

        ext = allowed[uploaded.content_type]
        dest = bucket_path(bucket) / f"{stored.id}{ext}"

        with open(dest, "wb") as f:
            for chunk in uploaded.chunks():
                f.write(chunk)

        stored.original_name = uploaded.name
        stored.content_type = uploaded.content_type
        stored.size = uploaded.size
        stored.status = StoredFile.Status.UPLOADED
        stored.save()

        return Response({"file_id": str(stored.id)}, status=status.HTTP_201_CREATED)

class FileDetailView(APIView):
    def get(self, request, file_id):
        record = get_object_or_404(StoredFile, id=file_id)
        ext = settings.BUCKETS[record.bucket]["allowed_types"][record.content_type]
        dest = bucket_path(record.bucket) / f"{record.id}{ext}"

        return FileResponse(open(dest, "rb"), content_type=record.content_type)


class FileMetaView(APIView):
    def get(self, request, file_id):
        record = get_object_or_404(StoredFile, id=file_id)
        return Response({
            "id": str(record.id),
            "content_type": record.content_type,
            "size": record.size,
            "status": record.status,
            "original_name": record.original_name,
            "created_at": record.created_at
        }, status=status.HTTP_200_OK)

class LargeFileUploadView(APIView):
    def put(self, request):
        uploaded = request.FILES.get("file")
        dest = settings.MEDIA_ROOT / "large" / "large.jpg"

        with open(dest, "wb") as f:
            for chunk in uploaded.chunks():
                f.write(chunk)

        return Response(status=status.HTTP_201_CREATED)



