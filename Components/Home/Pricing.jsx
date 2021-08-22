import styled from "styled-components";
import Image from "next/image";
import icon1 from "../../Images/pricing-stars.png";
import { useState } from "react";
import Link from "next/link";

const Div = styled.div`
  background-color: #f9faff;
  padding-top: 126px;
  padding-bottom: 200px;

  .container {
    display: flex;
    justify-content: space-between;
    position: relative;

    img {
      position: absolute;
      width: 100vw;
      height: 100vh;
      top: 0;
    }
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
    }

    .texts {
      margin-top: 30px;
      font-size: 14px;
      font-weight: 300;
      line-height: 173%;
      max-width: 362px;
    }

    .prices {
      width: 80%;
      margin-left: 30px;
      .pricing-container {
        color: black;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        text-align: center;
        grid-gap: 22px;
        .price {
          padding: 84px 0px;
          background: #fdfdff;
          box-shadow: 0px 4px 14px 2px rgba(0, 0, 0, 0.25);
          border-top: 8px solid #192377;
          transition: all 0.2s ease;
          width: 100%;
          h3 {
            font-size: 50px;
          }

          .viewers {
            font-weight: bold;
            font-size: 18px;
            text-transform: uppercase;
          }

          .per {
            font-weight: 200;
            margin-top: 8px;
          }

          &:hover {
            background-color: #192377;
            color: white;
            transform: scale(1.02);
            border-top-color: #ffffff;
          }
        }
      }

      button {
        padding: 12px 18px;
        background-color: #fd9a01;
        color: white;
        border: none;
        margin-top: 49px;
        float: right;
        border-radius: 5px;
        transition: all 0.3 ease;
        cursor: pointer;
        &:hover {
          background-color: #fd7201;
        }
      }
    }

    @media (max-width: 1000px) {
      flex-flow: column;

      .prices {
        width: 100%;
        margin-left: 0px;
        margin-top: 50px;
      }
    }

    @media (max-width: 550px) {
      flex-flow: column;

      .prices {
        width: 100%;
        margin-left: 0px;
        margin-top: 50px;

        .pricing-container {
          grid-template-columns: 1fr;
          grid-template-rows: 1fr 1fr 1fr 1fr;
        }
      }
    }
  }
`;
const Pricing = () => {
  let prices = ["50", "100", "150", "200"];

  const [productPrices, setproductPrices] = useState("");
  return (
    <Div>
      <div className="container">
        <div className="text-container">
          <p className="subtitle">Pricing</p>
          <h2 className="title">See our competitive pricing</h2>
          <p className="texts">
            We offer the most competetive prices in the market. You have
            flexible pricings with different services.
          </p>
        </div>

        <div className="prices">
          <div className="pricing-container">
            {prices.map((price) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <div className="price" key={price}>
                  <h3>{price}</h3>
                  <p className="viewers">Viewers</p>
                  <p className="per">50$/week</p>
                </div>
              );
            })}
          </div>
          <Link href="/login" passHref>
            <button>Login to see more </button>
          </Link>
        </div>
      </div>
    </Div>
  );
};

export default Pricing;
