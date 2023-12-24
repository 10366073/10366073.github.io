import{_ as a,o as s,c as e,R as n,ax as l,ay as t}from"./chunks/framework.4iRWb_64.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"后端/mysql/主从复制.md","filePath":"后端/mysql/主从复制.md"}'),r={name:"后端/mysql/主从复制.md"},o=n(`<p><strong>主服务器：阿里云 ；从服务器：Mac本地服务器[主从数据库版本最好一致]</strong></p><h2 id="主服务器配置-etc-mysql-mysql-conf-d" tabindex="-1">主服务器配置 /etc/mysql/mysql.conf.d <a class="header-anchor" href="#主服务器配置-etc-mysql-mysql-conf-d" aria-label="Permalink to &quot;主服务器配置 /etc/mysql/mysql.conf.d&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>[mysqld]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>pid-file = /var/run/mysqld/mysqld.pid</span></span>
<span class="line"><span></span></span>
<span class="line"><span>socket = /var/run/mysqld/mysqld.sock</span></span>
<span class="line"><span></span></span>
<span class="line"><span>datadir = /var/lib/mysql</span></span>
<span class="line"><span></span></span>
<span class="line"><span>log-error = /var/log/mysql/error.log</span></span>
<span class="line"><span></span></span>
<span class="line"><span>log-bin = mysql-bin #开启二进制日志</span></span>
<span class="line"><span></span></span>
<span class="line"><span>server-id = 1 #设置server-id</span></span>
<span class="line"><span></span></span>
<span class="line"><span>binlog-do-db = test_db # 只同步test_db</span></span></code></pre></div><h3 id="创建数据库-用户-赋予权限-全程在root用户下" tabindex="-1">创建数据库，用户，赋予权限[全程在root用户下] <a class="header-anchor" href="#创建数据库-用户-赋予权限-全程在root用户下" aria-label="Permalink to &quot;创建数据库，用户，赋予权限\\[全程在root用户下]&quot;">​</a></h3><pre><code>CREATE DATABASE IF NOT EXISTS test_db; #创建数据库

CREATE USER &#39;test1&#39;@&#39;IP&#39; IDENTIFIED BY &#39;test1&#39;;#创建用户

GRANT ALL PRIVILEGES ON \`test_db\`.* TO \`test1\`@\`%\` WITH GRANT OPTION;#赋予增删改查权限

GRANT REPLICATION SLAVE ON *.* TO &#39;test1&#39;@&#39;%&#39;;#建立复制时

FLUSH PRIVILEGES;#刷新权限
</code></pre><h3 id="重启mysql" tabindex="-1">重启mysql <a class="header-anchor" href="#重启mysql" aria-label="Permalink to &quot;重启mysql&quot;">​</a></h3><pre><code>service mysql restart
</code></pre><h3 id="查看mysql的test1用户信息" tabindex="-1">查看mysql的test1用户信息 <a class="header-anchor" href="#查看mysql的test1用户信息" aria-label="Permalink to &quot;查看mysql的test1用户信息&quot;">​</a></h3><img src="`+l+`"><ul><li>file：mysql-bin.000001</li><li>position：559</li></ul><h2 id="从服务器" tabindex="-1">从服务器 <a class="header-anchor" href="#从服务器" aria-label="Permalink to &quot;从服务器&quot;">​</a></h2><h3 id="参考【mac】mysql8-0版本添加配置文件my-cnf" tabindex="-1">参考【MAC】MYSQL8.0版本添加配置文件MY.CNF <a class="header-anchor" href="#参考【mac】mysql8-0版本添加配置文件my-cnf" aria-label="Permalink to &quot;参考【MAC】MYSQL8.0版本添加配置文件MY.CNF&quot;">​</a></h3><ul><li>mysql安装路径在 /usr/local/mysql</li></ul><h3 id="在路径-usr-etc中创建-my-cnf文件" tabindex="-1">在路径 /usr/etc中创建 <strong>my.cnf</strong>文件 <a class="header-anchor" href="#在路径-usr-etc中创建-my-cnf文件" aria-label="Permalink to &quot;在路径 /usr/etc中创建 **my.cnf**文件&quot;">​</a></h3><pre><code>[client]

default-character-set = utf8

[mysqld]

server-id = 2 #设置server-id,必须唯一

character-set-server = utf8
</code></pre><h3 id="重启mysql-1" tabindex="-1">重启mysql <a class="header-anchor" href="#重启mysql-1" aria-label="Permalink to &quot;重启mysql&quot;">​</a></h3><pre><code>sudo /usr/local/mysql/support-files/mysql.server restart
</code></pre><h3 id="连接slave-若已开启需要先暂停slave" tabindex="-1">连接slave，若已开启需要先暂停slave <a class="header-anchor" href="#连接slave-若已开启需要先暂停slave" aria-label="Permalink to &quot;连接slave，若已开启需要先暂停slave&quot;">​</a></h3><pre><code>slave stop/start;
</code></pre><pre><code>CHANGE MASTER TO

CHANGE_HOST = &#39;IP&#39;,

CHANGE_USER = &#39;test1&#39;,

CHANGE_PASSWORD = &#39;密码&#39;,

CHANGE_LOG_FILE = &#39;mysql-bin.000001&#39;,

MASTER_LOG_POS = 559;
</code></pre><h3 id="查看连接状态-slave-双yes则表示连接成功" tabindex="-1">查看连接状态，Slave_双YES则表示连接成功 <a class="header-anchor" href="#查看连接状态-slave-双yes则表示连接成功" aria-label="Permalink to &quot;查看连接状态，Slave\\_双YES则表示连接成功&quot;">​</a></h3><pre><code>show slave status\\G
</code></pre><ul><li><p>Slave_IO_Running: YES</p></li><li><p>Slave_SQL_Running: YES</p></li><li><p>两个都是YES则连接成功</p></li></ul><h2 id="扩展-常见问题排查" tabindex="-1">扩展 常见问题排查 <a class="header-anchor" href="#扩展-常见问题排查" aria-label="Permalink to &quot;扩展 常见问题排查&quot;">​</a></h2><p>1.主服务器是云服务器，没有开通安全组；</p><p>2.账户密码错误；</p><p>3.连接服务器时语法；</p><p>4.mysql配置文件问题；</p><p>5.主服务器mysql权限；</p><p>6.从数据库没创建；</p><h3 id="扩展思维-可互为主从-实现读写分离" tabindex="-1">扩展思维 可互为主从，实现读写分离 <a class="header-anchor" href="#扩展思维-可互为主从-实现读写分离" aria-label="Permalink to &quot;扩展思维 可互为主从，实现读写分离&quot;">​</a></h3><img src="`+t+'">',32),i=[o];function p(c,d,m,h,q,u){return s(),e("div",null,i)}const b=a(r,[["render",p]]);export{_ as __pageData,b as default};
