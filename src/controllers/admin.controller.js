const { authService, adminService } = require('../services');

// 관리자 페이지를 렌더링하는 컨트롤러
async function index(req, res) {
    try {
        let params = {
            userCd: req.cookies.userCd || null
        }
        const result = await authService.userTypeApi(params);

        console.log(result);

        if(!result || result.length === 0) {
            return res.redirect('/auth/login');
        }

        if(result[0].userType !== 'admin') {
            return res.redirect('/auth/login');
        }

        if(result[0].userType === 'admin') {
            res.render('admin/index', { title: '관리자 페이지' });
        } 
    } catch (error) {
        console.error('=== 관리자 페이지 에러 ===');
        console.error(error);
        res.status(500).send('서버 오류가 발생했습니다.');
    }
}

async function userManagement(req, res) {
    try {
        let params = {
            userCd: req.cookies.userCd || null
        }
        const result = await authService.userTypeApi(params);

        if(!result || result.length === 0) {
            return res.redirect('/auth/login');
        }

        const userList = await adminService.userListApi(params);

        if(result[0].userType === 'admin') {
            res.render('admin/userManagement', { title: '관리자 페이지', userList });
        } 

    } catch (error) {
        console.error('=== 사용자 관리 에러 ===');
        console.error(error);
        res.status(500).send('서버 오류가 발생했습니다.');
    }
}

// 위에서 정의한 컨트롤러 함수들을 다른 파일(주로 라우터)에서 사용할 수 있도록 export 합니다.
module.exports = {
    index,
    userManagement
};

