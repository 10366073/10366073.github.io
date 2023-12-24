import{_ as n,o as s,c as a,R as p}from"./chunks/framework.4iRWb_64.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"后端/nginx/访问频率.md","filePath":"后端/nginx/访问频率.md"}'),e={name:"后端/nginx/访问频率.md"},i=p(`<h3 id="限制所有单个ip的访问频率" tabindex="-1">限制所有单个ip的访问频率 <a class="header-anchor" href="#限制所有单个ip的访问频率" aria-label="Permalink to &quot;限制所有单个ip的访问频率&quot;">​</a></h3><p>1、http中的配置</p><pre><code>http {
    #$limit_conn_zone：限制并发连接数
    limit_conn_zone $binary_remote_addr zone=one1:10m;

    #limit_req_zone：请求频率
    #$binary_remote_addr：以客户端IP进行限制
    #zone=one:10m：创建IP存储区大小为10M,用来存储访问频率
    #rate=10r/s：表示客户端的访问评率为每秒10次
    limit_req_zone $binary_remote_addr zone=one2:10m   rate=10r/s;
     
}    
</code></pre><p>2、server配置</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>server {</span></span>
<span class="line"><span>        listen       80;</span></span>
<span class="line"><span>        server_name  localhost;</span></span>
<span class="line"><span>        location / {</span></span>
<span class="line"><span>            #限制并发数2</span></span>
<span class="line"><span>            limit_conn  one1  2;  </span></span>
<span class="line"><span>            #burst：如果请求的频率超过了限制域配置的值，请求处理会被延迟</span></span>
<span class="line"><span>            #nodelay：超过频率限制的请求会被延迟，直到被延迟的请求数超过了定义的阈值，这个请求会被终止，并返回503</span></span>
<span class="line"><span>            limit_req   zone=one2 burst=10 nodelay;</span></span>
<span class="line"><span>            root   html;</span></span>
<span class="line"><span>            index  index.html index.htm;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="二、访问白名单的配置" tabindex="-1">二、访问白名单的配置 <a class="header-anchor" href="#二、访问白名单的配置" aria-label="Permalink to &quot;二、访问白名单的配置&quot;">​</a></h3><p>1、http中的配置</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>http {</span></span>
<span class="line"><span># geo：指令定义了一个白名单$limited变量，默认值为1，如果客户端ip在上面的范围内，$limited的值为0</span></span>
<span class="line"><span>    geo $limited{</span></span>
<span class="line"><span>        default 1;</span></span>
<span class="line"><span>        10.0.0.140 0;  #把10.0.0.140设置为白名单</span></span>
<span class="line"><span>        10.0.0.141 0;  #白名单ip,可继续添加</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    #使用map指令映射搜索引擎客户端的ip为空串，如果不是搜索引擎就显示本身真是的ip</span></span>
<span class="line"><span>    #这样搜索引擎ip就不能存到limit_req_zone内存session中，所以不会限制搜索引擎的ip访问</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    map $limited $limit {    </span></span>
<span class="line"><span>        1 $binary_remote_addr;   </span></span>
<span class="line"><span>        0 &quot;&quot;;    </span></span>
<span class="line"><span>    }  </span></span>
<span class="line"><span>    limit_conn_zone $limit zone=one:20m;</span></span>
<span class="line"><span>    limit_req_zone $limit zone=one2:20m   rate=10r/s; </span></span>
<span class="line"><span>}</span></span></code></pre></div><p>2、server配置</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>server {</span></span>
<span class="line"><span>        listen       80;</span></span>
<span class="line"><span>        server_name  localhost;</span></span>
<span class="line"><span>        location / {</span></span>
<span class="line"><span>            limit_conn  one  2;   </span></span>
<span class="line"><span>            limit_req   zone=one2 burst=10 nodelay; </span></span>
<span class="line"><span>            root   html;</span></span>
<span class="line"><span>            index  index.html index.htm;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre></div>`,10),l=[i];function t(o,c,r,d,_,m){return s(),a("div",null,l)}const g=n(e,[["render",t]]);export{u as __pageData,g as default};
