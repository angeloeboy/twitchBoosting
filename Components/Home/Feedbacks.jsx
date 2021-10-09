import styled from "styled-components";
import Image from "next/image";

import userImg from "../../Images/user.jpg";
import { useState, useEffect } from "react";
import Carousel from "./Carousel";
const Div = styled.div`
  background: linear-gradient(283.19deg, #192377 0%, #3244da 99.3%);
  padding: 100px 0px;
  .title,
  .subtitle {
    text-transform: uppercase;
  }

  .subtitle {
    letter-spacing: 0.34em;
    color: #d1d1d1;
  }

  .title {
    font-weight: bold;
    font-size: 30px;
    color: white;
  }
`;

const Review = styled.div`
  background-color: green;
  text-align: center;
  margin-top: 55px;

  .img-container {
    display: block;

    div {
      border-radius: 50%;
    }
  }

  .name {
    margin-top: 34px;
  }

  .review {
    margin-top: 20px;
  }
`;

const Feedback = () => {
  const [visibleReviewIndex, setvisibleReviewIndex] = useState(0);

  return (
    <Div>
      <div className="container">
        <div className="text-container">
          <p className="subtitle">Feedbacks</p>
          <h2 className="title">See what our clients tell about us</h2>
        </div>

        <div className="slider">
          <Carousel />
        </div>
      </div>
    </Div>
  );
};

export default Feedback;
