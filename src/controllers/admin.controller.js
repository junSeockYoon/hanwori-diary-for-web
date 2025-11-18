// 관리자 페이지를 렌더링하는 컨트롤러
async function index(req, res) {
    try {
        res.render('admin/index', { title: '관리자 페이지' });
    } catch (error) {
        console.error('=== 관리자 페이지 에러 ===');
        console.error(error);
        res.status(500).send('서버 오류가 발생했습니다.');
    }
}

// 위에서 정의한 컨트롤러 함수들을 다른 파일(주로 라우터)에서 사용할 수 있도록 export 합니다.
module.exports = {
    index,
};

