import{_ as n,o as s,c as e,R as a,k as i,a as t,aG as h,aH as r,aI as l,aJ as o,aK as p}from"./chunks/framework.4iRWb_64.js";const f=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"后端/nginx/代理.md","filePath":"后端/nginx/代理.md"}'),c={name:"后端/nginx/代理.md"},k=a(`<h3 id="ubantu-安装-nginx" tabindex="-1">Ubantu 安装 Nginx <a class="header-anchor" href="#ubantu-安装-nginx" aria-label="Permalink to &quot;Ubantu 安装 Nginx&quot;">​</a></h3><pre><code>sudo apt install nginx
</code></pre><h4 id="文件位置" tabindex="-1">文件位置 <a class="header-anchor" href="#文件位置" aria-label="Permalink to &quot;文件位置&quot;">​</a></h4><ul><li>/usr/sbin/nginx：主程序</li><li>/etc/nginx：存放配置文件</li><li>/usr/share/nginx：存放静态文件</li><li>/var/log/nginx：存放日志</li></ul><h4 id="启动命令" tabindex="-1">启动命令 <a class="header-anchor" href="#启动命令" aria-label="Permalink to &quot;启动命令&quot;">​</a></h4><pre><code>service nginx start  # 启动nginx
service nginx reload  # 重新加载nginx配置文件
</code></pre><h4 id="另外两个命令" tabindex="-1">另外两个命令 <a class="header-anchor" href="#另外两个命令" aria-label="Permalink to &quot;另外两个命令&quot;">​</a></h4><pre><code>nginx -s reopen            # 重启 Nginx
nginx -s stop              # 停止 Nginx
</code></pre><h2 id="nginx只有在反向代理时才有缓存" tabindex="-1">Nginx只有在反向代理时才有缓存 <a class="header-anchor" href="#nginx只有在反向代理时才有缓存" aria-label="Permalink to &quot;Nginx只有在反向代理时才有缓存&quot;">​</a></h2>`,9),d=i("h3",{Proxy:"",Setting:"",id:"nginx-conf配置文件-http",tabindex:"-1"},[t("nginx.conf配置文件 http "),i("a",{class:"header-anchor",href:"#nginx-conf配置文件-http","aria-label":'Permalink to "nginx.conf配置文件 http {Proxy Setting}"'},"​")],-1),g=a(`<pre><code>##
# Proxy Setting
##
proxy_connect_timeout 10; #服务器连接的超时时间
proxy_read_timeout 180; # 连接成功后,等候后端服务器响应时间
proxy_send_timeout 5; #后端服务器数据回传时间
proxy_buffer_size 16k; #缓冲区的大小
proxy_buffers 4 32k; #每个连接设置缓冲区的数量为number，每块缓冲区的大小为size
proxy_busy_buffers_size 96k; #开启缓冲响应的功能以后，在没有读到全部响应的情况下，写缓冲到达一定大小时，nginx一定会向客户端发送响应，直到缓冲小于此值。
proxy_temp_file_write_size 96k; #设置nginx每次写数据到临时文件的size(大小)限制
proxy_temp_path /etc/nginx/temp; #proxy缓存临时文件的大小
proxy_cache_path /etc/nginx/cache levels=1:2 keys_zone=cache_one:100m inactive=1d max_size=10g; #设置缓存的路径和其他参数。被缓存的数据如果在inactive参数（当前为1天）指定的时间内未被访问，就会被从缓存中移除
</code></pre><h3 id="etc-nginx-temp-和-etc-nginx-cache-文件需要提前创建并赋予权限" tabindex="-1">/etc/nginx/temp 和 /etc/nginx/cache 文件需要提前创建并赋予权限 <a class="header-anchor" href="#etc-nginx-temp-和-etc-nginx-cache-文件需要提前创建并赋予权限" aria-label="Permalink to &quot;/etc/nginx/temp 和 /etc/nginx/cache 文件需要提前创建并赋予权限&quot;">​</a></h3><img src="`+h+`"><h3 id="模拟假设资源在-var-www-example-com-入口在-var-www-html" tabindex="-1">模拟假设资源在 /var/www/example.com，入口在/var/www/html <a class="header-anchor" href="#模拟假设资源在-var-www-example-com-入口在-var-www-html" aria-label="Permalink to &quot;模拟假设资源在 /var/www/example.com，入口在/var/www/html&quot;">​</a></h3><pre><code>server {
	listen 80 default_server;
	listen [::]:80 default_server;
	root /var/www/html;
	index index.html index.htm index.nginx-debian.html;
	server_name _;
	#要缓存文件的后缀，可以在以下设置。
        location ~ .*\\.(gif|jpg|png|jpeg|css|js)(.*) {
                proxy_pass http://127.0.0.1:90; #\bnginx缓存里拿不到资源，向该地址转发请求，拿到新的资源，并进行缓存
                proxy_redirect off; #设置后端服务器“Location”响应头和“Refresh”响应头的替换文本
                proxy_set_header Host $host; #允许重新定义或者添加发往后端服务器的请求头
                proxy_cache cache_one; #指定用于页面缓存的共享内存，对应http层设置的keys_zone
                #为不同的响应状态码设置不同的缓存时间
                proxy_cache_valid 200 302 24h;
                proxy_cache_valid 301 30d;
                proxy_cache_valid any 5m;
                expires 3m; # 显示给前端缓存时间
                add_header wall  &quot;hey!guys!give me a star.&quot;;
        }
	location / {
        }
}
server {
	listen 90;
	listen [::]:90;
	root /var/www/example.com;
	location / {
	}
}
</code></pre><h3 id="测试-二次刷新出现" tabindex="-1">测试，二次刷新出现 <a class="header-anchor" href="#测试-二次刷新出现" aria-label="Permalink to &quot;测试，二次刷新出现&quot;">​</a></h3><img src="`+r+'"><h3 id="服务器缓存文件" tabindex="-1">服务器缓存文件 <a class="header-anchor" href="#服务器缓存文件" aria-label="Permalink to &quot;服务器缓存文件&quot;">​</a></h3><img src="'+l+'"><h3 id="删除服务器缓存文件-可以判断是浏览器缓存" tabindex="-1">删除服务器缓存文件，可以判断是浏览器缓存 <a class="header-anchor" href="#删除服务器缓存文件-可以判断是浏览器缓存" aria-label="Permalink to &quot;删除服务器缓存文件，可以判断是浏览器缓存&quot;">​</a></h3><img src="'+o+'"><p>选择disable cancel强制刷新</p><img src="'+p+`"><h3 id="html-禁止浏览器缓存" tabindex="-1">HTML 禁止浏览器缓存 <a class="header-anchor" href="#html-禁止浏览器缓存" aria-label="Permalink to &quot;HTML 禁止浏览器缓存&quot;">​</a></h3><div class="language-HTML vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">HTML</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">meta</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> http-equiv</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Expires&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;0&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">meta</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> http-equiv</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Pragm&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;no-cache&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">meta</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> http-equiv</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Cache-control&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;no-cache&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">meta</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> http-equiv</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Cache&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;no-cache&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div>`,15),_=[k,d,g];function x(E,u,m,y,q,b){return s(),e("div",null,_)}const v=n(c,[["render",x]]);export{f as __pageData,v as default};
