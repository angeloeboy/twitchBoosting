import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

let Div = styled.div`
  .add-gc-container {
    background-color: pink;
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);

    .inner {
      background-color: #ffffff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 8px;
      color: black;
      padding: 50px;
      width: 90%;
      max-width: 600px;
      border: 2px solid white;

      p {
        margin-top: 20px;
      }

      label {
        display: block;
        margin-top: 25px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        input {
          outline: none;
          border: none;
          border-bottom: 1px solid black;
          padding: 2px;
        }
      }

      button {
        border: 1px solid black;
        background-color: transparent;
        color: black;
        width: 132px;
        border-radius: 8px;
        padding: 14px 0px;
        margin-left: 16px;
        transition: all 0.1s ease;
        cursor: pointer;
        margin: 0 auto;
        display: block;
        margin-top: 40px;

        &:hover {
          background-color: green;
          border-color: green;
          color: white;
        }

        select {
          width: 100%;
          background-color: green;
        }
      }

      .success {
        color: green;
        text-align: center;
      }

      @media (max-width: 700px) {
        padding: 20px 50px;

        label {
          flex-flow: column;
          align-items: initial;
          input {
            margin-top: 20px;
          }
        }
      }
    }

    .outer {
      /* background-color: pink; */
      content: "";
      height: 100vh;
    }
  }
`;

let AddSubs = ({ setaddsubsVisible, setSubsLength }) => {
  const [generateSuccess, setgenerateSuccess] = useState(false);

  const [name, setname] = useState("");
  const [serviceType, setserviceType] = useState("FollowBot");
  const [duration, setduration] = useState(7);
  const [followersRequested, setfollowersRequested] = useState(1);
  const [cost, setcost] = useState(1);
  const [maxThreads, setmaxThreads] = useState(1);

  const [succesfull, setsuccesfull] = useState(false);

  let createSubs = (e) => {
    let cookie = localStorage.getItem("cookie");
    let myHeaders = new Headers();

    myHeaders.append("x-api-key", cookie);

    myHeaders.append("Content-Type", "application/json");

    if (serviceType === "FollowBot") {
      var raw = JSON.stringify({
        Name: name,
        ServiceType: serviceType,
        Duration: duration,
        FollowersRequested: followersRequested,
        Cost: cost,
      });
    } else {
      var raw = JSON.stringify({
        Name: name,
        ServiceType: serviceType,
        Duration: duration,
        Cost: cost,
        MaximumThreads: maxThreads,
      });
    }

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://easyviews.herokuapp.com/Api/v1/Staff/Subscriptions/Create",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result.Response);
        setsuccesfull(true);
        setSubslength();

        setTimeout(() => {
          setaddsubsVisible(false);
        }, 1000);
      })
      .catch((error) => console.log("error", error));
  };

  let setSubslength = () => {
    let cookie = localStorage.getItem("cookie");

    var myHeaders = new Headers();
    myHeaders.append("x-api-key", cookie);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://easyviews.herokuapp.com/Api/v1/Staff/Subscriptions/View",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result.Response);
        setSubsLength(result.Response.length);
        console.log(result.Response.length);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <Div>
      <div className="add-gc-container">
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
          <div className="outer" onClick={() => setaddsubsVisible(false)}></div>

          <div className="inner">
            {!succesfull && (
              <>
                <h2>Create Subscription</h2>
                <form action="">
                  <label>
                    Name
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                    />
                  </label>

                  <label>
                    Service Type
                    <select
                      value={serviceType}
                      onChange={(e) => setserviceType(e.target.value)}
                    >
                      <option value="FollowBot">FollowBot</option>
                      <option value="ViewBot">ViewBot</option>
                      <option value="ChatBot">ChatBot</option>
                    </select>
                  </label>

                  <label>
                    Duration
                    <select
                      value={duration}
                      onChange={(e) => setduration(e.target.value)}
                    >
                      <option value="seven">7</option>
                      <option value="thirty">30</option>
                    </select>
                  </label>
                  {serviceType == "FollowBot" && (
                    <label>
                      Followers Requested
                      <input
                        type="number"
                        value={followersRequested}
                        onChange={(e) => setfollowersRequested(e.target.value)}
                      />
                    </label>
                  )}

                  {serviceType != "FollowBot" && (
                    <label>
                      Maximum Threads
                      <input
                        type="number"
                        min="1"
                        value={maxThreads}
                        onChange={(e) => setmaxThreads(e.target.value)}
                      />
                    </label>
                  )}

                  <label>
                    Cost
                    <input
                      type="number"
                      min="1"
                      value={cost}
                      onChange={(e) => setcost(e.target.value)}
                    />
                  </label>
                </form>
                {name !== "" && (
                  <button onClick={(e) => createSubs(e)}>Create</button>
                )}

                {generateSuccess && (
                  <p className="success">Gift cards generated</p>
                )}
              </>
            )}

            {succesfull && <p>Creating Subscription success</p>}
          </div>
        </motion.div>
      </div>

      {/* <div className="add-gc-container"></div> */}
    </Div>
  );
};

export default AddSubs;
