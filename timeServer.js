const net = require("net");
const moment = require('moment')
const HOST = "127.0.0.1";
const PORT = 37;

const server = net.createServer();
server.listen(PORT, HOST);

// 重要：双方建立链接时，会自动获得一个socket对象（std，socket描述符）
server.on("connection", (socket) => {
  const timeFrom1970 = parseInt(new Date().getTime() / 1000);
  const timeDiff1970And1900 = 2208989143;
  const time = timeFrom1970 + timeDiff1970And1900
  socket.write(JSON.stringify(time));

  socket.on("end", (data) => {
    console.log(`客户端${socket.remoteAddress}:${socket.remotePort}已断连`);
  });
});

console.log(`server listen on ${HOST}:${PORT}`);


