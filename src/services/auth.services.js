// 데이터베이스에 직접 접근하여 쿼리를 실행하는 역할을 하는
// commonDao와 쿼리 정보가 담긴 mapper 객체를 가져옵니다.
const { commonDao, mapper } = require('../dao/common.dao');

async function login(params) {
    try {

        const result = await commonDao(mapper.AUTH, 'userType', params);

        return result;
    } catch (error) {
        throw error;
    }
}

async function signup(params) {
    try {
        const result = await commonDao(mapper.AUTH, 'insertUser', params);
        return result;
    } catch (error) {
        throw error;
    }
}

async function userTypeApi(params) {
    try {

        console.log(params);
        
        const result = await commonDao(mapper.AUTH, 'userTypeApi', params);
        return result;
    } catch (error) {
        throw error;
    }
}

// 위에서 정의한 서비스 함수들을 컨트롤러에서 사용할 수 있도록 export 합니다.
module.exports = {
    login,
    signup,
    userTypeApi
};