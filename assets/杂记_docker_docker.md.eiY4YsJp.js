import{_ as e,o as n,c as a,R as t,aT as r}from"./chunks/framework.4iRWb_64.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"杂记/docker/docker.md","filePath":"杂记/docker/docker.md"}'),o={name:"杂记/docker/docker.md"},i=t(`<h3 id="安装教程" tabindex="-1">安装教程 <a class="header-anchor" href="#安装教程" aria-label="Permalink to &quot;安装教程&quot;">​</a></h3><p><a href="https://www.runoob.com/docker/docker-install-mysql.html" target="_blank" rel="noreferrer">https://www.runoob.com/docker/docker-install-mysql.html</a></p><h3 id="替换下载地址" tabindex="-1">替换下载地址 <a class="header-anchor" href="#替换下载地址" aria-label="Permalink to &quot;替换下载地址&quot;">​</a></h3><pre><code>{
  &quot;debug&quot;: true,
  &quot;registry-mirrors&quot;: [
    &quot;https://hub-mirror.c.163.com&quot;
  ],
  &quot;experimental&quot;: false
}
</code></pre><h3 id="拉取ubuntu" tabindex="-1">拉取Ubuntu <a class="header-anchor" href="#拉取ubuntu" aria-label="Permalink to &quot;拉取Ubuntu&quot;">​</a></h3><pre><code>docker pull ubuntu
</code></pre><p>默认最新版[可指定版本<strong>ubuntu:15.10</strong>: 这是指用 ubuntu 15.10 版本镜像为基础来启动容器]</p><h3 id="根据镜像的-image-id-运行容器" tabindex="-1">根据镜像的 IMAGE ID 运行容器 <a class="header-anchor" href="#根据镜像的-image-id-运行容器" aria-label="Permalink to &quot;根据镜像的 IMAGE ID 运行容器&quot;">​</a></h3><pre><code>docker run -it --name hlg-demo IMAGE ID /bin/sh
</code></pre><ul><li><strong>-i</strong>: 交互式操作。</li><li><strong>-t</strong>: 终端。</li><li><strong>/bin/bash</strong>：放在镜像名后的是命令，这里我们希望有个交互式 Shell，因此用的是 /bin/bash。 <strong>桌面端真香</strong></li></ul><h3 id="和平常使用的ubuntu服务器区别" tabindex="-1">和平常使用的Ubuntu服务器区别 <a class="header-anchor" href="#和平常使用的ubuntu服务器区别" aria-label="Permalink to &quot;和平常使用的Ubuntu服务器区别&quot;">​</a></h3><p>虚拟机里装的ubuntu是ubuntu的内核 + ubuntu的文件系统 docker里的ubuntu是任意的内核（你底层的操作系统的内核）+ ubuntu的文件系统</p><h3 id="nginx-mysql-redis的安装-同时运行-独立容器" tabindex="-1">nginx，mysql，redis的安装，同时运行 独立容器 <a class="header-anchor" href="#nginx-mysql-redis的安装-同时运行-独立容器" aria-label="Permalink to &quot;nginx，mysql，redis的安装，同时运行 独立容器&quot;">​</a></h3><h4 id="拉取到本地" tabindex="-1">拉取到本地 <a class="header-anchor" href="#拉取到本地" aria-label="Permalink to &quot;拉取到本地&quot;">​</a></h4><img src="`+r+`"><h4 id="nginx-test容器" tabindex="-1">nginx-test容器 <a class="header-anchor" href="#nginx-test容器" aria-label="Permalink to &quot;nginx-test容器&quot;">​</a></h4><pre><code>docker run --name nginx-test -p 8080:80 -d nginx
</code></pre><h4 id="mysql-test容器" tabindex="-1">mysql-test容器 <a class="header-anchor" href="#mysql-test容器" aria-label="Permalink to &quot;mysql-test容器&quot;">​</a></h4><pre><code>docker run -itd --name mysql-test -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql
</code></pre><h4 id="redis-test容器" tabindex="-1">redis-test容器 <a class="header-anchor" href="#redis-test容器" aria-label="Permalink to &quot;redis-test容器&quot;">​</a></h4><pre><code>docker run -itd --name redis-test -p 6379:6379 redis
</code></pre><p>⚠️注意：如果本地有安装软件映射的端口不要和本地冲突喔！！！</p><h3 id="上传公共库-476421978-用户名" tabindex="-1">上传公共库 476421978[用户名] <a class="header-anchor" href="#上传公共库-476421978-用户名" aria-label="Permalink to &quot;上传公共库 476421978\\[用户名]&quot;">​</a></h3><pre><code>docker login
</code></pre><pre><code>docker tag ubantu:latest 476421978/hlg-demo:v2
</code></pre><pre><code>docker push 476421978/hlg-demo:v2
</code></pre><p>若果tag添加标签时没有加上用户名476421978则在push中提示</p><pre><code>requested access to the resource is denied
</code></pre><h3 id="查询" tabindex="-1">查询 <a class="header-anchor" href="#查询" aria-label="Permalink to &quot;查询&quot;">​</a></h3><pre><code>docker search 476421978
</code></pre><h3 id="下载" tabindex="-1">下载 <a class="header-anchor" href="#下载" aria-label="Permalink to &quot;下载&quot;">​</a></h3><pre><code>docker pull 476421978/hlg-demo:v2
</code></pre><h2 id="前端项目-本地部署-docker-nginx容器-调试步骤" tabindex="-1">前端项目 本地部署 docker nginx容器 调试步骤 <a class="header-anchor" href="#前端项目-本地部署-docker-nginx容器-调试步骤" aria-label="Permalink to &quot;前端项目 本地部署 docker nginx容器 调试步骤&quot;">​</a></h2><p>挂载宿主机的nginx配置一直不成功，无奈只能进入容器修改配置了</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>[root@poloyy ~]# docker run -it -d -v ~/nginx.conf:/etc/nginx/nginx.conf nginx</span></span>
<span class="line"><span>e0e4b40446a64927603b85854c3a6472b2dfa5681fcbfa0e170c16b15e5c8fdd</span></span>
<span class="line"><span>docker: Error response from daemon: OCI runtime create failed: container_linux.go:380: starting container process caused: process_linux.go:545: container init caused: rootfs_linux.go:76: mounting &quot;/root/nginx.conf&quot; to rootfs at &quot;/etc/nginx/nginx.conf&quot; caused: mount through procfd: not a directory: unknown: Are you trying to mount a directory onto a file (or vice-versa)? Check if the specified host path exists and is the expected type.</span></span>
<span class="line"><span>[root@poloyy ~]# client_loop: send disconnect: Broken pipe</span></span></code></pre></div><h3 id="docker-安装-nginx" tabindex="-1">docker 安装 nginx <a class="header-anchor" href="#docker-安装-nginx" aria-label="Permalink to &quot;docker 安装 nginx&quot;">​</a></h3><pre><code>docker pull nginx
</code></pre><h3 id="运行nginx容器-命名nginx-test" tabindex="-1">运行nginx容器 命名nginx-test <a class="header-anchor" href="#运行nginx容器-命名nginx-test" aria-label="Permalink to &quot;运行nginx容器 命名nginx-test&quot;">​</a></h3><pre><code>docker run --name nginx-test -p 8080:80 -d nginx
</code></pre><ul><li>宿主机本地运行localhost:8080验证是否成功</li></ul><h3 id="docker进入nginx-test容器" tabindex="-1">docker进入nginx-test容器 <a class="header-anchor" href="#docker进入nginx-test容器" aria-label="Permalink to &quot;docker进入nginx-test容器&quot;">​</a></h3><pre><code>docker exec -it nginx-test bash
</code></pre><h3 id="vim修改nginx配置文件" tabindex="-1">vim修改nginx配置文件 <a class="header-anchor" href="#vim修改nginx配置文件" aria-label="Permalink to &quot;vim修改nginx配置文件&quot;">​</a></h3><p>更新安装工具</p><pre><code>apt-get update
</code></pre><p>安装vim</p><pre><code>apt-get install vim
</code></pre><p>修改配置文件</p><pre><code>vim /etc/nginx/conf.d/default.conf
</code></pre><ul><li><strong>注意nginx配置端口要和运行容器时的映射端口保持一致</strong></li></ul><h3 id="例如" tabindex="-1">例如 <a class="header-anchor" href="#例如" aria-label="Permalink to &quot;例如&quot;">​</a></h3><pre><code>server {
    listen    80;
    server_name    localhost;
    root    /usr/share/nginx/dist;
    location ^~/api/ {
           proxy_pass IP或者域名;
   }
    location / {
        try_files $uri $uri/ /index.html;
        index  index.html index.htm;
    }
}
</code></pre><ul><li>^~/api/ 对应前端想要代理去访问的接口地址拼接</li></ul><h3 id="前端打包项目上传到nginx-test容器中" tabindex="-1">前端打包项目上传到nginx-test容器中 <a class="header-anchor" href="#前端打包项目上传到nginx-test容器中" aria-label="Permalink to &quot;前端打包项目上传到nginx-test容器中&quot;">​</a></h3><pre><code>docker cp /data/dist/ nginx-test:/usr/share/nginx/
</code></pre><ul><li>docker cp 不会覆盖文件</li><li>/data/dist/ 在宿主机的C盘根目录</li><li>nginx-test:/usr/share/nginx/ 对应nginx-test容器的位置，也对应nginx配置的root路径</li><li>本地浏览器打开地址 localhost:8080 访问即可</li></ul><h3 id="常用命令" tabindex="-1">常用命令 <a class="header-anchor" href="#常用命令" aria-label="Permalink to &quot;常用命令&quot;">​</a></h3><p>命令大全：<a href="https://www.runoob.com/docker/docker-command-manual.html" target="_blank" rel="noreferrer">https://www.runoob.com/docker/docker-command-manual.html</a></p>`,58),s=[i];function d(c,l,u,h,p,g){return n(),a("div",null,s)}const b=e(o,[["render",d]]);export{m as __pageData,b as default};
