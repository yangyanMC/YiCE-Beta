const WebSocket = require('ws');
const http = require('http');

// 创建HTTP服务器
const httpServer = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('WebSocket Server is running...');
});

// 创建WebSocket服务器
const wss = new WebSocket.Server({ server: httpServer });

wss.on('connection', (socket) => {
  console.log('客户端已连接');

  socket.on('message', (message) => {
    console.log(`Received: ${message}`);
    // 广播数据给所有连接的客户端
    wss.clients.forEach((client) => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  socket.on('close', () => {
    console.log('客户端已断开连接');
  });
});

// 设置HTTP服务器监听端口
httpServer.listen(6460, () => {
  console.log('HTTP server listening on port 6460');
});