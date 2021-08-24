import styled from "styled-components";
import Image from "next/image";
import icon1 from "../../Images/pricing-stars.png";
import { useState, useEffect } from "react";
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
      width: 70%;
      margin-left: 30px;
      .pricing-container {
        color: black;
        display: flex;
        flex-flow: column;

        .price {
          padding: 25px;
          background: #fdfdff;
          box-shadow: 0px 4px 14px 2px rgba(0, 0, 0, 0.25);
          border-top: 5px solid #192377;
          transition: all 0.2s ease;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 20px;
          border-radius: 5px;

          h3 {
            font-size: 30px;
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
          .price {
            flex-flow: column;
          }
        }
      }
    }
  }
`;
const Pricing = () => {
  // let prices = ["50", "100", "150", "200"];
  // const [plans, setplans] = useState([]);
  const [loaded, setloaded] = useState(false);
  const [productPrices, setproductPrices] = useState("");

  // useEffect(() => {
  //   getPlans();
  // }, []);

  // useEffect(() => {
  //   if (plans.length > 0) {
  //     console.log(plans);
  //     setloaded(true);
  //   }
  // }, [plans]);

  // let getPlans = () => {
  //   var requestOptions = {
  //     method: "GET",
  //     redirect: "follow",
  //   };

  //   fetch(
  //     "https://easyviews.herokuapp.com/Api/V1/GetSubscriptions",
  //     requestOptions
  //   )
  //     .then((response) => response.json())
  //     .then((result) => {
  //       let arr = result.Response.filter((plan) => {
  //         return plan.ServiceType === "ViewBot";
  //       });

  //       // console.log(arr);

  //       setplans(arr);
  //     })
  //     .catch((error) => console.log("error", error));
  // };

  let plans = [
    {
      Name: "Viewers",
      Cost: 15,
    },
    {
      Name: "Chatters",
      Cost: 15,
    },
    {
      Name: "Followers",
      Cost: 15,
    },
  ];

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
            {plans.map((plan) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <div className="price">
                  <h3>{plan.Name}</h3>
                  <p className="cost">Starts at ${plan.Cost}</p>
                </div>
              );
            })}
          </div>
          <Link href="/prices" passHref>
            <button>View More </button>
          </Link>
        </div>
      </div>
    </Div>
  );
};

export default Pricing;
