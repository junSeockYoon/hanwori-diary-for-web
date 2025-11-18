# 📖 한우리 다이어리 (Hanwoori Diary)

한우리 다이어리는 Node.js와 Express를 기반으로 한 웹 기반 다이어리 애플리케이션입니다. 사용자는 일기를 작성, 조회, 수정, 삭제할 수 있으며, 로그인 기능을 통해 사용자 정보를 확인할 수 있습니다.

## ✨ 주요 기능

- 📝 **다이어리 관리**: 일기 작성, 조회, 수정, 삭제
- 🔍 **사용자 조회**: 로그인 시 사용자 타입 정보 확인
- 📊 **목록 조회**: 작성된 모든 다이어리 목록 확인
- 🔍 **상세 보기**: 개별 다이어리 상세 내용 확인
- ✏️ **실시간 수정**: AJAX를 통한 비동기 수정 기능
- 🗑️ **삭제 기능**: 다이어리 삭제 기능

## 🛠️ 기술 스택

### Backend
- **Node.js** - JavaScript 런타임
- **Express.js** - 웹 프레임워크
- **MySQL** - 관계형 데이터베이스
- **MyBatis Mapper** - SQL 매핑 프레임워크

### Frontend
- **EJS** - 템플릿 엔진
- **JavaScript (Vanilla)** - 클라이언트 사이드 스크립팅
- **AJAX** - 비동기 통신

## 📁 프로젝트 구조

```
diary-for-web/
├── app.js                 # Express 애플리케이션 진입점
├── package.json           # 프로젝트 의존성 및 스크립트
├── src/
│   ├── config/
│   │   └── database.js    # 데이터베이스 연결 설정
│   ├── controllers/       # 컨트롤러 계층
│   │   ├── auth.controller.js
│   │   └── main.controller.js
│   ├── services/          # 서비스 계층 (비즈니스 로직)
│   │   ├── auth.services.js
│   │   ├── main.services.js
│   │   └── index.js
│   ├── dao/               # 데이터 접근 계층
│   │   ├── common.dao.js
│   │   └── mapper/
│   │       ├── auth.xml
│   │       └── main.xml
│   └── routes/            # 라우팅 설정
│       ├── index.js
│       ├── auth.route.js
│       └── main.route.js
└── view/                  # EJS 템플릿 파일
    ├── auth/
    │   └── login.ejs
    ├── main.ejs
    └── detail.ejs
```

## 🚀 시작하기

### 필수 요구사항

- Node.js (v14 이상)
- MySQL (v8.0 이상)
- npm 또는 yarn

### 설치 방법

1. **저장소 클론**
   ```bash
   git clone https://github.com/junSeockYoon/hanwori-diary-for-web.git
   cd hanwori-diary-for-web
   ```

2. **의존성 설치**
   ```bash
   npm install
   ```

3. **데이터베이스 설정**
   - MySQL 데이터베이스 생성
   - `src/config/database.js` 파일에서 데이터베이스 연결 정보 설정
   - 필요한 테이블 생성 (users, posts 등)

4. **서버 실행**
   ```bash
   # 개발 모드 (nodemon 사용)
   npm run dev
   
   # 프로덕션 모드
   npm start
   ```

5. **브라우저에서 접속**
   ```
   http://localhost:3001
   ```

## 📝 API 엔드포인트

### 인증 (Auth)
- `GET /auth/login` - 로그인 페이지 렌더링
- `POST /auth/api/login` - 사용자 정보 조회 (아이디와 비밀번호로 사용자 타입 확인)

### 다이어리 (Main)
- `GET /` - 다이어리 목록 페이지
- `GET /detail/:id` - 다이어리 상세 페이지
- `POST /update/:id` - 다이어리 수정
- `POST /delete/:id` - 다이어리 삭제

## 🗄️ 데이터베이스 스키마

### users 테이블
- `USER_ID` (VARCHAR) - 사용자 아이디 (PK)
- `PW` (VARCHAR) - 비밀번호
- `USER_TYPE` (VARCHAR) - 사용자 타입

### posts 테이블
- `ID` (INT) - 게시글 ID (PK, AUTO_INCREMENT)
- `TITLE` (VARCHAR) - 제목
- `CONTENT` (TEXT) - 내용
- `CREATE_DT` (DATETIME) - 작성일
- `MODIFY_DATE` (DATETIME) - 수정일

## 🔐 로그인 기능

현재 구현된 로그인 기능은 다음과 같습니다:

- **로그인 페이지**: 사용자가 아이디와 비밀번호를 입력할 수 있는 페이지 제공
- **사용자 정보 조회**: 입력된 아이디와 비밀번호로 데이터베이스에서 사용자 타입(`user_type`)을 조회
- **응답**: 조회된 사용자 정보를 JSON 형태로 반환

**참고**: 현재는 세션 관리나 인증 미들웨어가 구현되지 않아, 로그인 후에도 모든 페이지에 접근 가능합니다. 향후 세션 기반 인증이나 JWT 토큰 기반 인증을 추가할 수 있습니다.

## 🎨 UI/UX 특징

- 모던하고 깔끔한 디자인
- 반응형 레이아웃
- 직관적인 사용자 인터페이스
- 실시간 피드백 메시지
- 로그인 페이지 디자인

## 📦 주요 의존성

```json
{
  "ejs": "^3.1.10",
  "express": "^5.1.0",
  "mybatis-mapper": "^0.8.0",
  "mysql2": "^3.14.5"
}
```

## 🏗️ 아키텍처

이 프로젝트는 **MVC (Model-View-Controller)** 패턴을 따릅니다:

- **Model**: DAO 계층 (데이터베이스 접근)
- **View**: EJS 템플릿 (사용자 인터페이스)
- **Controller**: 컨트롤러 계층 (요청 처리)
- **Service**: 서비스 계층 (비즈니스 로직)

## 🔄 데이터 흐름

1. **요청**: 클라이언트가 라우터를 통해 요청
2. **컨트롤러**: 요청을 받아 서비스 계층 호출
3. **서비스**: 비즈니스 로직 처리 후 DAO 호출
4. **DAO**: MyBatis Mapper를 통해 SQL 실행
5. **응답**: 결과를 컨트롤러 → 뷰 또는 JSON으로 반환

## 📄 라이선스

이 프로젝트는 ISC 라이선스를 따릅니다.

## 👤 작성자

- **junSeockYoon** - [GitHub](https://github.com/junSeockYoon)

## 🙏 감사의 말

이 프로젝트를 사용해주셔서 감사합니다!

---

**Made with ❤️ by junSeockYoon**
