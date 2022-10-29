const http = new EasyHttp(); // this handles only one request - look out for it
http.httpGetOnUrl('http://jsonplaceholder.typicode.com/posts')
  .then(r => console.log(r))
  .catch(e => console.log('Error: ' + e));
// http.httpPostOnUrl('http://jsonplaceholder.typicode.com/posts', {title: "Custom post", body: "Get out of my live"});

