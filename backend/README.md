# ZardoCards backend

Django + Django REST Framework API backing the storefront and admin panel.

## Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Without a `DATABASE_URL` set in `.env`, the project falls back to local
SQLite so it runs immediately. To use the real Postgres database, set:

```
DATABASE_URL=postgres://user:password@host:5432/dbname
```

## Run

```bash
python manage.py migrate
python manage.py seed_catalog   # imports ../data/products.json and collections.json
python manage.py createsuperuser
python manage.py runserver 8000
```

`seed_catalog` is idempotent — running it again updates existing rows
instead of duplicating them, so it's safe to re-run after re-scraping.

## API

All endpoints are under `/api/`. Reads are open; writes require a JWT.

- `POST /api/auth/login/` — `{ username, password }` → `{ access, refresh }`
- `POST /api/auth/refresh/` — `{ refresh }` → `{ access }`
- `/api/products/` — list (paginated, `?search=`), retrieve/update/delete by `handle`
- `/api/categories/` — same shape, includes `product_count`
- `/api/orders/` — list/create/retrieve/update, nested `items`

Django admin is at `/admin/`.

## Apps

- `catalog` — `Category`, `Product` models and API
- `orders` — `Order`, `OrderItem` models and API
