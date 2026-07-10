import json
from pathlib import Path

from django.conf import settings
from django.core.files import File
from django.core.management.base import BaseCommand

from catalog.models import Category, Product

DATA_DIR = settings.BASE_DIR.parent / "data"
PUBLIC_DIR = settings.BASE_DIR.parent / "public"


class Command(BaseCommand):
    help = (
        "Uploads the scraped product/category images from the frontend's "
        "public/ directory into the configured storage backend (MinIO or "
        "local disk), attaching them to their Product/Category rows."
    )

    def add_arguments(self, parser):
        parser.add_argument(
            "--force",
            action="store_true",
            help="Re-upload even if the row already has an image.",
        )

    def handle(self, *args, **options):
        force = options["force"]
        self.backfill_products(force)
        self.backfill_categories(force)

    def backfill_products(self, force):
        products = json.loads((DATA_DIR / "products.json").read_text())
        uploaded, skipped, missing = 0, 0, 0

        for handle, p in products.items():
            local_image = p.get("localImage")
            if not local_image:
                continue

            try:
                product = Product.objects.get(handle=handle)
            except Product.DoesNotExist:
                continue

            if product.image and not force:
                skipped += 1
                continue

            file_path = PUBLIC_DIR / local_image.lstrip("/")
            if not file_path.exists():
                missing += 1
                self.stderr.write(f"Missing file for {handle}: {file_path}")
                continue

            with open(file_path, "rb") as f:
                product.image.save(file_path.name, File(f), save=True)
            uploaded += 1

        self.stdout.write(self.style.SUCCESS(
            f"Products: {uploaded} uploaded, {skipped} skipped, {missing} missing"
        ))

    def backfill_categories(self, force):
        collections = json.loads((DATA_DIR / "collections.json").read_text())
        uploaded, skipped, missing = 0, 0, 0

        for handle, c in collections.items():
            banner_image = c.get("bannerImage")
            if not banner_image:
                continue

            try:
                category = Category.objects.get(handle=handle)
            except Category.DoesNotExist:
                continue

            if category.banner_image and not force:
                skipped += 1
                continue

            file_path = PUBLIC_DIR / banner_image.lstrip("/")
            if not file_path.exists():
                missing += 1
                self.stderr.write(f"Missing file for {handle}: {file_path}")
                continue

            with open(file_path, "rb") as f:
                category.banner_image.save(file_path.name, File(f), save=True)
            uploaded += 1

        self.stdout.write(self.style.SUCCESS(
            f"Categories: {uploaded} uploaded, {skipped} skipped, {missing} missing"
        ))
