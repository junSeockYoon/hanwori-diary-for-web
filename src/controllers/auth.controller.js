const { authService } = require('../services');

async function login(req, res) {
    try {
        // 쿼리 파라미터에서 에러/성공 메시지 가져오기
        const error = req.query.error || null;
        const success = req.query.success || null;
        res.render('auth/login', { error, success });
    } catch (error) {
        console.error('=== 로그인 페이지 에러 ===');
        console.error(error);
        res.status(500).send('서버 오류가 발생했습니다.');
    }
}

async function signup(req, res) {
    try {
        // 쿼리 파라미터에서 에러/성공 메시지 가져오기
        const error = req.query.error || null;
        const success = req.query.success || null;
        res.render('auth/signup', { error, success });
    } catch (error) {
        console.error('=== 회원가입 페이지 에러 ===');
        console.error(error);
        res.status(500).send('서버 오류가 발생했습니다.');
    }
}

async function loginPost(req, res) {
    try {
        let params = {
            ...req.body
        }
        const result = await authService.login(params);
      
        // 로그인 실패: 결과가 없거나 빈 배열인 경우
        if(!result || result.length === 0) {
            return res.redirect('/auth/login?error=아이디 또는 비밀번호가 올바르지 않습니다.');
        }

        //user id coolie 저장 
        res.cookie('userCd', result[0].userCd, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
      
        // 서버에서 직접 리다이렉트 처리
        if(result[0].userType === 'admin') {
            return res.redirect('/admin');
        } else {
            return res.redirect('/');
        } 
       
    } catch (error) {
        console.error('=== 로그인 페이지 에러 ===');
        console.error(error);
        return res.redirect('/auth/login?error=서버 오류가 발생했습니다.');
    }
}

async function signupPost(req, res) {
    try {
        let params = {
            ...req.body
        }

        // 비밀번호 확인 검증
        if(params.password !== params.passwordConfirm) {
            return res.redirect('/auth/signup?error=비밀번호가 일치하지 않습니다.');
        }

        // 비밀번호 길이 검증
        if(params.password.length < 8) {
            return res.redirect('/auth/signup?error=비밀번호는 최소 8자 이상이어야 합니다.');
        }

        // 회원가입 처리
        const result = await authService.signup(params);
      
        // 회원가입 성공
        if(result && result.affectedRows > 0) {
            return res.redirect('/auth/login?success=회원가입이 완료되었습니다. 로그인해주세요.');
        } else {
            return res.redirect('/auth/signup?error=회원가입에 실패했습니다.');
        }
       
    } catch (error) {
        console.error('=== 회원가입 에러 ===');
        console.error(error);
        
        // 중복 아이디 에러 처리
        if(error.code === 'ER_DUP_ENTRY') {
            return res.redirect('/auth/signup?error=이미 사용 중인 아이디입니다.');
        }
        
        return res.redirect('/auth/signup?error=서버 오류가 발생했습니다.');
    }
}

async function userTypeApi(req, res) {
    try {

        let params = {
            userCd: req.cookies.userCd || null
        }

        const result = await authService.userTypeApi(params);
        res.json(result);
    } catch (error) {
        console.error('=== userType 조회 에러 ===');
        console.error(error);
        res.status(500).send('서버 오류가 발생했습니다.');
    }
}

// 위에서 정의한 컨트롤러 함수들을 다른 파일(주로 라우터)에서 사용할 수 있도록 export 합니다.
module.exports = {
    login,
    loginPost,
    signup,
    signupPost,
    userTypeApi
};