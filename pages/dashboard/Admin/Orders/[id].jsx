/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import checkImg from "../../../../Images/check.svg";
import xImg from "../../../../Images/x-image.svg";
const OrderContainer = styled.div`
  .arrow {
    display: inline-block;
    font-weight: 300;
    font-size: 3rem;
  }

  .head {
    padding-bottom: 39px;
    border-bottom: 1px solid #1d1c1c;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      font-size: 30px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .arrow {
        display: inline-block;
        font-weight: 300;
        font-size: 3rem;
        margin-right: 20px;
        cursor: pointer;
      }
    }
    .online-bottype-container {
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

      .online {
        border-color: ${(props) => (props.online ? "white" : "#1D1C1C")};
        color: ${(props) => (props.online ? "white" : "#1D1C1C")};
      }
    }

    @media (max-width: 980px) {
      h1 {
        font-size: 20px;
      }

      .online-bottype-container {
        div {
          font-size: 12px;
        }
      }
    }

    @media (max-width: 870px) {
      display: block;
      .online-bottype-container {
        margin-top: 20px;

        div {
          display: block;
        }

        .online {
          margin-top: 10px;
        }
      }
    }
  }

  .main {
    margin-top: 28px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: 15px;
    .box {
      background-color: #0e0e0e;
      padding: 28px 37px;
      border-radius: 11px;

      .info {
        display: flex;
        justify-content: space-between;

        p,
        .img {
          margin-top: 25px;
          color: #5e5e5e;
        }
      }
    }

    .details {
      grid-row: 1/3;
      grid-column: 3/4;
    }

    @media (max-width: 1000px) {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;

      .details {
        grid-row: 3/4;
        grid-column: 1/3;
      }
    }

    @media (max-width: 600px) {
      display: flex;
      flex-flow: column;

      .details {
        order: 5;
      }
    }
  }
`;

