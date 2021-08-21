import Nav from "../components/Nav";
import styled from "styled-components";
import { useState } from "react";

const PricingPage = styled.section`
  background: #192377;
  min-height: 100vh;
  padding-bottom: 170px;
  .container {
    padding-top: 95px;
    color: white;
    .title {
      margin-top: 45px;
      text-align: center;
      color: white;
      font-weight: 700;
      font-size: 40px;
    }

    .subtitle {
      font-weight: 300;
      text-align: center;
      margin-top: 23px;
    }

    .buttons {
      margin: 0 auto;
      display: block;
      text-align: center;
      margin-top: 38px;

      button {
        padding: 8px 48px;
        border: 2px solid #203298;
        color: white;
        background-color: transparent;
        transition: all 0.3s ease;
        &:hover {
          background-color: #203298;
        }
      }

      .clicked {
        background-color: #203298;
      }
    }

    .price-section {
      display: flex;
      justify-content: space-between;
      align-items: top;
      margin-top: 100px;

      .description-tab {
        max-width: 450px;
        width: 60%;
        background-color: #19226a;
        padding: 61px 50px;
        border-radius: 19px;

        .description-title {
          font-weight: 700;
          font-size: 2rem;
        }

        .description-text {
          font-size: 16px;
          font-weight: 300;
          margin-top: 24px;
        }
      }

      .pricing-prices {
        width: 100%;
        margin-left: 50px;

        .individual-price {
          background-color: #19226a;
          padding: 19px 50px;
          border-radius: 15px;
          margin-bottom: 25px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          transition: all 0.4s ease;

          &:hover {
            background-color: #18215f;
          }
          .amount {
            font-size: 24px;
            font-weight: bold;
          }

          .price {
            font-weight: bold;
            font-size: 30px;
            margin-top: 14px;
            span {
              font-size: 20px;
              font-weight: 300;
            }
          }
        }
      }

      @media (max-width: 1200px) {
        flex-flow: column;
        .description-tab {
          max-width: 100%;
          width: 100%;
        }
        .pricing-prices {
          margin-left: 0px;
          margin-top: 50px;
        }
      }
    }

    @media (max-width: 600px) {
      button {
        display: block;
        width: 200px;
        margin: 5px auto;
      }

      .price-section {
        .pricing-prices {
          .individual-price {
            flex-flow: column;
            text-align: center;
            .amount {
              margin-top: 30px;
            }
          }
        }
      }
    }
  }
`;

const Prices = () => {
  let choices = [
    {
      Choice: "Viewers",
      Description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat repellat expedita laboriosam totam, soluta ipsa nam omnis atque inventore ipsum enim maxime. In, accusamus nesciunt. Adipisci, doloremque. Odio, ipsa recusandae.",
    },
    {
      Choice: "Chatters",
      Description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat repellat expedita laboriosam totam, soluta ipsa nam omnis atque inventore ipsum enim maxime. In, accusamus nesciunt. Adipisci, doloremque. Odio, ipsa recusandae.",
    },
    {
      Choice: "Followers",
      Description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat repellat expedita laboriosam totam, soluta ipsa nam omnis atque inventore ipsum enim maxime. In, accusamus nesciunt. Adipisci, doloremque. Odio, ipsa recusandae.",
    },
  ];

  let prices = [
    {
      Amount: "50",
      Price: "19",
    },
    {
      Amount: "100",
      Price: "20",
    },
    {
      Amount: "150",
      Price: "21",
    },
    {
      Amount: "200",
      Price: "22",
    },
  ];

  const [priceChoice, setPriceChoice] = useState(choices[0]);

  const [viewersClicked, setviewersClicked] = useState(true);
  const [chattersClicked, setchattersClicked] = useState(false);
  const [followersClicked, setfollowersClicked] = useState(false);

  const [weeklyClicked, setweeklyClicked] = useState(true);
  const [monthlyClicked, setmonthlyClicked] = useState(false);

  const [freqChoice, setFreChoice] = useState("weekly");

  let serviceBtnClicked = (e) => {
    e.preventDefault();
    let choice = e.target.value;
    console.log(choice);

    if (choice == "Viewers") {
      setviewersClicked(true);
      setchattersClicked(false);
      setfollowersClicked(false);

      setPriceChoice(choices[0]);
    } else if (choice == "Chatters") {
      setviewersClicked(false);
      setchattersClicked(true);
      setfollowersClicked(false);
      setPriceChoice(choices[1]);
    } else {
      setviewersClicked(false);
      setchattersClicked(false);
      setfollowersClicked(true);
      setPriceChoice(choices[2]);
    }
  };

  let frequencyBtnClicked = (e) => {
    e.preventDefault();
    let freqChoice = e.target.value;
    console.log(freqChoice);

    if (freqChoice == "Weekly") {
      setweeklyClicked(true);
      setmonthlyClicked(false);
      setFreChoice("weekly");
    } else {
      setweeklyClicked(false);
      setmonthlyClicked(true);
      setFreChoice("monthly");
    }
  };

  return (
    <>
      <Nav />

      <PricingPage>
        <div className="container">
          <h1 className="title">Pricing</h1>
          <p className="subtitle">No contracts. No surprise fees.</p>

          <div className="buttons-service-type buttons">
            <button
              className={viewersClicked ? "clicked" : ""}
              onClick={(e) => serviceBtnClicked(e)}
              value="Viewers"
            >
              {" "}
              Viewers
            </button>
            <button
              className={chattersClicked ? "clicked" : ""}
              onClick={(e) => serviceBtnClicked(e)}
              value="Chatters"
            >
              Chatters
            </button>
            <button
              className={followersClicked ? "clicked" : ""}
              onClick={(e) => serviceBtnClicked(e)}
              value="Followers"
            >
              Followers
            </button>
          </div>

          <div className="buttons-frequency buttons">
            <button
              className={weeklyClicked ? "clicked" : ""}
              onClick={(e) => frequencyBtnClicked(e)}
              value="Weekly"
            >
              Weekly
            </button>
            <button
              className={monthlyClicked ? "clicked" : ""}
              onClick={(e) => frequencyBtnClicked(e)}
              value="Monthly"
            >
              Monthly
            </button>
          </div>

          <div className="price-section">
            <div className="description-tab">
              <h3 className="description-title">{priceChoice.Choice}</h3>
              <p className="description-text">{priceChoice.Description}</p>
            </div>
            <div className="pricing-prices">
              {prices.map((price) => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <div className="individual-price">
                    <div>
                      <p>Intro</p>
                      <p className="price">
                        {price.Price} <span>/ {freqChoice} </span>{" "}
                      </p>
                    </div>
                    <p className="amount">
                      {price.Amount} {priceChoice.Choice}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </PricingPage>
    </>
  );
};

export default Prices;
