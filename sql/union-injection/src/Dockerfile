FROM golang:alpine as builder
WORKDIR /app
ADD . .
RUN GOPROXY="https://goproxy.cn" go build -o main
FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/main /app/
ENTRYPOINT ["/app/main"]
EXPOSE 80