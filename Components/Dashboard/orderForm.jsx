import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { MenuContext } from "../menuContext";

let Div = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);

  .outer {
    width: 100%;
    height: 100%;
    background-color: green;
    padding: 5%;
  }
  .inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #192377;
    padding: 60px 7%;
    width: 90%;
    max-width: 600px;
    border-radius: 8px;
    h1 {
      margin-bottom: 30px;
    }
    p {
      font-size: 18px;
      text-align: left;
      margin: 0 auto;
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
      span {
        font-weight: 600;
      }

      input {
        background-color: transparent;
        border: none;
        border-bottom: 1px solid #1d35c0;
        outline: none;
        padding: 3px;
        color: white;
        width: 50%;
      }
    }

    button {
      margin: 0px 5%;
      margin-top: 50px;
      display: inline-block;
      width: 50%;
      transition: all 0.3 ease;
      &:hover {
        background-color: #1d35c0;
      }
    }

    .cancel {
      margin-top: 20px;
      background-color: #a02424;

      &:hover {
        background-color: #c92e2e;
      }
    }

    .message {
      font-size: 12px;
      text-align: center;
    }
  }
`;

let OrderForm = (props) => {
  const [twitchName, settwitchName] = useState("");
  const [message, setmessage] = useState("");
  const [error, seterror] = useState(false);

  const [data, setData, updateProfileData] = useContext(MenuContext);

  let handleTwitchNameChange = (e) => {
    let name = e.target.value;
    settwitchName(name);
  };

  let createOrder = () => {
    let cookie = localStorage.getItem("cookie");

    var myHeaders = new Headers();
    myHeaders.append("x-api-key", cookie);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      SubscriptionName: props.plan.Name,
      TwitchName: twitchName,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://easyviews.herokuapp.com/Api/v1/Users/Order/Create",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        console.log(result.Reponse);

        if (result.ErrorMessage != "") {
          seterror(true);

          setmessage(result.ErrorMessage);
        } else {
          seterror(false);

          setmessage(result.Response);
          updateProfileData();
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <Div>
      <div className="inner">
        <h1>{props.plan.ServiceType}</h1>
        <p>
          {" "}
          <span>Duration:</span> {props.plan.Duration} days
        </p>
        <p>
          {" "}
          <span> Cost:</span> ${props.plan.Cost}
        </p>
        <p>
          <span>No. of {props.plan.ServiceType.replace("Bot", "ers")}:</span>

          {" " + props.plan.FollowersRequested}
        </p>
        <p>
          {" "}
          <span> Twitch Name: </span>
          <input
            type="text"
            value={twitchName}
            onChange={(e) => handleTwitchNameChange(e)}
          />
        </p>
        <button onClick={() => createOrder()}>Confirm Order</button>
        <button onClick={() => props.setisBuyVisible(false)} className="cancel">
          Cancel
        </button>

        <p
          className="message"
          style={error ? { color: "red" } : { color: "green" }}
        >
          {message}
        </p>
      </div>
    </Div>
  );
};

export default OrderForm;
