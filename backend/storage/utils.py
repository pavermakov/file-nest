from pathlib import Path
from django.conf import settings

class UnknownBucket(Exception):
    # Raised when a bucket name isn't registered in settings.BUCKETS.
    pass

def bucket_config(bucket):
    try:
        return settings.BUCKETS[bucket]
    except KeyError:
        raise UnknownBucket(bucket) from None

def bucket_path(bucket: str) -> Path:
    cfg = bucket_config(bucket)
    path = settings.MEDIA_ROOT / cfg["subdir"]
    path.mkdir(parents=True, exist_ok=True)

    return path