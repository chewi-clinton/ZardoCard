FROM minio/minio:latest

EXPOSE 9000 9001

VOLUME ["/data"]

ENTRYPOINT ["minio"]
CMD ["server", "/data", "--console-address", ":9001"]
