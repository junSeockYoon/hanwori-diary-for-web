// 1. [모듈 임포트]
// mybatis-mapper: XML 파일에 작성된 SQL을 불러와 사용하게 해주는 라이브러리
const mybatisMapper = require('mybatis-mapper'); 
// ../config/database.js: 실제 데이터베이스 연결 정보를 담고 있는 모듈 (DB connection pool)
const db = require('../config/database'); 

// 2. [초기 설정]
// SQL 쿼리의 포맷을 지정합니다. (언어, 들여쓰기 등)
const format = { language: 'sql', indent: '  ' };

// mybatis-mapper에게 SQL 쿼리가 어디에 저장되어 있는지 알려줍니다.
// __dirname은 현재 파일의 경로이며, '/mapper/main.xml' 파일을 로딩합니다.
// 이렇게 로딩된 SQL문들은 메모리에 저장되어 빠르게 찾아 쓸 수 있습니다.
mybatisMapper.createMapper([
    __dirname + '/mapper/main.xml', 
    __dirname + '/mapper/auth.xml',
]);

/**
 * 범용 DAO 함수
 * @param {string} mapperId - 사용할 XML 파일의 네임스페이스 (mapper 객체에 정의)
 * @param {string} sqlId - 실행할 SQL 쿼리의 ID
 * @param {Object} params - SQL 쿼리에 전달할 파라미터 (객체 형태)
 * @returns {Promise<Object|Array|null>} 쿼리 실행 결과
 */
const commonDao = async (mapperId, sqlId, params) => {
    try {
        // 3. [SQL 쿼리 생성]
        // mybatis-mapper를 사용해 XML에서 원하는 SQL문을 가져옵니다.
        // 예를 들어 getStatement("main", "detail", { id: 1 })은
        // main.xml의 <select id="detail"> 태그를 찾아 {id: 1} 값을 적용한 완성된 SQL문을 반환합니다.
        const query = mybatisMapper.getStatement(mapperId, sqlId, params, format);

        // 4. [쿼리 실행]
        // db.execute() 함수를 통해 데이터베이스에 생성된 쿼리를 전송하고 실행합니다.
        // 결과로 [rows, fields] 배열을 받습니다. rows는 실제 데이터, fields는 메타데이터입니다.
        const [rows, fields] = await db.execute(query);

        // 유틸: 스네이크케이스 키를 카멜케이스로 변환
        const toCamelCase = (text) => {
            if (typeof text !== 'string') return text;
            const lower = text.toLowerCase();
            return lower.replace(/[_-](\w)/g, (_, c) => (c ? c.toUpperCase() : ''));
        };

        const convertKeysToCamel = (input) => {
            // 원시값 또는 특수 객체(Date/Buffer/BigInt)는 그대로 반환
            if (input == null) return input;
            if (input instanceof Date) return input;
            if (typeof Buffer !== 'undefined' && input instanceof Buffer) return input;
            if (typeof input === 'bigint') return input; 

            if (Array.isArray(input)) {
                return input.map(convertKeysToCamel);
            }
            if (input && typeof input === 'object') {
                const result = {};
                for (const [key, value] of Object.entries(input)) {
                    result[toCamelCase(key)] = convertKeysToCamel(value);
                }
                return result;
            }
            return input;
        };

        // 5. [결과 처리]
        // INSERT, UPDATE, DELETE 쿼리의 경우, 성공 시 결과(rows)에
        // 영향을 받은 행의 수(affectedRows)가 포함됩니다.
        if (rows && rows.affectedRows) {
            // 이 경우, 작업 성공 여부를 판단할 수 있는 rows 객체를 그대로 반환합니다.
            return rows;
        } else {
            // SELECT 쿼리의 경우, 결과(rows)는 데이터 배열 자체입니다.
            // 데이터가 없으면 빈 배열 []을 반환하여 서비스 계층에서 에러가 나지 않도록 합니다.
            return convertKeysToCamel(rows || []);
        }

    } catch (e) {
        // 6. [에러 처리]
        // 쿼리 생성이나 실행 과정에서 에러가 발생하면 콘솔에 로그를 남기고,
        // null을 반환하여 서비스 계층에서 에러를 인지하고 처리할 수 있게 합니다.
        console.error('DAO Error:', e);
        return null;
    }
};

// 서비스 계층에서 mapperId를 쉽게 사용할 수 있도록 네임스페이스를 상수로 정의합니다.
const mapper = {
    MAIN: "main",
    AUTH: "auth",
}

// 다른 파일에서 commonDao 함수와 mapper 객체를 사용할 수 있도록 export 합니다.
module.exports = {
    commonDao,
    mapper
};