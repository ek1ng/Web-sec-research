#!/bin/bash

redis-server /etc/redis/redis.conf &
/usr/sbin/sshd -D