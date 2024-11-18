const http = require('http')
const https = require('https')
const fs = require('fs') //引入文件读取模块
const path = require('path')

// 文件路径
const pathDir = (filePath) => {
  return path.join(__dirname, filePath)
}

// 获取ip
const getPublicIP = () => {
  const os = require('os')
  const ifaces = os.networkInterfaces()
  let en0

  Object.keys(ifaces).forEach((ifname) => {
    let alias = 0

    ifaces[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return
      }

      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        en0 = iface.address
        console.log(ifname + ':' + alias, iface.address)
      } else {
        // this interface has only one ipv4 adress
        console.log(ifname, iface.address)
        en0 = iface.address
      }
      ++alias
    })
  })
  return en0
}

// 创建服务器
const server = http
  .createServer(function (req, res) {
    var url = req.url
    //客户端输入的url，例如如果输入localhost:8888/index.html
    //那么这里的url == /index.html

    var file = pathDir(url)

    fs.readFile(file, function (err, data) {
      /*
        一参为文件路径
        二参为回调函数
            回调函数的一参为读取错误返回的信息，返回空就没有错误
            二参为读取成功返回的文本内容
    */
      if (err) {
        res.writeHeader(404, {
          'content-type': 'text/html;charset="utf-8"',
        })
        res.write('<h1>404错误</h1><p>你要找的页面不存在</p>')
        res.end()
      } else {
        res.writeHeader(200, {
          'content-type': 'text/html;charset="utf-8"',
        })
        res.write(data) //将index.html显示在客户端
        res.end()
      }
    })
  })
  .listen(8080)

console.log(`服务器开启成功: ${getPublicIP()}`)
