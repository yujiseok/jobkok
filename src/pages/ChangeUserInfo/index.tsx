import { useState } from "react";

const ChangeUserInfo = () => {
  const [changeTel, setChangeTel] = useState(true);
  const [changePassword, setChangePassword] = useState(true);

  // 전화번호 변경
  const handleChangeTelBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setChangeTel((prev) => !prev);
    if (event.currentTarget.type === "submit") {
      console.log("사용자 정보변경 api 호출");
    }
  };

  // 비밀번호 변경
  const handleChangePasswordBtn = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    setChangePassword((prev) => !prev);
    if (event.currentTarget.type === "submit") {
      console.log("사용자 정보변경 api 호출");
    }
  };

  const handleDelUserBtn = () => {
    if (
      confirm(
        "계정을 삭제하시겠습니까? 신중히 고민해주세요! 되돌릴 수 없습니다. (기획중...)",
      )
    )
      console.log("계정삭제 api 호출");
  };

  return (
    <div>
      <div>
        <h2>기업정보변경</h2>
        <p>계정 재설정 및 계정 삭제를 진행할 수 있습니다.</p>
      </div>
      <section>
        <h3>기업정보</h3>
        <dl>
          <div>
            <dt className="sr-only">잡콕미술학원 이미지</dt>
            <dd>
              <img src="#" />
            </dd>
          </div>
          <div>
            <dt>잡콕미술학원</dt>
            <dd>기업명</dd>
          </div>
          <div>
            <dt>이현서</dt>
            <dd>대표명</dd>
          </div>
          <div>
            <dt>jobkokart@art.net</dt>
            <dd>이메일</dd>
          </div>
          <div>
            <dt>333-24-56839</dt>
            <dd>사업자 등록번호</dd>
          </div>
        </dl>
      </section>
      <section>
        <h3>기업정보변경</h3>
        <form>
          <fieldset>
            <legend>전화번호</legend>
            {changeTel ? (
              <>
                <p>010-1234-5678</p>
                <button type="button" onClick={handleChangeTelBtn}>
                  전화번호 변경
                </button>
              </>
            ) : (
              <>
                <input type="tel" id="tel" placeholder="010-1234-5678" />
                <button type="submit" onClick={handleChangeTelBtn}>
                  변경 완료
                </button>
              </>
            )}
          </fieldset>
          <fieldset>
            <legend>비밀번호</legend>
            {changePassword ? (
              <>
                <p>********</p>
                <button type="button" onClick={handleChangePasswordBtn}>
                  비밀번호 변경
                </button>
              </>
            ) : (
              <>
                <label htmlFor="newPassword">새 비밀번호</label>
                <input
                  type="password"
                  id="newPassword"
                  placeholder="8~20자의 영문 대/소문자, 숫자, 특수문자 중 2가지 조합"
                />
                {/* 눈뜨기 */}
                <label htmlFor="confirmPassword">새 비밀번호 확인</label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="8~20자의 영문 대/소문자, 숫자, 특수문자 중 2가지 조합"
                />
                {/* 눈뜨기 */}
                <button type="submit" onClick={handleChangePasswordBtn}>
                  완료
                </button>
                <button type="button" onClick={handleChangePasswordBtn}>
                  취소
                </button>
              </>
            )}
          </fieldset>
        </form>
      </section>
      <button type="button" onClick={handleDelUserBtn}>
        계정삭제
      </button>
    </div>
  );
};
export default ChangeUserInfo;
