/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import TopNotification from "./../../../Components/Dashboard/TopNotification";

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
      font-size: 25px;
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
      div {
        display: inline-block;
        padding: 10px 0px;
        font-size: 14px;
        font-weight: 300;
        cursor: pointer;
        width: 130px;
        text-align: center;
      }

      div {
        border: 1px solid white;
        background-color: transparent;
        color: white;
        width: 132px;
        border-radius: 8px;
        padding: 14px 0px;
        margin-left: 16px;
        transition: all 0.1s ease;
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

    .status {
      background: rgba(27, 27, 27, 0.34);
      border-radius: 7px;
      padding: 5px;
      width: 120px;
      text-align: center;
    }

    .main-options {
      margin-top: 38px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 20px;
      grid-template-rows: 1fr 1fr;
      width: 100%;
      .box {
        padding: 59px 40px;
        border-radius: 11px;
        background-color: #0e0e0e;
      }

      .delay-container {
        font-size: 15px;
        font-weight: 200;
        line-height: 161.69%;
        grid-row: 1/3;

        span {
          font-weight: bold;
        }

        .delay {
          margin-top: 53px;

          label {
            display: block;
            margin-top: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            input {
              width: 300px;
              background-color: transparent;
              border: 2px solid #1b1b1b;
              color: white;
              padding: 10px;
              border-radius: 6px;
            }
          }

          input::-webkit-outer-spin-button,
          input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }

          @media (max-width: 1145px) {
            label {
              display: block;

              input {
                width: 100%;
                margin-top: 10px;
              }
            }
          }
        }
      }

      .dates {
        grid-row: 1/2;

        label {
          display: block;
          display: flex;
          justify-content: space-between;
          position: relative;
          margin-bottom: 30px;
          align-items: center;
          input {
            width: 300px;
            background-color: transparent;
            border: 2px solid #1b1b1b;
            color: white;
            padding: 10px;
            border-radius: 6px;
          }
        }

        div {
          margin-bottom: 23px;
          display: flex;
          justify-content: space-between;
        }
      }

      .delivered {
        grid-row: 2/3;
        display: flex;
        justify-content: space-between;
        div {
          width: calc(50% - 10px);

          text-align: center;

          .num {
            margin-top: 20px;
            font-size: 3rem;
            font-weight: bold;
          }
        }
      }

      @media (max-width: 930px) {
        /* grid-template-columns: 1fr 1fr 1fr 1fr; */
        display: block;
        div {
          margin-bottom: 20px;
        }
      }
    }

    button {
      max-width: 217px;
      padding: 12px 0px;
      border-radius: 8px;
      display: block;
      color: white;
      border: none;
      transition: all 0.3s ease;
      cursor: pointer;
      margin-top: 50px;
      background-color: #192377;
      width: 100%;

      &:hover {
        opacity: 0.8;
      }

      @media (max-width: 500px) {
        max-width: 500px;
      }
    }
  }

  .success {
    position: fixed;
    top: 20px;
    background-color: green;
    padding: 20px 30px;
    border-radius: 10px;
    left: 50%;
    transform: translateX(-50%);
    .message {
      color: white;
      /* margin-top: 20px; */
      font-size: 16px;
      padding-left: 10px;
    }
  }
