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

let AddGiftCardModal = ({ setaddGiftCardVisible, setgiftCardLength }) => {
  const [codeAmount, setcodeAmount] = useState(1);
  const [creditValue, setcreditValue] = useState(1);

  const [generateSuccess, setgenerateSuccess] = useState(false);

  let createGc = (e) => {
    let cookie = localStorage.getItem("cookie");
    let myHeaders = new Headers();

    myHeaders.append("x-api-key", cookie);
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      Quantity: codeAmount,
      Value: creditValue,
    });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://easyviews.herokuapp.com/Api/v1/Staff/GiftCard/Generate",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result.Response);
        if (result.Error == 0) {
          setGiftCardsLength();
          setgenerateSuccess(true);

          setTimeout(() => {
            setaddGiftCardVisible(false);
          }, 1000);
        }
      })
      .catch((error) => console.log("error", error));
  };

  let setGiftCardsLength = () => {
    let cookie = localStorage.getItem("cookie");

    var myHeaders = new Headers();
    myHeaders.append("x-api-key", cookie);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://easyviews.herokuapp.com/Api/v1/Staff/GiftCard/view?Page=1",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.Error == 0) {
          let arr = [...result.Response.Available, ...result.Response.Redeemed];
          setgiftCardLength(arr.length);
        }
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
          <div
            className="outer"
            onClick={() => setaddGiftCardVisible(false)}
          ></div>
          <div className="inner">
            <h2>Create Gift Card</h2>
            <form action="">
              <label>
                Amount of codes to generate:
                <input
                  type="number"
                  min="1"
                  value={codeAmount}
                  onChange={(e) => {
                    let amount = e.target.value;
                    setcodeAmount(amount);
                  }}
                />
              </label>

              <label>
                Value in credits of each code :
                <input
                  type="number"
                  min="1"
                  value={creditValue}
                  onChange={(e) => {
                    let amount = e.target.value;
                    setcreditValue(amount);
                  }}
                />
              </label>
            </form>
            <button onClick={(e) => createGc(e)}>Create</button>
            {generateSuccess && <p className="success">Gift cards generated</p>}
          </div>
        </motion.div>
      </div>
    </Div>
  );
};

export default AddGiftCardModal;
