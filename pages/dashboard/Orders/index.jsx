/* eslint-disable @next/next/link-passhref */
import styled from "styled-components";
import { useEffect } from "react";
import { useState } from "react";

import Link from "next/link";
import Image from "next/image";

import checkImg from "../../../Images/check.svg";
import xImg from "../../../Images/x-image.svg";
import { motion } from "framer-motion";

const OrderContainer = styled.div`
  .panels {
    display: flex;
    width: 100%;
    justify-content: space-between;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
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
      text-align: center;
    }

    .endDate {
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
        min-width: 550px;
      }
    }
  }
`;

const Order = styled.div`
  user-select: none;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
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
    text-align: center;
  }

  .endDate {
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

let Orders = (props) => {
  const [orders, setorders] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, seterror] = useState(true);

  //Get orders on page load
  useEffect(() => {
    getOrders();
  }, []);

  //Show/hide loading
  useEffect(() => {
    if (orders.length > 0 || !error) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [orders, error]);

  let getOrders = () => {
    let cookie = localStorage.getItem("cookie");

    var myHeaders = new Headers();
    myHeaders.append("x-api-key", cookie);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://easyviews.herokuapp.com/Api/v1/Users/Order/View",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setorders([...result.Response]);

        if (result.Error == 0) {
          seterror(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

  if (isLoading) {
    return (
      <div>
        <OrderContainer>
          <h1>Orders</h1>

          <div className="panels">
            <p>Order ID</p>
            <p className="status">Status</p>
            <p className="online">Online</p>
            <p className="endDate">End Date</p>
          </div>

          <div className="orders">
            <p>Loading...</p>
          </div>
        </OrderContainer>
      </div>
    );
  } else {
    return (
      <div>
        <OrderContainer>
          <h1>Orders</h1>

          <div className="main-orders">
            <div className="panels">
              <p>Order ID</p>
              <p className="status">Status</p>
              <p className="online">Online</p>
              <p className="endDate">End Date</p>
            </div>

            {error && <p>No orders found</p>}

            <div className="orders">
              {orders.map((order) => {
                return (
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
                    key={order._id}
                  >
                    <Link href={"/dashboard/Orders/" + order._id}>
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

                        {typeof order.EndDate === "undefined" ? (
                          <p className="endDate">N/A</p>
                        ) : (
                          <p className="endDate">
                            {order.EndDate.slice(0, 10)}
                          </p>
                        )}
                      </Order>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </OrderContainer>
      </div>
    );
  }
};

export default Orders;
