import json

from django.conf import settings
from django.core.management.base import BaseCommand

from catalog.models import Category, Product

DATA_DIR = settings.BASE_DIR.parent / "data"


class Command(BaseCommand):
    help = "Imports the scraped product/collection JSON data into the database."

    def handle(self, *args, **options):
        self.seed_categories()
        self.seed_products()
        self.link_categories_to_products()

    def seed_categories(self):
        path = DATA_DIR / "collections.json"
        collections = json.loads(path.read_text())

        created, updated = 0, 0
        for handle, c in collections.items():
            _, was_created = Category.objects.update_or_create(
                handle=handle,
                defaults={
                    "title": c["title"],
                    "description": c.get("description") or "",
                },
            )
            created += was_created
            updated += not was_created

        self.stdout.write(self.style.SUCCESS(
            f"Categories: {created} created, {updated} updated"
        ))

    def seed_products(self):
        path = DATA_DIR / "products.json"
        products = json.loads(path.read_text())

        created, updated = 0, 0
        for handle, p in products.items():
            _, was_created = Product.objects.update_or_create(
                handle=handle,
                defaults={
                    "title": p["title"],
                    "description": p.get("bodyHtml") or "",
                    "vendor": p.get("vendor") or "",
                    "price": p.get("price") or 0,
                    "compare_at_price": p.get("compareAtPrice"),
                    "variant_count": p.get("variantCount") or 1,
                },
            )
            created += was_created
            updated += not was_created

        self.stdout.write(self.style.SUCCESS(
            f"Products: {created} created, {updated} updated"
        ))

    def link_categories_to_products(self):
        path = DATA_DIR / "collections.json"
        collections = json.loads(path.read_text())

        links = 0
        for handle, c in collections.items():
            try:
                category = Category.objects.get(handle=handle)
            except Category.DoesNotExist:
                continue

            product_handles = c.get("productHandles") or []
            products = Product.objects.filter(handle__in=product_handles)
            category.products.set(products)
            links += products.count()

        self.stdout.write(self.style.SUCCESS(f"Linked {links} category/product relations"))
