import{_ as e,o as n,c as t,R as r}from"./chunks/framework.4iRWb_64.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"后端/nginx/负载均衡.md","filePath":"后端/nginx/负载均衡.md"}'),s={name:"后端/nginx/负载均衡.md"},a=r(`<h3 id="nginx" tabindex="-1">nginx <a class="header-anchor" href="#nginx" aria-label="Permalink to &quot;nginx&quot;">​</a></h3><ul><li>负载均衡 upstream</li><li>域名配置</li><li>443 https配置</li></ul><p>命令</p><ul><li>检查：nginx -t</li><li>重启：nginx -s reload</li></ul><pre><code>#upstream qysocket {
#    server    127.0.0.1:8848 weight=2;
#    server    127.0.0.1:8849 weight=1;
#}
server {
       listen 80;
       server_name 域名;
       rewrite ^(.*)$ https://\${server_name}$1 permanent;
}
server {
        # https
       listen 443 ssl;
       server_name 域名;
       # 证书    
       ssl_certificate      /etc/nginx/ssh/ibangche.com/1_ibangche.com_bundle.crt;
       ssl_certificate_key  /etc/nginx/ssh/ibangche.com/2_ibangche.com.key;


       ssl_session_timeout  5m;
       client_max_body_size 10m;


       location / {
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection &quot;upgrade&quot;;    # socket配置
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $host;
            proxy_pass  http://qysocket;
	        proxy_pass http://127.0.0.1:8848;
       }
}
</code></pre><ul><li>upstream：这个模块提供一个简单方法来实现在轮询和客户端IP之间的后端服务器负荷平衡 <ul><li>官网：<a href="https://www.nginx.cn/doc/standard/httpupstream.html" target="_blank" rel="noreferrer">https://www.nginx.cn/doc/standard/httpupstream.html</a></li></ul></li></ul>`,6),i=[a];function o(_,l,c,p,d,h){return n(),t("div",null,i)}const x=e(s,[["render",o]]);export{u as __pageData,x as default};
