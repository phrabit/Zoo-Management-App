//DB에 추가하기 위한 코드
const mongoose = require('mongoose')
const zooSchema = new mongoose.Schema({
    number : Number,
    animal : Object
});
module.exports = mongoose.model('Zoo', zooSchema);