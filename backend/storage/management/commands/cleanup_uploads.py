from django.conf import settings
from django.core.management import BaseCommand
from django.utils import timezone
from datetime import timedelta
from storage.models import StoredFile


class Command(BaseCommand):
    help = "Delete abandoned pending uploads older than the token TTL"

    def handle(self, *args, **options):
        cutoff = timezone.now() - timedelta(seconds=settings.TOKEN_TTL)

        stale = StoredFile.objects.filter(
            status = StoredFile.Status.PENDING,
            created_at__lte=cutoff,
        )

        count = stale.count()

        if count > 0:
            stale.delete()
            self.stdout.write(self.style.SUCCESS(f"Deleted {count} abandoned uploads"))
        else:
            self.stdout.write(self.style.SUCCESS(f"No abandoned uploads older than {settings.TOKEN_TTL}"))
