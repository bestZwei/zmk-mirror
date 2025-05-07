addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url);
  const targetUrl = 'https://www.marxists.org/' + url.pathname + url.search; 

  // 构建新的请求
  const newRequest = new Request(targetUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body,
    redirect: 'follow' // 允许重定向
  });

  // 发送请求到目标服务器
  let response = await fetch(newRequest);

  // 修改响应头，以适应跨域访问
  response = new Response(response.body, response);
  response.headers.set('Access-Control-Allow-Origin', '*'); // 允许所有来源访问，你可以根据需要修改
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // 允许的方法
  response.headers.set('Access-Control-Allow-Headers', '*'); // 允许所有请求头

  return response;
}
