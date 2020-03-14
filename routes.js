const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.write('<html><header><title>root route</title></header>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"></form></body>')
    res.write('</html>')
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk)
    })
    return req.on('end', () => {
      const parsedbody = Buffer.concat(body).toString();
      const message = parsedbody.split('=')[1]
      fs.writeFile('message.txt', message, err => {
        res.statusCode = 302
        res.setHeader('Location', '/')
        return res.end();
      });
    });
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html><header><title>new html file</title></header>');
  res.write('<body><p>This is me</p></body>');
  res.write('</html>');
  res.end();
}

// module.exports = requestHandler;

// module.exports = {
//   handler: requestHandler,
//   text: 'Some hard coded text'
// }

exports.handler = requestHandler;
exports.text = 'Some hard coded text';