// 서비스 계층(실제 비즈니스 로직을 처리하는 부분)에서 mainService 객체를 가져옵니다.
// 컨트롤러는 여기서 가져온 서비스의 함수들을 호출해서 실제 작업을 시킵니다.
const { mainService } = require('../services');

/**
 * 메인 페이지를 렌더링하는 컨트롤러
 * 모든 게시글 목록을 보여주는 역할을 합니다.
 */
async function index(req, res) {
    try {
        // 1. [업무 지시] 서비스에게 "모든 게시글 데이터를 가져와줘" 라고 요청합니다.
        const result = await mainService.index();

        // 2. [응답] 서비스로부터 받은 결과(result)를 'main'이라는 EJS 템플릿에 담아
        //    HTML 페이지로 그려서 사용자에게 보여줍니다. 
        res.render('main', { result });
    } catch (error) {
        // 만약 서비스에서 데이터를 가져오다 에러가 발생하면, 사용자에게 서버 오류 메시지를 보냅니다.
        console.error('=== 메인 페이지 에러 ===');
        console.error(error);
        res.status(500).send('서버 오류가 발생했습니다.');
    }
}

/**
 * 상세 페이지를 렌더링하는 컨트롤러
 * 특정 ID를 가진 게시글 하나만 보여주는 역할을 합니다.
 */
const detail = async (req, res) => {
    try {        // 1. [요청 분석] 사용자가 요청한 URL에서 게시글의 고유 ID를 추출합니다. (예: /detail/123 -> id는 123)
        const { id } = req.params;
        console.log(id);

        // 2. [업무 지시] 서비스에게 "이 ID에 해당하는 게시글 하나만 찾아줘" 라고 ID를 넘겨주며 요청합니다.
        const result = await mainService.detail(id);

        // 3. [응답] 서비스로부터 받은 결과(result)를 'detail' 템플릿에 담아
        //    HTML 페이지로 그려서 사용자에게 보여줍니다.
        res.render('detail', { result });
    } catch (error) {
        res.status(500).send('서버 오류가 발생했습니다.');
    }
};

/**
 * 게시글을 수정하는 컨트롤러
 */
const update = async (req, res) => {
    try {
        // 1. [요청 분석] URL에서 수정할 게시글의 ID를, 요청 본문(body)에서 수정할 제목과 내용을 추출합니다.
        let params = { ...req.body, id: req.params.id };

        // 2. [업무 지시] 서비스에게 "이 ID를 가진 게시글을 이 제목과 내용으로 수정해줘" 라고 요청합니다.
        await mainService.update(params);

        // 3. [응답] 요청의 종류에 따라 다른 방식으로 응답합니다.
        // 자바스크립트(AJAX)로 요청이 왔는지, 일반적인 페이지 이동 요청인지 확인합니다.
        if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
            // AJAX 요청일 경우: JSON 형태로 성공 메시지를 보냅니다. (페이지 새로고침 없음)
            res.json({ success: true, message: '수정이 완료되었습니다.' });
        } else {
            // 일반적인 폼(form) 제출일 경우: 수정한 게시글의 상세 페이지로 다시 이동시킵니다.
            res.redirect(`/detail/${id}`);
        }
    } catch (error) {
        // 에러 발생 시에도 요청 종류에 따라 다른 방식으로 오류를 응답합니다.
        if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
            res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
        } else {
            res.status(500).send('서버 오류가 발생했습니다.');
        }
    }
};

/**
 * 게시글을 삭제하는 컨트롤러
 */
const deletePost = async (req, res) => {
    try {
        // 1. [요청 분석] URL에서 삭제할 게시글의 ID를 추출합니다.
        const { id } = req.params;

        // 2. [업무 지시] 서비스에게 "이 ID를 가진 게시글을 삭제해줘" 라고 요청합니다.
        await mainService.deletePost(id);

        // 3. [응답] 요청의 종류에 따라 다른 방식으로 응답합니다.
        if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
            // AJAX 요청일 경우: JSON 형태로 성공 메시지를 보냅니다.
            res.json({ success: true, message: '게시글이 삭제되었습니다.' });
        } else {
            // 일반적인 폼 제출일 경우: 삭제 후 메인 페이지로 이동시킵니다.
            res.redirect('/');
        }
    } catch (error) {
        // 에러가 발생하면 서버 콘솔에 에러를 기록하여 개발자가 볼 수 있게 하고, 사용자에게는 오류 메시지를 보냅니다.
        console.error('=== 삭제 에러 ===');
        console.error(error);

        if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
            res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
        } else {
            res.status(500).send('서버 오류가 발생했습니다.');
        }
    }
};

// 위에서 정의한 컨트롤러 함수들을 다른 파일(주로 라우터)에서 사용할 수 있도록 export 합니다.
// delete는 자바스크립트 예약어이므로 deletePost라는 이름으로 내보냅니다.
module.exports = {
    index,
    detail,
    update,
    delete: deletePost
};