import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import styled from "styled-components";
import RocketLoading from "./../../Components/Dashboard/rocketLoading";

const PaymentsContainer = styled.div`
  /* position: relative; */
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
      display: flex;
      align-items: center;
      h1 {
        display: inline-block;
      }

      .available,
      .redeemed {
        display: inline-block;
        margin-left: 20px;
        cursor: pointer;
        font-weight: 300;
      }
    }

    button {
      border: 1px solid white;
      background-color: transparent;
      color: white;
      width: 150px;
      border-radius: 8px;
      padding: 14px 0px;
      margin-left: 16px;
      transition: all 0.1s ease;
      cursor: pointer;
      &:hover {
        background-color: #203298;
        color: white;
        border: 1px solid #203298;
      }
    }

    @media (max-width: 740px) {
      flex-flow: column;
      align-items: initial;
      div {
        flex-flow: column;
        align-items: inherit;

        .available,
        .redeemed {
          margin-left: 0px;
          margin-right: 20px;
          margin-top: 10px;
        }
      }

      button {
        margin-left: 0px;
        margin-top: 15px;
      }
    }
  }

  .panels {
    display: flex;
    width: 100%;
    justify-content: space-between;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-top: 66px;
    padding: 0px 21px;
    padding-bottom: 21px;
    border-bottom: 1px solid #0e0e0e;
    p {
      font-weight: 400;
      color: #535353;
    }

    .Value {
      text-align: center;
    }

    .Available {
      text-align: right;
    }

    @media (max-width: 550px) {
      padding: 0px;
    }
  }

  .search-bar {
    width: 100%;
    border-bottom: 1px solid #2e2e2e;
    outline: none;
    margin-top: 89px;
    display: flex;
    align-items: center;
    padding-bottom: 10px;

    input {
      background-color: transparent;
      border: none;
      color: #757575;
      outline: none;
      font-size: 16px;
      margin-left: 29px;
      width: 100%;
    }
  }

  .account-details {
    background-color: #203298;
    margin-right: 39px;
    padding: 21px;
    /* margin-top: 42px; */
    margin-bottom: 30px;
    border-radius: 8px;
    max-width: 300px;
    p {
      &:nth-child(2),
      &:nth-child(3) {
        font-size: 14px;
        margin-top: 5px;
      }
    }

    .verify {
      width: 100%;
      text-align: center;
      z-index: 999;
      transition: all 0.3s ease;
      justify-content: center;
      align-items: center;
      margin-top: 10px;
      font-size: 12px;

      button {
        margin-top: 10px;
        padding: 10px;
        background-color: transparent;
        border: 1px solid white;
        color: white;
        font-size: 12px;
        width: 100%;
        &:hover {
          background-color: #ee3737;
        }
      }
    }
  }

  @media (max-width: 700px) {
    .main-orders {
      overflow-x: scroll;

      .panels,
      .orders {
        min-width: 650px;
      }
    }
  }

  @media (max-width: 400px) {
    .main-orders {
      overflow-x: scroll;

      .panels,
      .orders {
        min-width: 450px;
      }
    }
  }
`;

const Payment = styled.div`
  user-select: none;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  padding: 24px 21px;
  justify-content: space-between;
  transition: all 0.3s ease;
  margin-top: 16px;
  align-items: center;
  &:hover {
    background-color: #0e0e0e;
    border-radius: 12px;
  }

  .status {
    text-align: center;
    background-color: red;
    width: 120px;
    margin: 0 auto;
    background: rgba(27, 27, 27, 0.34);
    border-radius: 7px;
    padding: 5px 0px;
  }

  .value {
    text-align: center;
  }

  .available {
    text-align: right;
  }

  @media (max-width: 998px) {
    font-size: 14px;

    .id {
      width: 100px;
      display: flex;
      p {
        display: inline-block;
        word-break: break-all;
      }
    }
  }

  @media (max-width: 440px) {
    font-size: 12px;

    .id {
      width: 70px;
    }
  }
`;

let Profile = () => {
  const [payments, setpayments] = useState([]);
  const [loading, setloading] = useState(true);
  const [userData, setUserData] = useState("");
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userObject"));
    setpayments(user.PaymentHistory);
    setUserData(user);
    setloading(false);
  }, []);

  if (loading) {
    return (
      <PaymentsContainer>
        <div className="header">
          <div>
            <h1>Payments History</h1>
          </div>
        </div>

        <div className="main-orders">
          <div className="panels">
            <p>Name</p>
            <p className="Value">Value</p>
            <p className="Available">Date</p>
          </div>

          <div className="orders">
            <RocketLoading />
          </div>
        </div>
      </PaymentsContainer>
    );
  } else {
    return (
      <PaymentsContainer>
        <div className="account-details">
          <p> Type: {userData.AccountType}</p>
          <p>Credits: {userData.Credits}</p>

          {!userData.Verified && (
            <div className="verify">
              <p>Your account is unverified</p>
              <button
                onClick={() => {
                  setTimeout(() => {
                    setisNotVerifiedVisible(false);
                  }, 1000);
                  sendVerification();
                }}
              >
                Send Verification
              </button>
            </div>
          )}
        </div>

        <div className="header">
          <div>
            <h1>Payments History</h1>
          </div>
        </div>

        <div className="main-orders">
          <div className="panels">
            <p>Name</p>
            <p className="Value">Value</p>
            <p className="Available">Date</p>
          </div>

          <div className="orders">
            {payments.map((payment) => {
              return (
                <div key={payment.Name}>
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {
                        opacity: 0,
                      },
                      visible: {
                        opacity: 1,
                        transition: {
                          delay: 0.2,
                        },
                      },
                    }}
                  >
                    <Payment>
                      <p>{payment.Name}</p>
                      <p className="value">{payment.Value}</p>
                      <p className="available">{payment.RedeemDate}</p>
                    </Payment>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </PaymentsContainer>
    );
  }
};

export default Profile;
