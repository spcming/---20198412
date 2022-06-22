const express = require('express')
const app = express()
const port = 3001
const net = require("net");
app.all("*",function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","http://localhost:3000");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","*");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
    res.send(200);  //让options尝试请求快速结束
  else
    next();
});

app.get('/', (req, res) => {
  const { url, port } = req.query;
  const client = new net.Socket();

  client.connect(port, url, () => {
    client.on("data", (data) => {
      console.log(data)
      res.send(data.toString())
      client.write("客：已收到");
      client.end(); // 主动关闭此次tcp长连接
    });
    // 客户端主动断连，触发自己的end事件
    client.on("end", () => {
      console.log("链接已主动断开");
    });
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})