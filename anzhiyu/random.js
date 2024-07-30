var posts=["2024/07/27/这是一篇新的博文/","2024/07/27/新页面/","2024/07/27/hello-world/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };