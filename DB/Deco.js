const express = require('express');
const router = express.Router();



const contents = {serverTest : "서버 테스트 1"}


router.get('/', function (req, res, next) {
    res.json(contents);
})

module.exports = router;


//program DB 와 DECODB는 Router 방식으로 보내고 app.use 라우터로 받는다.
// 그러나 userDB는 그냥 module exports로 보냈고, app.get으로 받아서 res.send 했다.
// 두가지 다 그냥 작동하는데 뭐가 뭘까? 알아보자.