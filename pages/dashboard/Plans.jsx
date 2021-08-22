import styled from "styled-components";
import { useState, useEffect } from "react";
import OrderForm from "../../Components/Dashboard/orderForm";
import { AnimatePresence, motion } from "framer-motion";

const Div = styled.div`
  .header {
    display: flex;
    justify-content: space-between;

    .dropdown {
      display: inline-block;
      width: 150px;
      text-align: center;
      position: relative;
      user-select: none;

      .choice {
        padding: 9px 0px;
        width: 150px;
        text-align: center;
        border: 2px solid #203298;
        /* border-radius: 6px; */
        cursor: pointer;
      }

      .choice {
        border: 1px solid white;
        background-color: transparent;
        color: white;
        transition: all 0.1s ease;
      }

      div {
        position: absolute;
        /* background-color: #203298; */
        background-color: white;
        width: 100%;
        top: 90%;
        color: black;
        p {
          padding: 7px 0px;
          transition: all 0.3s ease;
          cursor: pointer;
          &:hover {
            background-color: #182677;
            color: white;
          }
        }
      }
    }
  }

  .header-text {
    margin-top: 23px;
    font-weight: 200;
    font-size: 16px;
  }

  .frequency {
    margin-top: 40px;

    button {
      width: 151px;
      padding: 8px 0px;
      border: 2px solid #203298;
      background-color: transparent;
      color: white;
      border-radius: 6px;
      margin-right: 10px;
      transition: all 0.2s ease;

      &:hover {
        background-color: #203298;
      }
    }
  }

  .plans-container {
    margin-top: 13px;

    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
`;

const Plan = styled.div`
  padding: 36px 0px;
  text-align: center;
  width: 33%;
  background-color: #0e0e0e;
  border-radius: 12px;
  max-width: 330px;
  min-width: 278px;
  margin-top: 37px;

  .number {
    font-weight: bold;
    font-size: 60px;
  }

  .typeOfService {
    margin-top: -10px;
    font-weight: 200;
    font-size: 14px;
  }

  .price {
    margin-top: 37px;
  }

  button {
    margin-top: 40px;
    width: 100%;
    max-width: 153px;
    padding: 10px 0px;
    background: #203298;
    border-radius: 8px;
    border: none;
    color: white;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
  }
`;

let Plans = () => {
  const [frequency, setfrequency] = useState("weekly");
  const [plans, setPlans] = useState([]);
  const [prodChoice, setprodChoice] = useState("ViewBot");
  const [choiceVisible, setchoiceVisible] = useState(false);
  const [isBuyVisible, setisBuyVisible] = useState(false);

  useEffect(() => {
    getSubscriptionPlans();
  }, []);

  let handleChoiceChange = (e) => {
    setprodChoice(e.target.innerText);
    setchoiceVisible(!choiceVisible);
  };

  let handleFreqChange = (e) => {
    let freqType = e.target.value;
    console.log(freqType);

    if (freqType == "weekly") {
      setfrequency("weekly");
    } else {
      setfrequency("monthly");
    }
  };

  let getSubscriptionPlans = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://easyviews.herokuapp.com/Api/V1/GetSubscriptions",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setPlans(result.Response);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      <Div>
        <div className="header">
          <h1>Plans</h1>

          <div className="dropdown">
            <p
              className="choice"
              onClick={() => setchoiceVisible(!choiceVisible)}
            >
              {prodChoice}
            </p>
            {choiceVisible && (
              <div>
                <p onClick={(e) => handleChoiceChange(e)}>ViewBot</p>
                <p onClick={(e) => handleChoiceChange(e)}>ChatBot</p>
                <p onClick={(e) => handleChoiceChange(e)}>FollowBot</p>
              </div>
            )}
          </div>
        </div>

        <p className="header-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id ac ornare
          feugiat risus non odio quam sit netus.{" "}
        </p>

        <div className="frequency">
          <button
            className="weekly"
            value="weekly"
            style={
              frequency == "weekly"
                ? { backgroundColor: "#203298" }
                : { backgroundColor: "transparent" }
            }
            onClick={(e) => handleFreqChange(e)}
          >
            Weekly
          </button>
          <button
            className="monthly"
            value="monthly"
            style={
              frequency == "monthly"
                ? { backgroundColor: "#203298" }
                : { backgroundColor: "transparent" }
            }
            onClick={(e) => handleFreqChange(e)}
          >
            Monthly
          </button>
        </div>

        <div className="plans-container">
          {plans.map((plan) => {
            let freq = frequency == "weekly" ? 7 : 30;

            if (plan.ServiceType == prodChoice && freq == plan.Duration) {
              return (
                <Plan key={plan.Name}>
                  <h3 className="number">{plan.FollowersRequested}</h3>
                  <p className="typeOfService">{plan.ServiceType}</p>
                  <p className="price">
                    ${plan.Cost}/{frequency}
                  </p>
                  <button onClick={() => setisBuyVisible(!isBuyVisible)}>
                    Purchase
                  </button>
                  <AnimatePresence>
                    {isBuyVisible && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0 }}
                        variants={{
                          hidden: {
                            scale: 1,
                            opacity: 0,
                          },
                          visible: {
                            scale: 1,
                            opacity: 1,
                            transition: {
                              delay: 0.4,
                            },
                          },
                        }}
                      >
                        <OrderForm
                          setisBuyVisible={setisBuyVisible}
                          plan={plan}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Plan>
              );
            } else {
              return null;
            }
          })}
        </div>
      </Div>
    </div>
  );
};

export default Plans;
