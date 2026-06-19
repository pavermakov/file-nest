from django.urls import path
from .views import DirectUploadView, FileDetailView, CreateUploadView, FileMetaView, LargeFileUploadView

urlpatterns = [
    path('uploads/', CreateUploadView.as_view(), name='create-upload'),
    path('upload-direct/<str:token>', DirectUploadView.as_view(), name='upload-direct'),
    path('files/<uuid:file_id>/', FileDetailView.as_view()),
    path('files/<uuid:file_id>/meta', FileMetaView.as_view()),
    path('upload-large/', LargeFileUploadView.as_view()),
]