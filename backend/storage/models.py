import uuid
from django.db import models

class StoredFile(models.Model):
    class Status(models.TextChoices):
        PENDING = "pending"
        UPLOADED = "uploaded"

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )

    bucket = models.CharField(max_length=50)
    original_name = models.CharField(max_length=255)
    content_type = models.CharField(max_length=100)
    size = models.PositiveBigIntegerField(null=True)

    status = models.CharField(
        max_length=20,
        choices=Status,
        default= Status.PENDING,
    )

    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def is_uploaded(self) -> bool:
        return self.status != StoredFile.Status.PENDING
