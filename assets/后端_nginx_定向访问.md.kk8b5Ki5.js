import{_ as e,o,c as a,R as t,aL as n,aM as r,aN as i}from"./chunks/framework.4iRWb_64.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"后端/nginx/定向访问.md","filePath":"后端/nginx/定向访问.md"}'),_={name:"后端/nginx/定向访问.md"},s=t(`<h3 id="nginx-location" tabindex="-1">nginx location <a class="header-anchor" href="#nginx-location" aria-label="Permalink to &quot;nginx location&quot;">​</a></h3><pre><code>// 参考定向
server {
  ......
  location /api... {
    proxy_set_header Host $host;
	proxy_set_header X-Real-IP $remote_addr;
	proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_pass http://127.0.0.1:端口
  }
}
</code></pre><h3 id="假设请求地址" tabindex="-1">假设请求地址： <a class="header-anchor" href="#假设请求地址" aria-label="Permalink to &quot;假设请求地址：&quot;">​</a></h3><pre><code>http://localhost/online/wxapi/test/loginSwitch
</code></pre><ul><li><code>proxy_pass</code>最后没有<code>/</code>结尾 <ul><li>有则从location /... 处截断 <img src="`+n+'"></li><li>无则从location /... 处开始拼接 <img src="'+r+'"></li><li>指定匹配路径 <img src="'+i+'"></li></ul></li></ul>',5),c=[s];function l(d,p,h,x,m,u){return o(),a("div",null,c)}const P=e(_,[["render",l]]);export{g as __pageData,P as default};
