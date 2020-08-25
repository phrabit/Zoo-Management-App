const express = require('express')
const app = express()
const route = require('./route.js')
const bodyParser = require('body-parser')
const db = require('./db.js')

//사용 기록 남기기! (Morgan package 설치하여 사용한다)
const morgan = require('morgan')



db(); // 데이터베이스와 연결하기!

//미들웨어 관련 부분
app.use(express.static(__dirname))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//morgan 미들웨어추가! 
//morgan의 설정값 : 기록을 얼마나 상세하게 남길지!
//app.use(morgan('tiny')) //간단한 기록
app.use(morgan('combined')) //상세한 기록

app.use('/',route)

app.listen(4003, () => {
    console.log("4003 PORT IS LISTENING");
})