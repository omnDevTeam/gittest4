const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const app = express();

const port = process.env.PORT || 8090;

const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./passport');       

const DecoRouter = require('./DB/Deco.js');
const ProgramRouter = require('./DB/ProgramDB.js');

const http = require('http').createServer(app);

dotenv.config(); //env 소환

//passport 관련 코드들
app.use(                                              //기본적인 express세션설정
  session({
    resave: false,
    saveUninitialized: false,
    secret: 'pyh',
    cookie: {
      httpOnly: true,
      secure: false
    }
  })
);

app.use (express.urlencoded({ extended: false}));    //클라이언트의 form 값을 req.body에 넣음
app.use (passport.initialize());                      //passport 동작
app.use (passport.session());                         //passport.deserializeUser 실행




passportConfig(passport);


app.post('/api/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

app.get('/api/logout',(req,res)=>{
  req.logout();
  req.session.save((err)=>{
    res.redirect('/login');
  });
});






//서버 여는 코드
http.listen(port, function () {
  console.log('listening on', {port})
}); 



//DB정보 전송용 라우팅
app.use('/api/deco', DecoRouter);
  
app.use('/api/program', ProgramRouter);




//그냥 서버가 주소로 정보전달
app.get("/api/greeting", (req,res) => {
  res.send("<h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit.la pcus volutpat massa.</h1>")
});


app.get("/api/account", (req,res) => {
  console.log('server.js에서 로그인 정보 표시.')
  console.dir(req.user);
  res.send(req.user);
});



//프로덕션 모드일때 localhost:8080에서 리액트 빌드 소환

console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV === "production") { 
  app.use(express.static( path.join(__dirname, '../reactsimple/build')))

  app.get('/', function(req,res){
    res.sendFile(path.join(__dirname, '../reactsimple/build/index.html'))
  })
  
  app.get('*', function(req,res){
      res.sendFile(path.join(__dirname, '../reactsimple/build/index.html'))
  })
}




  /*
  const test = require('./json.json');
  let a_test = test.a;

  console.log(a_test);
*/






/*
if (process.env.NODE_ENV === "production") { //프로덕션 모드일때 리액트 빌드 소환
    app.use(express.static( path.join(__dirname, 'react-app/build')))

    app.get('/', function(req,res){
      res.sendFile(path.join(__dirname, 'react-app/build/index.html'))
    })
    
    app.get('*', function(req,res){
        res.sendFile(path.join(__dirname, 'react-app/build/index.html'))
    })
}else{ //디벨롭 모드일 때
    app.get("/api/greeting", (req,res) => {
      res.send("<h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit.la pcus volutpat massa.</h1>")
    });
}
*/


/*
app.post('/api/login', (req,res,next) => {

  passport.authenticate('local',(authError, user, info) => {    //passport.localStrategy 를 실행하는 코드
          return req.login(user, loginError =>{
                  if(loginError){
                      console.error(loginError);
                  }
              });

  }) (req,res,next);

res.redirect('/success');
});



app.get('/success', (req,res,next)=>{
  res.render('success',{
    user: req.user
  })
});
*/



/*
1 - /login 요청

2 - passport.authenticate("local", (error,user, message)  --->  localStrategy.js 실행

3 - localStrategy에서 form으로 부터 입력받은 값으로 db에서 사용자 조회. 경우를 고려하여 done()함수 실행

4 - localStrategy에서 done() --->  /login의 passport.authenticate의 콜백함수로 인자를 받음

5 - 사용자가 없으면 redirect, 있으면 req.login()실행. 인자로 user를 넘겨줌. serializeUser실행

6 - serializeUser실행 --> done(null, user.id) --> 세션에 user.id 저장

7 - 사용자가 확인 되었으니, /login에서 redirect('~');

8 - /success 요청 

9 - app.js의 passport.session() 실행

10 - deserializeUser실행 -> 세션에서 유저아이디 가져옴(req.session.passport.user)

11 - 세션에서 가져온 정보를 이용해 db에서 사용자 조회. 있음 -> done(null ,user)

12 - req.user로 회원정보를 가져올 수 있음

*/