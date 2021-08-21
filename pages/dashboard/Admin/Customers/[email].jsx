/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/link-passhref */
import { useState, useEffect } from "react";
import MainDashboard from "../../../../Components/Dashboard/main-dashboard";
import { useRouter } from "next/router";
import styled from "styled-components";
import coin from "../../../../Images/coin.png";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import checkImg from "../../../../Images/check.svg";
import xImg from "../../../../Images/x-image.svg";

const CostumerData = styled.div`
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .back {
      display: flex;
      align-items: center;

      p {
        margin-right: 20px;
        font-size: 50px;
        cursor: pointer;
      }
    }
    button {
      border: 1px solid white;
      background-color: transparent;
      color: white;
      width: 132px;
      border-radius: 8px;
      padding: 14px 0px;
      margin-left: 16px;
      transition: all 0.1s ease;
    }

    .banned {
      border-color: ${(props) => (props.banned ? "white" : "#1D1C1C")};
      color: ${(props) => (props.banned ? "white" : "#1D1C1C")};

      &:hover {
        border-color: white;
        color: white;
      }
    }

    .verified {
      border-color: ${(props) => (props.verified ? "white" : "#1D1C1C")};
      color: ${(props) => (props.verified ? "white" : "#1D1C1C")};
    }
  }

  .credits {
    display: flex;
    align-items: center;
    p {
      margin-left: 11px;
    }
  }

  .divider {
    height: 1px;
    width: 100%;
    background-color: #1d1c1c;
    margin-top: 25px;
  }

  .no-orders {
    margin-left: 20px;
    margin-top: 20px;
  }

  @media (max-width: 885px) {
    .header {
      flex-flow: column;
      align-items: initial;
      h1 {
        font-size: 20px;
      }
      button {
        margin-left: 0px;
        margin: 20px 0px 20px 14px;
      }
    }
  }

  @media (max-width: 550px) {
    .header {
      flex-flow: column;
      align-items: initial;
      .back {
        flex-flow: column;
        align-items: initial;

        p {
          font-size: 3rem;
        }
      }
      button {
        margin-left: 0px;
        margin: 20px 14px 20px 0px;
      }
    }
  }
`;

const OrderContainer = styled.div`
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

    .status {
      text-align: center;
    }

    .online {
      text-align: right;
    }

    @media (max-width: 550px) {
      padding: 0px;
    }
  }

  @media (max-width: 677px) {
    .main-orders {
      overflow-x: scroll;

      .panels,
      .orders {
        min-width: 400px;
      }
    }
  }
`;

const Order = styled.div`
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

  .online {
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

  @media (max-width: 550px) {
    padding: 0px;
  }

  @media (max-width: 440px) {
    font-size: 12px;

    .id {
      width: 70px;
    }
  }
`;
let Costumer = (props) => {
  //Get email from link
  const router = useRouter();
  const { email } = router.query;

  const [customerData, setcustomerData] = useState({});
  const [loaded, setloaded] = useState(false);
  const [banned, setbanned] = useState();

  useEffect(() => {
    if (email != undefined) {
      getCustomer();
    }
  }, [email, banned]);

  useEffect(() => {
    if (Object.keys(customerData).length !== 0) {
      setloaded(true);
    }
  }, [customerData]);

  let getCustomer = () => {
    let cookie = localStorage.getItem("cookie");

    var myHeaders = new Headers();
    myHeaders.append("x-api-key", cookie);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://easyviews.herokuapp.com/Api/v1/Staff/Users/View/" + email,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setcustomerData(result.Response);
        setbanned(result.Response.Customer.Blacklisted);
      })
      .catch((error) => console.log("error", error));
  };

  let toggleBan = () => {
    let cookie = localStorage.getItem("cookie");

    var myHeaders = new Headers();
    myHeaders.append("x-api-key", cookie);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
    };

    if (!customerData.Customer.Blacklisted) {
      fetch(
        "https://easyviews.herokuapp.com/Api/v1/Staff/Users/Blacklist/" + email,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result.Response);
          setbanned(true);
        })
        .catch((error) => console.log("error", error));
    } else {
      fetch(
        "https://easyviews.herokuapp.com/Api/v1/Staff/Users/unBlacklist/" +
          email,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result.Response);
          setbanned(false);
        })
        .catch((error) => console.log("error", error));
    }
  };

  if (!loaded) {
    return (
      <div>
        <CostumerData>
          <div className="header">
            <div className="back">
              <p onClick={() => router.back()}>{"<"}</p>
              <h1>{email}</h1>
            </div>

            <div className="btn-container">
              <button className="banned" onClick={() => toggleBan()}>
                Banned
              </button>
              <button className="verified">Verified</button>
            </div>
          </div>
          <div className="credits">
            <Image src={coin} alt="coin image" />
            <p>Loading</p>
          </div>
          <div className="divider"></div>

          <OrderContainer>
            <div className="main-orders">
              <div className="panels">
                <p>Order ID</p>
                <p className="status">Status</p>
                <p className="online">Online</p>
              </div>
            </div>
          </OrderContainer>
        </CostumerData>
      </div>
    );
  } else {
    return (
      <div>
        <CostumerData
          verified={customerData.Customer.EmailVerified}
          banned={banned}
        >
          <div className="header">
            <div className="back">
              <p onClick={() => router.back()}>{"<"}</p>
              <h1>{email}</h1>
            </div>

            <div className="btn-container">
              <button className="banned" onClick={() => toggleBan()}>
                Banned
              </button>
              <button className="verified">Verified</button>
            </div>
          </div>
          <div className="credits">
            <Image src={coin} alt="coin image" />
            <p>{customerData.Customer.Credits}</p>
          </div>
          <div className="divider"></div>

          <OrderContainer>
            <div className="main-orders">
              <div className="panels">
                <p>Order ID</p>
                <p className="status">Status</p>
                <p className="online">Online</p>
              </div>

              <div className="orders">
                {customerData.Orders.map((order) => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <Link
                      href={"/dashboard/Admin/Orders/" + order._id}
                      key={order._id}
                    >
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
                        <Order order={order}>
                          <div className="id">
                            <p>{order._id}</p>
                          </div>
                          <p
                            className="status"
                            style={
                              order.Status == "Processing"
                                ? { color: "#FD9A01" }
                                : { color: "#209833" }
                            }
                          >
                            {order.Status}
                          </p>
                          <div className="online">
                            {order.Online ? (
                              <Image src={checkImg} alt="Online Image" />
                            ) : (
                              <Image src={xImg} alt="Offline image" />
                            )}
                          </div>
                        </Order>
                      </motion.div>
                    </Link>
                  );
                })}

                {customerData.Orders.length == 0 && (
                  <div>
                    <p className="no-orders">No orders found</p>
                  </div>
                )}
              </div>
            </div>
          </OrderContainer>
        </CostumerData>
      </div>
    );
  }
};

export default Costumer;
