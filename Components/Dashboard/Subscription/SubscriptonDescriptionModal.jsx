import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

let Div = styled.div`
  .gc-desc-container {
    background-color: pink;
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    .outer {
      /* background-color: pink; */
      content: "";
      height: 100vh;
    }

    .inner {
      background-color: #ffffff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 8px;
      color: black;
      padding: 30px 30px;
      width: 90%;
      max-width: 600px;
      word-wrap: break-word;

      h1 {
        text-align: center;
      }
      p {
        margin-top: 20px;
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
      }

      .delete:hover {
        background-color: red;
        color: white;
        border-color: red;
      }

      .confirm {
        text-align: center;
      }

      .buttons {
        text-align: center;
        button {
          display: inline-block;
          text-align: center;
          margin: 50px 20px;
          margin-bottom: 0px;
        }

        .confirm {
          &:hover {
            background-color: green;
            border-color: green;
            color: white;
          }
        }
      }

      .cancel:hover {
        background-color: red;
        color: white;
        border-color: red;
      }
    }
  }
`;
let SubscriptonDescriptionModal = ({
  subsData,
  setgcVisible,
  setdeletedSubs,
}) => {
  const [setSubsData, setshowSubsData] = useState(true);
  const [showDelete, setshowDelete] = useState(false);
  const [deleteSuccess, setdeleteSuccess] = useState(false);

  let deleteSubscription = () => {
    let cookie = localStorage.getItem("cookie");

    var myHeaders = new Headers();
    myHeaders.append("x-api-key", cookie);

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://easyviews.herokuapp.com/Api/v1/Staff/Subscriptions/Delete/" +
        subsData._id,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.Error == 0) {
          setdeleteSuccess(true);
          setshowDelete(false);
          setdeletedSubs(subsData._id);

          setTimeout(() => {
            setgcVisible(false);
          }, 1000);
        }
      })
      .catch((error) => console.log("error", error));

    console.log("deleted");
  };
  return (
    <Div>
      <div className="gc-desc-container">
        {setSubsData && (
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
            <div className="outer" onClick={() => setgcVisible(false)}></div>
            <div className="inner">
              <h1>{subsData._id}</h1>
              <p>Name: {subsData.Name}</p>
              <p>Service Type: {subsData.ServiceType}</p>
              <p>Duration: {subsData.Duration}</p>
              <p>Cost: {subsData.Cost}</p>
              <p>
                No. of Max Twitch Name changes: {subsData.MaxNameChangesAllowed}
              </p>
              <button
                className="delete"
                onClick={() => {
                  setshowDelete(true);
                  setshowSubsData(false);
                }}
              >
                Delete
              </button>
            </div>
          </motion.div>
        )}

        {showDelete && (
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
            <div className="outer" onClick={() => setgcVisible(false)}></div>
            <div className="inner">
              <p className="confirm"> Confirm Delete of {subsData._id}? </p>
              <div className="buttons">
                <button
                  className="confirm"
                  onClick={() => deleteSubscription()}
                >
                  Confirm
                </button>
                <button
                  className="cancel"
                  onClick={() => {
                    setshowDelete(false);
                    setshowSubsData(true);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {deleteSuccess && (
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
            <div className="outer" onClick={() => setgcVisible(false)}></div>
            <div className="inner">
              <p className="confirm" style={{ marginTop: "0px" }}>
                Deletion of Gift card {subsData.Name} success.{" "}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </Div>
  );
};

export default SubscriptonDescriptionModal;
