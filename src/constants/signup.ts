// 비밀번호 유효성 검사 정규표현식
export const PW_REGEX =
  /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{8,20}$/;

// 휴대폰 번호 유효성 검사 정규표현식
export const PHONE_REGEX = /^\d{3}-\d{3,4}-\d{4}$/;

// 사업자 등록 번호 정규 표현식
export const REGISTRATION_REGEX = /^\d{3}-\d{2}-\d{5}$/;

// 한글, 영문 입력 정규표현식
export const CEO_REGEX = /^[a-zA-Z가-힣]*$/;
