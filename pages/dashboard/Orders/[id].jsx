/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import TopNotification from "./../../../Components/Dashboard/TopNotification";
import OrderLog from "./../../../Components/Dashboard/OrderLog";
import RocketLoading from "./../../../Components/Dashboard/rocketLoading";

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
          /* margin-bottom: 30px; */
          align-items: center;
          justify-content: space-between;
          width: 100%;
          input {
            /* width: 100%; */
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

      .messagelist {
        input {
          width: 100%;
          background-color: transparent;
          border: 2px solid #1b1b1b;
          color: white;
          padding: 10px;
          border-radius: 6px;
          display: block;
          margin-top: 20px;
        }

        .format {
          font-size: 13px;
          color: #696969;
          margin-top: 10px;
        }
      }

      @media (max-width: 930px) {
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
`;

let Order = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isloading, setisloading] = useState(true);
  const [orderDetails, setorderDetails] = useState({});
  const [isOnline, setisOnline] = useState("");
  const [changeSuccess, setchangeSuccess] = useState(true);

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

  const [messageListLink, setmessageListLink] = useState("");

  const [twitchName, settwitchName] = useState("");

  const [twitchNameChanged, settwitchNameChanged] = useState(false);

  const [modalText, setmodalText] = useState("");

  const [clickedtoggleOnline, setclickedtoggleOnline] = useState({
    clicked: false,
    text: "Online",
    error: false,
  });

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
      // setdelayDisabled(!orderDetails.Online);

      if (orderDetails.ServiceType === "ChatBot") {
        setmessageListLink(orderDetails.ChatBotMessageList);
      }
    }
  }, [orderDetails]);

  useEffect(() => {
    checkChangedSettings();
  }, [maxDelay, minDelay, threads, messageListLink]);

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
        if (result.Error == 0) {
          let order = result.Response;
          console.log(order);
          if (order.ServiceType === "ChatBot") {
            if (order.ChatBotMessageList != undefined) {
              setorderDetails(result.Response);
            } else {
              order.ChatBotMessageList = "";
              setorderDetails(order);
            }
          } else {
            setorderDetails(result.Response);
          }

          settwitchName(result.Response.TwitchName);
        }
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
          if (result.Error == 0) {
            console.log(result);
            setisOnline(false);

            setclickedtoggleOnline({
              clicked: true,
              text: result.Response,
              error: false,
            });
          } else {
            setclickedtoggleOnline({
              clicked: true,
              text: result.ErrorMessage,
              error: true,
            });
          }

          setTimeout(() => {
            setclickedtoggleOnline({
              clicked: false,
              text: result.Response,
              error: false,
            });
          }, 2000);
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

          if (result.Error == 0) {
            setisOnline(true);
            setclickedtoggleOnline({
              clicked: true,
              text: result.Response,
              error: false,
            });
          } else {
            setclickedtoggleOnline({
              clicked: true,
              text: result.ErrorMessage,
              error: true,
            });
          }

          setTimeout(() => {
            setclickedtoggleOnline({
              clicked: false,
              text: "",
              error: false,
            });
          }, 2000);
        })
        .catch((error) => console.log("error", error));
    }
  };

  let checkChangedSettings = () => {
    const regEx = new RegExp("^https://pastebin.com/raw/[a-zA-Z0-9_]{6,11}$");
    const numRegEx = new RegExp("^0[0-9].*$");
    let minChanged = minDelay != orderDetails.MinimumDelay;
    let maxChanged = maxDelay != orderDetails.MaximumDelay;
    let threadsChanged = threads != orderDetails.Threads;
    let messageListChanged = messageListLink != orderDetails.ChatBotMessageList;

    let minDelayValid =
      minDelay !== "" &&
      +minDelay <= +maxDelay &&
      !numRegEx.test(minDelay.toString());
    let maxDelayValid =
      maxDelay !== "" &&
      +maxDelay >= +minDelay &&
      !numRegEx.test(maxDelay.toString());
    let messageListValid = regEx.test(messageListLink);
    let threadsValid;

    if (orderDetails.ServiceType !== "FollowBot") {
      threadsValid = threads != "" && !numRegEx.test(threads.toString());
    } else {
      threadsValid = true;
    }

    if (orderDetails.ChatBotMessageList == undefined) {
      if (
        (minChanged || maxChanged || threadsChanged) &&
        minDelayValid &&
        maxDelayValid &&
        threadsValid
      ) {
        setsettingsChanged(true);
      } else {
        setsettingsChanged(false);
      }
    } else {
      if (
        (minChanged || maxChanged || threadsChanged || messageListChanged) &&
        minDelayValid &&
        maxDelayValid &&
        threadsValid &&
        messageListValid
      ) {
        setsettingsChanged(true);
      } else {
        setsettingsChanged(false);
      }
    }
    console.log(threadsChanged);
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

    if (thread <= orderDetails.MaxThreads) {
      setthreads(thread);
      checkChangedSettings();
      setupdateSuccess(false);
    }
  };

  let handleMessageList = (e) => {
    let message = e.target.value;

    setmessageListLink(message);
    checkChangedSettings();
    setupdateSuccess(false);
  };

  let sendOrderConfig = () => {
    setchangeSuccess(false);
    let cookie = localStorage.getItem("cookie");

    var myHeaders = new Headers();
    myHeaders.append("x-api-key", cookie);
    myHeaders.append("Content-Type", "application/json");

    let raw;

    if (typeof orderDetails.Threads != "undefined") {
      if (orderDetails.ServiceType == "ChatBot") {
        if (orderDetails.Online) {
          raw = JSON.stringify({
            Threads: threads,
            ChatBotMessageList: messageListLink,
          });
        } else {
          raw = JSON.stringify({
            Threads: threads,
            MinimumDelay: minDelay,
            MaximumDelay: maxDelay,
            ChatBotMessageList: messageListLink,
          });
        }
      } else {
        if (orderDetails.Online) {
          raw = JSON.stringify({
            Threads: threads,
          });
        } else {
          raw = JSON.stringify({
            Threads: threads,
            MinimumDelay: minDelay,
            MaximumDelay: maxDelay,
          });
        }
      }
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
          setchangeSuccess(true);
          setupdateSuccess(true);
          setsettingsChanged(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

  let changeTwitchName = () => {
    // setchangeSuccess(false);

    let cookie = localStorage.getItem("cookie");

    var myHeaders = new Headers();
    myHeaders.append("x-api-key", cookie);
    myHeaders.append("Content-Type", "application/json");

    let raw;
    console.log(twitchName);
    raw = JSON.stringify({
      TwitchName: twitchName,
    });

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

        setupdateSuccess(true);
        getOrderData();
        settwitchNameChanged(false);
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
            <RocketLoading />
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

              {orderDetails.Online && (
                <p style={{ marginTop: "20px", fontWeight: "bold" }}>
                  Set the order to offline to change the delay values
                </p>
              )}
              <div className="delay">
                <label>
                  Minimum Delay:
                  <input
                    type="number"
                    min="0"
                    max={maxDelay == 0 ? 0 : maxDelay - 1}
                    onChange={(e) => handleMinDelay(e)}
                    value={minDelay}
                    placeholder="Must be lower or equal than maximum delay"
                  />
                </label>

                <label>
                  Maximum Delay:
                  <input
                    type="number"
                    min="1"
                    onChange={(e) => handleMaxDelay(e)}
                    value={maxDelay}
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
                      placeholder={"Max is " + orderDetails.MaxThreads}
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="dates box">
              <div className="twitch-name">
                <label htmlFor="">
                  Twitch Name
                  <input
                    type="text"
                    value={twitchName}
                    onChange={(e) => {
                      let name = orderDetails.TwitchName;
                      settwitchName(e.target.value);

                      if (e.target.value !== name) {
                        settwitchNameChanged(true);
                      } else {
                        settwitchNameChanged(false);
                      }
                    }}
                    disabled={
                      orderDetails.MaxNameChangesAllowed ===
                      orderDetails.TwitchNameChanges
                    }
                  />
                </label>
              </div>

              {typeof orderDetails.StartDate !== "undefined" && (
                <div className="startDate">
                  <p>Start Date</p>
                  <p>{orderDetails.StartDate.slice(0, 10)}</p>
                </div>
              )}

              {typeof orderDetails.EndDate !== "undefined" && (
                <div className="endDate">
                  <p>End Date</p>

                  <p>{orderDetails.EndDate.slice(0, 10)}</p>
                </div>
              )}

              <div className="numberOfChanges">
                <p># of Twitch Name Changes:</p>

                <p>{orderDetails.TwitchNameChanges}</p>
              </div>

              <div className="maxnumberOfChanges">
                <p>Max # of Twitch Name Changes:</p>

                <p>{orderDetails.MaxNameChangesAllowed}</p>
              </div>

              {twitchNameChanged && (
                <button className="save" onClick={() => changeTwitchName()}>
                  Change Twitch Name
                </button>
              )}
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

            {orderDetails.ServiceType === "ChatBot" && (
              <div className="box messagelist">
                <label>Message List: </label>

                <input
                  type="text"
                  value={messageListLink}
                  onChange={(e) => handleMessageList(e)}
                />
                <p className="format">
                  Format: https://pastebin.com/raw/123456
                </p>
              </div>
            )}
          </div>

          {updateSuccess && (
            <>
              <TopNotification text="Settings succesfully changed." />
            </>
          )}

          {clickedtoggleOnline.clicked && (
            <>
              <TopNotification
                text={clickedtoggleOnline.text}
                error={clickedtoggleOnline.error}
              />
            </>
          )}

          {settingsChanged && (
            <button
              className="save"
              onClick={() => sendOrderConfig()}
              style={settingsChanged ? { opacity: "1" } : { opacity: "0" }}
            >
              {changeSuccess ? "Save" : "Loading..."}
            </button>
          )}
        </div>
      </OrderContainer>

      <OrderLog Log={orderDetails.Log} />
    </div>
  );
};

export default Order;
