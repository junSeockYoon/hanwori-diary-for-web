//admin.route.js ('/admin' 로 들어오는 모든 요청을 처리하기 위한 파일)

// Express 모듈 로드: 라우터를 사용하기 위해 불러옵니다.
const express = require('express');
// 관리자 화면 로직이 구현된 컨트롤러를 불러옵니다.
const adminController = require('../controllers/admin.controller');

// 이 파일에서 사용할 하위 라우터 인스턴스를 생성합니다.
const router = express.Router();

/****************************************************************************************
 *!                                     V I E W
 *  화면 렌더링용 라우트: 브라우저에 EJS 템플릿을 렌더링하여 반환합니다.
 ****************************************************************************************/
// 관리자 페이지: 관리자 메인 화면을 렌더링합니다.
router.get('/', adminController.index);

//사용자 관리 
router.get('/userManagement', adminController.userManagement);

// 이 라우터를 외부로 내보내서 상위 라우터(index.js)에서 사용합니다.
module.exports = router;
