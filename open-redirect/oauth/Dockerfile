FROM golang:alpine as builder

ENV GOPROXY=https://goproxy.cn
ENV CGO_ENABLED=0

WORKDIR /build
ADD . .
RUN go build -o oauth oauth.go

FROM alpine:latest

WORKDIR /app
COPY --from=builder /build/oauth /app/oauth
ADD ./static ./static

ENTRYPOINT ["/app/oauth"]