FROM golang:alpine as builder

ENV GOPROXY=https://goproxy.cn
ENV CGO_ENABLED=0

WORKDIR /build
ADD . .
RUN go build -o app app.go

FROM alpine:latest

WORKDIR /app
COPY --from=builder /build/app /app/app
ADD ./static ./static

ENTRYPOINT ["/app/app"]