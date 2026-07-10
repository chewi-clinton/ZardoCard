# ZardoCards MinIO

Standalone MinIO deployment for the ZardoCards backend's image storage.
This branch's only purpose is the Dockerfile needed to deploy it —
everything else in the repo is leftover scaffold from other branches
and isn't used by this build.

## Deploying on Dokploy

1. Create a new application pointing at this repo, branch `minio`, build type **Dockerfile**.
2. Set these environment variables:
   - `MINIO_ROOT_USER` — access key (pick something new, not a real username)
   - `MINIO_ROOT_PASSWORD` — secret key (at least 8 characters)
3. Expose both ports:
   - `9000` — the S3-compatible API (this is what the backend talks to)
   - `9001` — the web console (optional, for browsing buckets by hand)
4. Attach a **persistent volume** mounted at `/data` — without this, all
   uploaded images are lost on redeploy.
5. Attach a domain to port `9000` if you want the API reachable at a
   real hostname (recommended) instead of an IP:port.

## After it's deployed

Send over:
- The endpoint URL (e.g. `https://minio.yourdomain.com` or `http://ip:9000`)
- `MINIO_ROOT_USER` / `MINIO_ROOT_PASSWORD`

I'll create the bucket, set its read policy, and point the Django
backend's `MINIO_*` settings at it.
