const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const loginCheck = require('./loginCheck')
const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  // console.log('loginUser', req.body)
  const userNow = loginCheck(req.body)
  // console.log('Now User', userNow)
  if (userNow) {
    res.render('welcome', { userNow })
  } else {
    const wrong = 'Username 或 Password 錯誤 !!'
    res.render('index', { wrong })
  }
})

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})