const { authService } = require('../services');

async function login(req, res) {
    try {
        res.render('auth/login');
    } catch (error) {
        console.error('=== 로그인 페이지 에러 ===');
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
        
        return res.json({ success: true, data: result });
    } catch (error) {
        console.error('=== 로그인 페이지 에러 ===');
        console.error(error);
        res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
    }
}
// 위에서 정의한 컨트롤러 함수들을 다른 파일(주로 라우터)에서 사용할 수 있도록 export 합니다.
module.exports = {
    login,
    loginPost,
};