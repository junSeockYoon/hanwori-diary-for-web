// 데이터베이스에 직접 접근하여 쿼리를 실행하는 역할을 하는
// commonDao와 쿼리 정보가 담긴 mapper 객체를 가져옵니다.
const { commonDao, mapper } = require('../dao/common.dao');

async function userListApi(params) {
    try {
        const result = await commonDao(mapper.AUTH, 'userList', params);
        return result;
    } catch (error) {
        throw error;
    }
}

async function userDetailApi(params) {
    try {
        const result = await commonDao(mapper.AUTH, 'userDetail', params);
        return result;
    } catch (error) {
        throw error;
    }
}

async function updateUserTypeApi(params) {
    try {
        const result = await commonDao(mapper.AUTH, 'updateUserType', params);
        return result;
    } catch (error) {
        throw error;
    }
}

// 관리자에서 신규 사용자 추가
async function createUserApi(params) {
    try {
        // auth.xml 의 insertUser 쿼리는 #{id}, #{password} 를 사용
        const daoParams = {
            id: params.userId,
            password: params.password,
        };
        const result = await commonDao(mapper.AUTH, 'insertUser', daoParams);
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    userListApi,
    userDetailApi,
    updateUserTypeApi,
    createUserApi
};