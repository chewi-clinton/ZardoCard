from django.contrib import admin

from .models import Category, Product


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["title", "handle", "created_at"]
    search_fields = ["title", "handle"]


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["title", "handle", "vendor", "price"]
    search_fields = ["title", "handle", "vendor"]
    filter_horizontal = ["categories"]
