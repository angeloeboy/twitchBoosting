import styled from "styled-components";
import Image from "next/image";

import heroRocket from "../../Images/hero-rocket.png";

const Div = styled.div`
  background: linear-gradient(290.34deg, #192377 40.12%, #2f3fc2 100%);
  max-height: 835px;
  height: 100vh;
  /* padding-top: 75px; */

  .container {
    position: relative;
    height: 100%;
    .text-container {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      max-width: 649px;

      h1 {
        /* width: 50%; */
        font-size: 44px;
        color: white;
        span {
          color: #fd9a01;
        }
      }

      p {
        margin-top: 56px;
        color: white;
        font-weight: 300;
      }

      button {
        padding: 14px 42px;
        background-color: transparent;
        border: 2px solid #fd9a01;
        border-radius: 5px;
        margin-top: 48px;
        color: white;
        font-weight: 300;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s ease;
        &:hover {
          background-color: #fd9a01;
        }
      }
    }

    .img-container {
      width: 803px;
      position: absolute;
      right: 0;
      bottom: -10px;
      img {
        width: 100%;
      }
    }

    @media (max-width: 1300px) {
      .img-container {
        right: -5%;
      }

      .text-container {
        max-width: 40%;
        h1 {
          font-size: 35px;
        }
      }
    }

    @media (max-width: 1060px) {
      .img-container {
        width: 650px;
      }
    }

    @media (max-width: 800px) {
      .img-container {
        display: none;
      }

      .text-container {
        width: 80%;
        max-width: initial;
      }
    }

    @media (max-width: 800px) {
      .text-container {
        h1 {
          font-size: 2rem;
        }

        p {
          margin-top: 30px;
        }
      }
    }
  }
`;

const Hero = () => {
  return (
    <Div>
      <div className="container">
        <div className="text-container">
          <h1>
            Use our <span>Twitch</span> viewer bot & chatbot to{" "}
            <span>boost</span> your channel!
          </h1>
          <p>
            Your journey to affiliate begins here, send viewers or followers to
            any twitch channel using the safest twitch bots.
          </p>
          <button>See Prices</button>
        </div>
        <div className="img-container">
          <Image src={heroRocket} alt="Frontpage rocket" />
        </div>
      </div>
    </Div>
  );
};

export default Hero;
