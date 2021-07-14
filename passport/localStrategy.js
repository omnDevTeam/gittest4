const localStrategy = require('passport-local').Strategy;
const userlist = require('../DB/UserDB.js');


module.exports = passport => {
    passport.use(
        new localStrategy(
            {
                usernameField: 'username',
                passwordField: 'password'
            }, 
            
             (username, password, done)=>{

                const Cert = function(_username,_password){
                    const user=userlist.find(
                        function(param){
                            return(
                                param.username===_username && param.password===_password
                            );
                        }
                    )

                    if(user===undefined){
                        console.log('Cert 점검결과 아이디 혹은 비밀번호가 틀렸습니다.');
                        console.log('localStrategy 에서 조회 실패');
                        return done(null, false);
                    }else{
                        console.log('Cert 점검결과 인증되었습니다.');
                        console.log('localStrategy 에서 username, password 조회 완료');
                        console.dir(user);
                        return done(null, user);
                    }
                }

                return Cert(username,password);
 

            }
        )
    );
};

/*localStrategy를 처리하는 부분으로, 사용자가 작성한 form으로부터 id, pw를 입력받습니다.

이후에 입력받은 사용자 정보로 db에서 사용자를 조회하면 됩니다.

여기서 콜백함수, done()을 실행해야 하는데 done()함수는 3가지의 인자를 가집니다.

done(에러, 성공, 사용자정의 메시지) 

1 - 에러 : 로직을 실행하는데 발생한 에러를 넣어줍니다.

2 - 성공 : 로직이 성공적으로 수행되어 생성된 값을 넣어줍니다.

3 - 사용자정의 메시지 : 사용자가 넘기고 싶은 메세지를 작성하여 넘겨줍니다.



위의 경우에서 db조회 중 에러가 발생하는 경우 done(error), 사용자가 조회된 경우 done(null,user), 사용자가 조회되지 않은 경우 done(null, 사용자 정의메시지)로 메시지를 전송합니다.

이후에 done()함수의 인자들은 어디로 갈까요 ? app.js의 (1)번, (author, user, info)로 가게됩니다.

*/


/*

               if(username === user.username && password === user.password){
                    console.log('localStrategy 에서 username, password 조회 완료');
                    done(null, user);
                }else{
                    
                    
                }*/