const { authService, adminService } = require('../services');

// 관리자 페이지를 렌더링하는 컨트롤러
async function index(req, res) {
    try {
        let params = {
            userCd: req.cookies.userCd || null
        }
        const result = await authService.userTypeApi(params);

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

// 사용자 추가 화면
async function userCreateForm(req, res) {
    try {
        res.render('admin/userCreate', { title: '사용자 추가', errorMessage: null, formData: {} });
    } catch (error) {
        console.error('=== 사용자 추가 화면 에러 ===');
        console.error(error);
        res.status(500).send('서버 오류가 발생했습니다.');
    }
}

// 사용자 추가 저장
async function userCreate(req, res) {
    try {
        const { userId, password, passwordConfirm } = req.body;

        // 간단한 서버 측 검증
        if (!userId || !password || !passwordConfirm) {
            return res.status(400).render('admin/userCreate', {
                title: '사용자 추가',
                errorMessage: '모든 필드를 입력해주세요.',
                formData: { userId }
            });
        }

        if (password !== passwordConfirm) {
            return res.status(400).render('admin/userCreate', {
                title: '사용자 추가',
                errorMessage: '비밀번호와 비밀번호 확인이 일치하지 않습니다.',
                formData: { userId }
            });
        }

        await adminService.createUserApi({ userId, password });

        // 성공 후 목록으로 이동
        return res.redirect('/admin/userManagement');
    } catch (error) {
        console.error('=== 사용자 추가 저장 에러 ===');
        console.error(error);
        res.status(500).render('admin/userCreate', {
            title: '사용자 추가',
            errorMessage: '서버 오류가 발생했습니다.',
            formData: { userId: req.body.userId }
        });
    }
}

async function userDetail(req, res) {
    try {
        let params = {
            userCd: req.params.userCd
        }
        const userDetail = await adminService.userDetailApi(params);

        res.render('admin/userDetail', { title: '사용자 상세', userDetail });
    } catch (error) {
        console.error('=== 사용자 상세 에러 ===');
        console.error(error);
        res.status(500).send('서버 오류가 발생했습니다.');
    }
}

async function updateUserType(req, res) {
    try {
        const params = {
            userCd: req.params.userCd,
            userType: req.body.userType
        };

        if (!params.userType || !['admin', 'user'].includes(params.userType)) {
            return res.status(400).json({ success: false, message: '유효하지 않은 사용자 유형입니다.' });
        }

        await adminService.updateUserTypeApi(params);
        return res.json({ success: true, message: '사용자 유형이 변경되었습니다.' });
    } catch (error) {
        console.error('=== 사용자 유형 변경 에러 ===');
        console.error(error);
        res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
    }
}
// 위에서 정의한 컨트롤러 함수들을 다른 파일(주로 라우터)에서 사용할 수 있도록 export 합니다.
module.exports = {
    index,
    userManagement,
    userDetail,
    updateUserType,
    userCreateForm,
    userCreate
};

