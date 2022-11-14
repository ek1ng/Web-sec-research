# 原型链污染

原型对象也可能拥有原型，并从中继承方法和属性，一层一层、以此类推。

类的所有属性都允许被公开的访问和修改，包括proto，构造函数和原型。
攻击者可以通过注入其他值来覆盖或污染这些proto，构造函数和原型属性。然后，所有继承了被污染原型的对象都会受到影响。

## 环境说明

启动环境
```bash
docker compose up
```

访问 http://127.0.0.1:9090
此环境实现了一个简单的动态页面，利用 `ejs` 将用户输入的用户名和博客链接渲染出来。
其中博客链接处有 xss 检测，不允许使用 `JavaScript` 伪协议
可以利用原型链污染绕绕过 `xss` 检测实现 xss

poc:
```
{"username":"aaa","__proto__":{"blog":"javascript:alert(1)"}}
```

## 建议
* 在开发 JavaScript 应用程序的时候，涉及到对象属性复制的地方，对要复制的 `key` 进行检测。不复制 `__proto__`, `prototype`, `constructor`
* JavaScript 是弱类型语言，在 API 接口处对数据类型进行检查
* 避免使用存在原型链污染的包(如旧版本的 lodash, merge, js-data等)

## 参考
* [EJS Prototype Pollutoin to RCE](https://xz.aliyun.com/t/7025)