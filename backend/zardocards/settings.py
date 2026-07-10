from datetime import timedelta
from pathlib import Path

import dj_database_url
from decouple import Csv, config

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config("SECRET_KEY", default="django-insecure-dev-key-change-in-production")
DEBUG = config("DEBUG", default=True, cast=bool)
ALLOWED_HOSTS = config("ALLOWED_HOSTS", default="localhost,127.0.0.1", cast=Csv())

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "corsheaders",
    "storages",
    "catalog",
    "orders",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "zardocards.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "zardocards.wsgi.application"

# Database
# Falls back to local SQLite when DATABASE_URL isn't set, so the project
# runs immediately without a Postgres instance. Set DATABASE_URL in .env
# to point at the real Postgres database.
DATABASES = {
    "default": dj_database_url.parse(
        config("DATABASE_URL", default=f"sqlite:///{BASE_DIR / 'db.sqlite3'}"),
        conn_max_age=600,
    )
}

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Media storage (MinIO via django-storages' S3-compatible backend)
# Falls back to local filesystem storage when MINIO_ACCESS_KEY isn't set,
# so the project runs without a MinIO instance. Set the MINIO_* vars in
# .env to point at the real MinIO server.
MINIO_ENDPOINT = config("MINIO_ENDPOINT", default="")
MINIO_ACCESS_KEY = config("MINIO_ACCESS_KEY", default="")
MINIO_SECRET_KEY = config("MINIO_SECRET_KEY", default="")
MINIO_BUCKET_NAME = config("MINIO_BUCKET_NAME", default="zardocards")
MINIO_USE_SSL = config("MINIO_USE_SSL", default=False, cast=bool)
MINIO_PUBLIC_URL = config("MINIO_PUBLIC_URL", default="")

if MINIO_ACCESS_KEY:
    AWS_ACCESS_KEY_ID = MINIO_ACCESS_KEY
    AWS_SECRET_ACCESS_KEY = MINIO_SECRET_KEY
    AWS_STORAGE_BUCKET_NAME = MINIO_BUCKET_NAME
    AWS_S3_ENDPOINT_URL = MINIO_ENDPOINT
    AWS_S3_USE_SSL = MINIO_USE_SSL
    AWS_S3_ADDRESSING_STYLE = "path"
    AWS_DEFAULT_ACL = "public-read"
    AWS_QUERYSTRING_AUTH = False
    AWS_S3_URL_PROTOCOL = "https:" if MINIO_USE_SSL else "http:"
    if MINIO_PUBLIC_URL:
        AWS_S3_CUSTOM_DOMAIN = MINIO_PUBLIC_URL.replace("https://", "").replace("http://", "")

    STORAGES = {
        "default": {"BACKEND": "storages.backends.s3.S3Storage"},
        "staticfiles": {"BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage"},
    }
else:
    MEDIA_URL = "media/"
    MEDIA_ROOT = BASE_DIR / "media"
    STORAGES = {
        "default": {"BACKEND": "django.core.files.storage.FileSystemStorage"},
        "staticfiles": {"BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage"},
    }

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": (
        "rest_framework.permissions.IsAuthenticatedOrReadOnly",
    ),
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 50,
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(hours=8),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
}

CORS_ALLOWED_ORIGINS = config(
    "CORS_ALLOWED_ORIGINS",
    default="http://localhost:3000",
    cast=Csv(),
)

# Email (Brevo SMTP relay)
# Falls back to printing emails to the console when BREVO_SMTP_KEY isn't
# set, so order notifications can be exercised locally without real
# credentials. Set BREVO_SMTP_LOGIN/BREVO_SMTP_KEY in .env to send for real.
BREVO_SMTP_LOGIN = config("BREVO_SMTP_LOGIN", default="")
BREVO_SMTP_KEY = config("BREVO_SMTP_KEY", default="")

if BREVO_SMTP_KEY:
    EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
    EMAIL_HOST = "smtp-relay.brevo.com"
    EMAIL_PORT = 587
    EMAIL_USE_TLS = True
    EMAIL_HOST_USER = BREVO_SMTP_LOGIN
    EMAIL_HOST_PASSWORD = BREVO_SMTP_KEY
else:
    EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

DEFAULT_FROM_EMAIL = config("DEFAULT_FROM_EMAIL", default="ZardoCards <info@zardocards.com>")
ADMIN_NOTIFICATION_EMAIL = config("ADMIN_NOTIFICATION_EMAIL", default="")
