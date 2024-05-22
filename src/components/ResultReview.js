import React, { useState } from "react";
import "../css/components/ResultReview.css";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const blackStarStyles = {
  color: "#FF775E",
  fontSize: "40px",
};

function ResultReview({ user, setIsReview }) {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const handleReviewSubmit = async () => {
    const FormData = {
      history_id: user.history_id,
      grade: score,
    };

    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "https://catholic-mibal.site/user/comatch/feedback",
        FormData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (
        response.data.code === "SEC-001" ||
        response.data.code === "SEC-002"
      ) {
        localStorage.removeItem("token");
        navigate("/");
      } else if (response.data.status === 200) {
        setIsReview((prev) =>
          prev.map((item) =>
            item.history_id === user.history_id
              ? { ...item, feedback_state: "COMPLETE" }
              : item
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="ResultReview">
      <div className="ResultReview-text">
        <div className="ResultReview-text-top">
          <div className="ResultReview-text-username">
            {user.enemy_info.contact_id}
          </div>
          님에 대한
        </div>
        ComatchingAI의 매칭은 어떠셨나요?
      </div>
      <div className="ResultReview-star">
        <Rating
          name="read-only"
          value={score}
          precision={1}
          onChange={(event, newValue) => {
            setScore(newValue);
          }}
          sx={{ "& .MuiSvgIcon-root": blackStarStyles }}
        />
      </div>
      <button className="ResultReview-button" onClick={handleReviewSubmit}>
        전송
      </button>
    </div>
  );
}

export default ResultReview;
