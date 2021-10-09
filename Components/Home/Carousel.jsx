/* eslint-disable react/jsx-key */
import { useEmblaCarousel } from "embla-carousel/react";
import styled from "styled-components";
import Image from "next/image";
import userImg from "../../Images//user.jpg";
import { useCallback, useEffect, useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Div = styled.div`
  .embla {
    overflow: hidden;
  }
  .embla__container {
    display: flex;
  }
  .embla__slide {
    position: relative;
    flex: 0 0 100%;
    width: 500px;
    color: white;
  }
`;

const Review = styled.div`
  /* max-width: 500px; */
  width: 100%;
  margin: 0 auto;
  display: block;
  text-align: center;
  margin-top: 55px;
  color: white;
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

  .loading,
  .loadingText {
    width: 100px;
    content: "";
    color: transparent;
    animation: loading 3s infinite;
    border-radius: 10px;
    margin-left: auto;
    margin-right: auto;
  }

  .loadingText {
    width: 150px;
  }

  .loadingImg {
    width: 100px;
    height: 100px;
    animation: loading 3s infinite;
    margin-left: auto;
    margin-right: auto;
    border-radius: 50%;
  }

  @keyframes loading {
    0% {
      background-color: white;
    }

    50% {
      background-color: gray;
    }

    100% {
      background-color: white;
    }
  }
`;

const Carousel = () => {
  const [feedbacks, setfeedbacks] = useState([]);
  const [feedbacksLoaded, setfeedbacksLoaded] = useState(false);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("https://easyviews.herokuapp.com/Api/V1/GetFeedback", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.Response);
        setfeedbacks(result.Response);
        setfeedbacksLoaded(true);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <Div>
      <Slider {...settings}>
        {!feedbacksLoaded && (
          <Review>
            <div className="img-container loadingImg"></div>
            <h4 className="name loading">Loading</h4>
            <p className="review loadingText">Loading</p>
          </Review>
        )}
        {feedbacks.map((feedback) => {
          return (
            <Review>
              <div className="img-container">
                <Image
                  src={feedback.ProfilePicture}
                  alt="Reviewer's Image"
                  width="100%"
                  height="100%"
                />
              </div>
              <h4 className="name">{feedback.Name}</h4>
              <p className="review">{feedback.Message}</p>
            </Review>
          );
        })}
      </Slider>
    </Div>
  );
};

export default Carousel;