let Order = () => {
  const router = useRouter();
  const { id } = router.query;

  const [isloading, setisloading] = useState(true);

  const [orderDetails, setorderDetails] = useState({});
  const [isOnline, setisOnline] = useState("");

  //Get the order data of individual orders based on the link
  useEffect(() => {
    if (id != undefined) {
      getOrderData();
    }
  }, [id, isOnline]);

  //Check if the orderDetails is empty, then show/hide loading component
  useEffect(() => {
    if (Object.entries(orderDetails).length === 0) {
      setisloading(true);
    } else {
      setisloading(false);
    }
    console.log(orderDetails);
  }, [orderDetails]);

  let getOrderData = () => {
    let cookie = localStorage.getItem("cookie");

    var myHeaders = new Headers();
    myHeaders.append("x-api-key", cookie);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://easyviews.herokuapp.com/Api/v1/Staff/Orders/View/" + id,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result.Response);
        setorderDetails(result.Response[0]);
      })
      .catch((error) => console.log("error", error));
  };

  if (isloading) {
    return (
      <div>
        <OrderContainer online={orderDetails.Online}>
          <div className="head">
            <h1>
              {" "}
              <p className="arrow" onClick={() => router.back()}>
                {"<"}
              </p>{" "}
              Order #{id}
            </h1>

            <div className="online-bottype-container">
              <div className="btn-container">
                <button className="serviceType">Loading</button>
                <button className="online">Loading</button>
              </div>
            </div>
          </div>

          <div className="main">
            <div className="delay box">
              <h1>Delay</h1>

              <div className="info">
                <p>Minimum Delay</p>
                <p>Loading</p>
              </div>

              <div className="info">
                <p>Maximum Delay</p>
                <p>Loading</p>
              </div>
            </div>

            <div className="dates box">
              <h1>Dates</h1>

              <div className="info">
                <p>Start Date</p>
                <p>Loading</p>
              </div>

              <div className="info">
                <p>End Date</p>
                <p>Loading</p>
              </div>
            </div>

            <div className="details box">
              <h1>Details</h1>
              <div className="info">
                <p>Email</p>
                <p>Loading</p>
              </div>

              <div className="info">
                <p>Status</p>
                <p>Loading</p>
              </div>

              <div className="info">
                <p> Online</p>

                <div className="img">Loading</div>
              </div>

              <div className="info">
                <p>Twitch Name</p>
                <p>{orderDetails.TwitchName}</p>
              </div>

              {orderDetails.ServiceType == "ChatBot" && (
                <div className="info">
                  <p>Message List</p>
                  <p>Loading</p>
                </div>
              )}
            </div>

            <div className="followersCount box">
              <h1>Followers Count</h1>
              <div className="info">
                <p>Max Threads</p>
                <p>Loading</p>
              </div>
              <div className="info">
                <p>Threads</p>
                <p>Loading</p>
              </div>
            </div>

            <div className="followers box">
              <h1>Followers</h1>

              <div className="info">
                <p>Delivered</p>
                <p>Loading</p>
              </div>

              <div className="info">
                <p>Requested</p>
                <p>Loading</p>
              </div>
            </div>
          </div>
        </OrderContainer>
      </div>
    );
  }
  return (
    <div>
      <OrderContainer online={orderDetails.Online}>
        <div className="head">
          <h1>
            {" "}
            <p className="arrow" onClick={() => router.back()}>
              {"<"}
            </p>{" "}
            Order #{id}
          </h1>

          <div className="online-bottype-container">
            <div className="btn-container">
              <button className="serviceType">
                {orderDetails.ServiceType}
              </button>
              <button className="online">
                {orderDetails.Online ? "Online" : "Offline"}
              </button>
            </div>
          </div>
        </div>

        <div className="main">
          <div className="delay box">
            <h1>Delay</h1>

            <div className="info">
              <p>Minimum Delay</p>
              <p>{orderDetails.MinimumDelay}</p>
            </div>

            <div className="info">
              <p>Maximum Delay</p>
              <p>{orderDetails.MaximumDelay}</p>
            </div>
          </div>

          <div className="dates box">
            <h1>Dates</h1>

            <div className="info">
              <p>Start Date</p>
              <p>{orderDetails.StartDate}</p>
            </div>

            <div className="info">
              <p>End Date</p>
              <p>{orderDetails.EndDate}</p>
            </div>
          </div>

          <div className="details box">
            <h1>Details</h1>
            <div className="info">
              <p>Email</p>
              <p>{orderDetails.Email}</p>
            </div>

            <div className="info">
              <p>Status</p>
              <p>{orderDetails.Status}</p>
            </div>

            <div className="info">
              <p> Online</p>

              <div className="img">
                {orderDetails.Online ? (
                  <Image src={checkImg} alt="Online Image" />
                ) : (
                  <Image src={xImg} alt="Offline image" />
                )}
              </div>
            </div>

            <div className="info">
              <p>Twitch Name</p>
              <p>{orderDetails.TwitchName}</p>
            </div>

            {orderDetails.ServiceType == "ChatBot" && (
              <div className="info">
                <p>Message List</p>
                <p>{orderDetails.ChatBotMessageList}</p>
              </div>
            )}
          </div>

          <div className="followersCount box">
            <h1>Followers Count</h1>
            <div className="info">
              <p>Max Threads</p>
              <p>{orderDetails.MaxThreads}</p>
            </div>
            <div className="info">
              <p>Threads</p>
              <p>{orderDetails.Threads}</p>
            </div>
          </div>

          <div className="followers box">
            <h1>Followers</h1>

            <div className="info">
              <p>Delivered</p>
              <p>{orderDetails.FollowersDelivered}</p>
            </div>

            <div className="info">
              <p>Requested</p>
              <p>{orderDetails.FollowersRequested}</p>
            </div>
          </div>
        </div>
      </OrderContainer>
    </div>
  );
};

export default Order;
