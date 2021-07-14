const express = require('express');
const router = express.Router();


  const program=[
        {id:1, 
        title:"7의굴레", 
        imgUrl:"./Programs/7의굴레/poster/7bridle.jpg", 
        titleUrl:"./Programs/7의굴레/title/title_7의굴레.png",
        videoUrl:"./Programs/7의굴레/video/7의굴레.mp4",
        summary:'"착한 사냥감이 되어야지. 안그래?" 모든 갈망이 충돌하는 세상의 이면, 그곳에서 『7의굴레』가 시작된다.',
        },
        
        {id:2, 
        title:"나에게 들려온 목소리", 
        imgUrl:"./Programs/나에게 들려온 목소리/poster/nadlemok.jpg",
        titleUrl:"./Programs/나에게 들려온 목소리/title/title_나들목.png",
        videoUrl:"./Programs/나에게 들려온 목소리/video/나에게 들려온 목소리.mp4",
        summary:'노래를 사랑하는 크리에이터와 손재주를 가진 크리에이터가 만나 나들목이라는 프로그램이 되었다. 그들의 특별한 사연과 감동의 무대, 가수와 그를 닮은 인형이 함께하는 힐링 뮤직 라디오',
        },

        {id:3, 
        title:"미션먹파서블", 
        imgUrl:"./Programs/미션먹파서블/poster/mukpossible.jpg",
        titleUrl:"./Programs/미션먹파서블/title/title_미션먹파서블.png",
        videoUrl:"./Programs/미션먹파서블/video/미션먹파서블.mp4",
        summary:'이 세상 먹방이 아니다! 목숨걸고 재료를 얻어라! 본격 밥먹는데 장난치는 신개념 버라이어티, 『미션먹파서블』',
        }
    ]

  router.get('/', function (req, res, next) {
      res.json(program);
  })
  
  module.exports = router;



/*
const contents = {serverTest : "서버 테스트 1"}


router.get('/', function (req, res, next) {
    res.json(contents);
})

module.exports = router;
*/