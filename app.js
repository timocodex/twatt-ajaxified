const express = require('express')
const app = express()
const router = express.Router()
const config = require('./config.js')
const Twit = require('twit')
const cors = require('cors')

const T = new Twit({
  consumer_key:         config.consumer_key,
  consumer_secret:      config.consumer_secret,
  access_token:         config.access_token,
  access_token_secret:  config.access_token_secret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

router.get('/myTweet',function(req,res){
  T.get('statuses/user_timeline', function(err, data, response) {
    res.send(data)
  })
})

router.post('/tweetPost',function(req,res){

  T.post('statuses/update',{status:req.body.tweet}, function(err, data, response) {
    res.send(data)
  })
})

app.use(cors());
app.use('/',router)
app.listen(3000)
