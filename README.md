# ZardoCards MinIO

Standalone MinIO deployment for the ZardoCards backend's image storage.
This branch's only purpose is the docker-compose.yml needed to deploy
it — everything else in the repo is leftover scaffold from other
branches and isn't used by this build.

## Deploying on Dokploy

1. Create a new application pointing at this repo, branch `minio`, build type **Compose**.
2. Set these environment variables (Dokploy passes them through to the compose file):
   - `MINIO_ROOT_USER` — access key (pick something new, not a real username)
   - `MINIO_ROOT_PASSWORD` — secret key (at least 8 characters)
3. Ports are already declared in the compose file:
   - `13002:9000` — the S3-compatible API (this is what the backend talks to)
   - `13003:9001` — the web console (optional, for browsing buckets by hand)
4. The compose file already declares a named volume (`minio_data`) mounted
   at `/data` for persistence — confirm Dokploy keeps it across redeploys.
5. Attach a domain to port `13002` if you want the API reachable at a
   real hostname (recommended) instead of an IP:port.

## After it's deployed

Send over:
- The endpoint URL (e.g. `https://minio.yourdomain.com` or `http://ip:13002`)
- `MINIO_ROOT_USER` / `MINIO_ROOT_PASSWORD`

I'll create the bucket, set its read policy, and point the Django
backend's `MINIO_*` settings at it.
