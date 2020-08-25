const express = require('express')
const router = express.Router()
const Zoo = require('./zoo.js') // zoo : 스키마 객체!

const fs = require('fs') // index.html 외의 웹문서 읽어오기 위한 패키지

router.post('/',(req, res) => {
    const name = req.body.name
    const habitat = req.body.habitat
    const number = Number.parseInt(req.body.number)
    res.send(`<h1>The animal that you added is '${name}'! </h1>
    <a href="/find">OK</a>`)
    const zoo = new Zoo({
        number : number,
        animal : {
            name : name,
            habitat : habitat
        }
    })
    //데이터베이스에 새로운 객체 저장하기!
    zoo.save().then(success => {
        console.log(success)
    }).catch(failed => {
        console.log(failed)
    })
})

//find에 대한 get요청을 라우팅!
router.get('/find', (req,res)=>{
    Zoo.find({}).then(success => {
        res.send(`<p>${success}</p> <a href="/">MAIN</a> <a href="/delete">DELETE</a> <a href="/update">UPDATE</a>`)
    }).catch(failed => {
        console.log(failed)
    })
})


// delete에 대한 get과 post를 라우팅!
router.get('/delete', (req,res) => {
    fs.readFile('./delete.html', (err, data) => {
        if(err){
            console.log(err)
        }
        res.end(data)
    })
})


router.post('/delete', (req,res) => {
    const number = Number.parseInt(req.body.number)
    res.send(`<p>지우고 싶은 동물번호는 ${number}</p>
    <a href="/find">YES!</a> `)

    Zoo.remove({number:number}).then(success => {
        console.log(success)
    }).catch(failed=>{
        console.log(failed)
    })
})

// update에 대한 get과 post를 라우팅하기!

router.get('/update', (req, res) => {
    fs.readFile('./update.html', (err, data) => {
        if(err){
            console.log(err)
        }
        res.end(data)
    })
})

router.post('/update', (req,res) => {
    
    res.send(`<p>Update Data! </p>
    <a href="/find">DONE</a> `)

    const name = req.body.name
    const habitat = req.body.habitat
    const number = Number.parseInt(req.body.number)

    Zoo.update({number:number}, {animal:{
        name: name, habitat:habitat
    }}).then(success => {
        console.log(success)
    }).catch(failed => {
        console.log(failed)
    })
})

// 다른 파일에서 이것을 사용할 수 있게 한다!
module.exports = router
