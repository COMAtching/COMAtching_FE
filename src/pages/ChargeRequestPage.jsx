import React, { useState } from "react";
import { useRecoilState } from "recoil";
import Background from "../components/Background.jsx";
import "../css/pages/ChargeRequestPage.css"; // 스타일링을 위한 CSS 파일 생성
import HeaderMain from "../components/HeaderMain";
import { charge } from "../Atoms";
import axios from "axios";
import NavBar from "../components/Navbar.jsx";
function ChargeRequestPage() {
  const [amount, setAmount] = useState("");
  const [chargeState, setChargeState] = useRecoilState(charge); // Recoil 상태 불러오기

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = async () => {
    // Recoil 상태 업데이트
    setChargeState({ chargeclick: true });

    try {
      // 쿠키에서 Authorization 토큰을 가져오기
      const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
        const [name, value] = cookie.split('=');
        acc[name] = value;
        return acc;
      }, {});
      const accessToken = cookies.Authorization;

      if (!accessToken) {
        throw new Error('No access token found in cookies');
      }

      // 백엔드로 POST 요청 보내기
      const response = await axios.post(
        "http://backend.comatching.site:8080/auth/user/api/charge",
        {
          amount: parseInt(amount), // amount를 integer로 변환하여 전송
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        alert("충전 요청이 성공적으로 전송되었습니다.");
        // 이후 리디렉션 또는 다른 로직 추가 가능
      } else {
        alert("충전 요청에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error submitting charge request:", error);
      alert("충전 요청 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="container">
        <HeaderMain />
        <Background />
        <NavBar/>
        <div className="charge-request-clicked">
            <div className="charge-request-clicked-top-page">
                💁 부스에 충전 요청하기
            </div>
            
            <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="충전할 금액을 입력하세요"
            className="charge-input"
            />
            
            <li className="charge-request-clicked-text">
                입금 후 포인트 충전을 원하거나
            </li>
            <li className="charge-request-clicked-text">
                포인트를 PickMe로 바꾸고 싶을때 버튼을 눌러 주세요
            </li>
            <li className="charge-request-clicked-text">
                요청 후에는 입금 화면과 아이디를 보여 주세요.
            </li>
            <li className="charge-request-clicked-text">
                버튼 남용 시 이용이 제한될 수 있으니 유의 바랍니다.
            </li>
            <button
            className="charge-request-clicked-button"
            onClick={handleSubmit} // 버튼 클릭 시 handleSubmit 함수 호출
            >
                충전 요청하기
            </button>
        </div>
    </div>
);
}

export default ChargeRequestPage;