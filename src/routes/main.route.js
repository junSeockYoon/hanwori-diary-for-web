//main.route.js ('/' 로 들어오는 모든 요청을 처리하기 위한 파일)


// Express 모듈 로드: 라우터를 사용하기 위해 불러옵니다.
const express = require('express');
// 메인 화면/상세/수정/삭제 로직이 구현된 컨트롤러를 불러옵니다.
const mainController = require('../controllers/main.controller');

// 이 파일에서 사용할 하위 라우터 인스턴스를 생성합니다.
const router = express.Router();

/****************************************************************************************
 *!                                     V I E W
 *  화면 렌더링용 라우트: 브라우저에 EJS 템플릿을 렌더링하여 반환합니다.
 ****************************************************************************************/
// 메인 페이지: 게시글 목록 테이블을 렌더링합니다.
 router.get('/', mainController.index);
// 상세 페이지: 특정 게시글(ID 기반)의 상세 화면을 렌더링합니다.
router.get('/detail/:id', mainController.detail);

/****************************************************************************************
 *!                                     A P I
 *  데이터 변경/조회용 API: JSON 응답을 주거나 리다이렉트합니다.
 ****************************************************************************************/
// 수정 API: 특정 게시글(ID)의 제목/내용을 업데이트합니다 (AJAX 또는 폼 제출).
router.post('/update/:id', mainController.update);
// 삭제 API: 특정 게시글(ID)을 삭제합니다 (AJAX 또는 폼 제출).
router.post('/delete/:id', mainController.delete);

// 이 라우터를 외부로 내보내서 상위 라우터(index.js)에서 사용합니다.
module.exports = router;