`;

let Order = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isloading, setisloading] = useState(true);
  const [orderDetails, setorderDetails] = useState({});
  const [isOnline, setisOnline] = useState("");

  //Get the max thread num
  const [maxDelay, setmaxDelay] = useState(0);

  //get the min thread num
  const [minDelay, setminDelay] = useState(0);

  //get the max thread
  const [threads, setthreads] = useState(0);

  //if update of value is a success
  const [updateSuccess, setupdateSuccess] = useState(false);

  //check if the user changed something
  const [settingsChanged, setsettingsChanged] = useState(false);

  //Get the order data of individual orders based on the link
  useEffect(() => {
    if (id != undefined) {
      getOrderData();
    }
  }, [id, isOnline, updateSuccess]);

  //Check if the orderDetails is empty, then show/hide loading component
  useEffect(() => {
    if (Object.entries(orderDetails).length === 0) {
      setisloading(true);
    } else {
      setisloading(false);
      setmaxDelay(orderDetails.MaximumDelay);
      setminDelay(orderDetails.MinimumDelay);
      setthreads(orderDetails.Threads);
    }
    console.log(orderDetails);
  }, [orderDetails]);

  useEffect(() => {
    checkChangedSettings();
  }, [maxDelay, minDelay, threads]);

  useEffect(() => {
    setTimeout(() => {
      setupdateSuccess(false);
    }, 1000);
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
      "https://easyviews.herokuapp.com/Api/v1/Users/Order/View/" + id,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result.Response);
        setorderDetails(result.Response);
      })
      .catch((error) => console.log("error", error));
  };

  let setOrderOnline = () => {
    let cookie = localStorage.getItem("cookie");

    var myHeaders = new Headers();
    myHeaders.append("x-api-key", cookie);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
    };

    if (orderDetails.Online) {
      fetch(
        "https://easyviews.herokuapp.com/Api/v1/Users/Order/SetOffline/" + id,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setisOnline(false);
        })
        .catch((error) => console.log("error", error));
    } else {
      fetch(
        "https://easyviews.herokuapp.com/Api/v1/Users/Order/SetOnline/" + id,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setisOnline(true);
        })
        .catch((error) => console.log("error", error));
    }
  };

  let checkChangedSettings = () => {
    if (
      maxDelay != orderDetails.MaximumDelay ||
      minDelay != orderDetails.MinimumDelay ||
      threads != orderDetails.Threads
    ) {
      setsettingsChanged(true);
    } else {
      setsettingsChanged(false);
    }
  };

  let handleMaxDelay = (e) => {
    let max = e.target.value;
    setmaxDelay(max);
    checkChangedSettings();
    setupdateSuccess(false);
  };

  let handleMinDelay = (e) => {
    let min = e.target.value;

    setminDelay(min);
    checkChangedSettings();
    setupdateSuccess(false);
  };

  let handleThreads = (e) => {
    let thread = e.target.value;

    setthreads(thread);
    checkChangedSettings();
    setupdateSuccess(false);
  };

  let sendOrderConfig = () => {
    let cookie = localStorage.getItem("cookie");

    var myHeaders = new Headers();
    myHeaders.append("x-api-key", cookie);
    myHeaders.append("Content-Type", "application/json");

    let raw;
    if (typeof orderDetails.Threads != "undefined") {
      raw = JSON.stringify({
        Threads: threads,
        MinimumDelay: minDelay,
        MaximumDelay: maxDelay,
      });
    } else {
      raw = JSON.stringify({
        MinimumDelay: minDelay,
        MaximumDelay: maxDelay,
      });
    }

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://easyviews.herokuapp.com/Api/v1/Users/Order/Modify/" + id,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);

        if (result.Error != 0) {
          setupdateSuccess(true);
        }
      })
      .catch((error) => console.log("error", error));
  };

  if (isloading) {
    return (
      <div>
        <OrderContainer>
          <div className="head">
            <h1>
              {" "}
              <p className="arrow" onClick={() => router.back()}>
                {"<"}
              </p>{" "}
              Order #{id}
            </h1>

            <div className="online-bottype-container">
              <div className="botType">
                <p>Loading</p>
              </div>
              <div
                className="online"
                style={
                  orderDetails.Online ? { opacity: "1" } : { opacity: "0.5" }
                }
                onClick={() => setOrderOnline()}
              >
                Loading
              </div>
            </div>
          </div>

          <div className="main">
            <p
              className="status"
              style={
                orderDetails.Status == "Processing"
                  ? { color: "#FD9A01" }
                  : { color: "#209833" }
              }
            >
              Loading
            </p>

            <div className="main-options">
              <div className="delay-container box">
                <p>
                  Please use the sliders or the input boxes to change the delay
                  between followers. The FollowerBot waits a random time between{" "}
                  <span>delay min</span> and <span>delay max</span> per follow.
                  25 followers with a “delay max” of 10 minutes will take up to
                  250 minutes.{" "}
                </p>
                <div className="delay">
                  <label>
                    Maximum Delay:
                    <input
                      type="number"
                      min="1"
                      onChange={(e) => handleMaxDelay(e)}
                      value={maxDelay}
                    />
                  </label>

                  <label>
                    Minimum Delay:
                    <input
                      type="number"
                      min="0"
                      max={maxDelay - 1}
                      onChange={(e) => handleMinDelay(e)}
                      value={minDelay}
                    />
                  </label>

                  {typeof orderDetails.Threads != "undefined" && (
                    <label>
                      Threads
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={threads}
                        onChange={(e) => handleThreads(e)}
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="dates box">
                <div className="twitch-name">
                  <p>Twitch Name</p>
                  <p>Loading</p>
                </div>

                <div className="startDate">
                  <p>Start Date</p>
                  <p>Loading</p>
                </div>

                <div className="endDate">
                  <p>End Date</p>

                  <p>Loading</p>
                </div>
              </div>

              {orderDetails.ServiceType === "FollowBot" && (
                <div className="delivered ">
                  <div className="del box ">
                    <p>Followers Delivered</p>
                    <p className="num">Loading</p>
                  </div>
                  <div className="rec box">
                    <p>Followers Requested</p>
                    <p className="num">Loading</p>
                  </div>
                </div>
              )}
            </div>
            <AnimatePresence>
              {updateSuccess && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0 }}
                  variants={{
                    hidden: {
                      opacity: 0,
                    },
                    visible: {
                      opacity: 1,
                      transition: {
                        delay: 0.1,
                      },
                    },
                  }}
                >
                  <p className="message"> Settings successfully Changed! </p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              className="save"
              onClick={() => sendOrderConfig()}
              style={settingsChanged ? { opacity: "1" } : { opacity: "0" }}
            >
              {" "}
              Save{" "}
            </button>
          </div>
        </OrderContainer>
      </div>
    );
  }

  return (
    <div>
      <OrderContainer>
        <div className="head">
          <h1>
            {" "}
            <p className="arrow" onClick={() => router.back()}>
              {"<"}
            </p>{" "}
            Order #{id}
          </h1>

          <div className="online-bottype-container">
            <div className="botType">
              <p>{orderDetails.ServiceType}</p>
            </div>
            <div
              className="online"
              style={
                orderDetails.Online ? { opacity: "1" } : { opacity: "0.5" }
              }
              onClick={() => setOrderOnline()}
            >
              {orderDetails.Online ? "Online" : "Offline"}
            </div>
          </div>
        </div>

        <div className="main">
          <p
            className="status"
            style={
              orderDetails.Status == "Processing"
                ? { color: "#FD9A01" }
                : { color: "#209833" }
            }
          >
            {orderDetails.Status}
          </p>

          <div className="main-options">
            <div className="delay-container box">
              <p>
                Please use the sliders or the input boxes to change the delay
                between followers. The FollowerBot waits a random time between{" "}
                <span>delay min</span> and <span>delay max</span> per follow. 25
                followers with a “delay max” of 10 minutes will take up to 250
                minutes.{" "}
              </p>
              <div className="delay">
                <label>
                  Maximum Delay:
                  <input
                    type="number"
                    min="1"
                    onChange={(e) => handleMaxDelay(e)}
                    value={maxDelay}
                  />
                </label>

                <label>
                  Minimum Delay:
                  <input
                    type="number"
                    min="0"
                    max={maxDelay - 1}
                    onChange={(e) => handleMinDelay(e)}
                    value={minDelay}
                  />
                </label>

                {typeof orderDetails.Threads != "undefined" && (
                  <label>
                    Threads
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={threads}
                      onChange={(e) => handleThreads(e)}
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="dates box">
              <div className="twitch-name">
                <p>Twitch Name</p>
                <p>{orderDetails.TwitchName}</p>
              </div>

              <div className="startDate">
                <p>Start Date</p>
                {typeof orderDetails.StartDate === "undefined" ? (
                  <p>N/A</p>
                ) : (
                  <p>{orderDetails.StartDate.slice(0, 10)}</p>
                )}
              </div>

              <div className="endDate">
                <p>End Date</p>

                {typeof orderDetails.EndDate === "undefined" ? (
                  <p>N/A</p>
                ) : (
                  <p>{orderDetails.EndDate.slice(0, 10)}</p>
                )}
                {/* <p>{orderDetails.EndDate.slice(0, 10)}</p> */}
              </div>
            </div>

            {orderDetails.ServiceType === "FollowBot" && (
              <div className="delivered ">
                <div className="del box ">
                  <p>Followers Delivered</p>
                  <p className="num">{orderDetails.FollowersDelivered}</p>
                </div>
                <div className="rec box">
                  <p>Followers Requested</p>
                  <p className="num">{orderDetails.FollowersRequested}</p>
                </div>
              </div>
            )}
          </div>

          {updateSuccess && (
            <>
              <TopNotification text="Settings succesfully changed." />
            </>
          )}

          <button
            className="save"
            onClick={() => sendOrderConfig()}
            style={settingsChanged ? { opacity: "1" } : { opacity: "0" }}
          >
            {" "}
            Save{" "}
          </button>
        </div>
      </OrderContainer>
    </div>
  );
};

export default Order;
