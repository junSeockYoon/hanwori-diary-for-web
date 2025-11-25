//main.route.js ('/' 로 들어오는 모든 요청을 처리하기 위한 파일)


// Express 모듈 로드: 라우터를 사용하기 위해 불러옵니다.
const express = require('express');
// 메인 화면/상세/수정/삭제 로직이 구현된 컨트롤러를 불러옵니다.
const authController = require('../controllers/auth.controller');

// 이 파일에서 사용할 하위 라우터 인스턴스를 생성합니다.
const router = express.Router();

/****************************************************************************************
 *!                                     V I E W
 *  화면 렌더링용 라우트: 브라우저에 EJS 템플릿을 렌더링하여 반환합니다.
 ****************************************************************************************/
 router.get('/login', authController.login);

 router.get('/signup', authController.signup);


/****************************************************************************************
 *!                                     A P I
 *  데이터 변경/조회용 API: JSON 응답을 주거나 리다이렉트합니다.
 ****************************************************************************************/
router.post('/api/login', authController.loginPost);
router.post('/api/signup', authController.signupPost);
//userType 조회 API
router.get('/api/userType', authController.userTypeApi);

module.exports = router;