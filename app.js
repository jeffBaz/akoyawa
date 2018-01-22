var express = require('express');
const http = require('http');
const path = require('path');
const PORT = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 4200
console.log(`Listening on ${ PORT }`)
express()
  .use(express.static(path.join(__dirname, 'dist')))
  .set('views', path.join(__dirname, 'views'))
  .set('port', PORT)
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('dist/index'))
  .listen(PORT, '0.0.0.0', () => console.log(`Listening on ${ path } ${ PORT }`))