import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { MenuContext } from "./../../Components/menuContext";

const Div = styled.div`
  .subscriptions-container {
    display: flex;
    margin-top: 50px;
    text-align: center;
    flex-wrap: wrap;

    @media (max-width: 919px) {
      /* flex-flow: column; */
      align-items: center;
    }

    @media (max-width: 620px) {
      flex-flow: column;
    }
  }

  .redeem {
    margin-top: 40px;

    .input {
      display: flex;
      margin-top: 20px;
      input {
        background-color: transparent;
        border: 1px solid white;
        /* margin-left: 20px; */
        outline: none;
        padding: 8px 10px;
        color: white;
        margin-right: 10px;
        width: 400px;
      }

      button {
        border: 2px solid #203298;
        background-color: #203298;

        color: white;
        padding: 0px 10px;
      }
    }
    @media (max-width: 450px) {
      .input {
        flex-flow: column;

        input,
        button {
          width: 100%;
        }

        button {
          margin-top: 20px;
          padding: 10px;
        }
      }
    }
  }
`;

const Credits = styled.div`
  width: 31.33%;
  background-color: #0e0e0e;
  padding: 60px;
  border-radius: 8px;
  /* margin-right: 20px; */
  margin: 1%;
  h1 {
    font-size: 3rem;
  }
  button {
    width: 100%;
    background-color: transparent;
    color: white;
    padding: 10px;
    border: 1px solid white;
    margin-top: 20px;
    transition: all 0.3s ease;
    &:hover {
      background-color: #203298;
      color: white;
      border-color: #203298;
    }
  }

  @media (max-width: 919px) {
    width: 48%;
  }

  @media (max-width: 620px) {
    min-width: 100%;
  }
`;

let Purchase = (props) => {
  const [subscriptions, setsubscriptions] = useState([]);
  const [loaded, setloaded] = useState(false);
  const [code, setcode] = useState("");

  const [data, setData, updateProfileData] = useContext(MenuContext);

  const [successful, setsuccessful] = useState(false);

  useEffect(() => {
    getSubscriptions();
  }, []);

  let getSubscriptions = () => {
    let cookie = localStorage.getItem("cookie");

    var myHeaders = new Headers();
    myHeaders.append("x-api-key", cookie);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://easyviews.herokuapp.com/Api/V1/GetGiftCards", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.Response);
        setsubscriptions(result.Response);
        setloaded(true);
      })
      .catch((error) => console.log("error", error));
  };

  let redeemCode = (e) => {
    e.preventDefault();
    let cookie = localStorage.getItem("cookie");

    var myHeaders = new Headers();
    myHeaders.append("x-api-key", cookie);
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      Name: code,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://easyviews.herokuapp.com/Api/v1/Users/Account/GiftCard/Redeem",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result.Response);
        setsuccessful(true);
        updateProfileData();
      })
      .catch((error) => console.log("error", error));
  };

  if (loaded) {
    var e = document.createElement("div");
    e.setAttribute("id", "sellix-container"),
      document.getElementsByTagName("body")[0].appendChild(e),
      setTimeout(
        function e(t) {
          if (document.querySelector("[data-sellix-product]") && !t) {
            let SellixButtons = document.querySelectorAll(
              "[data-sellix-product]"
            );
            for (var n = 0; n < SellixButtons.length; n++)
              SellixButtons[n].addEventListener("click", function (e) {
                console.log(
                  "Sellix Product ID: ",
                  e.target.getAttribute("data-sellix-product")
                );
                for (
                  var t,
                    n = e.target.getAttribute("data-sellix-product"),
                    l = "?",
                    i = 0,
                    o = e.target.attributes,
                    a = o.length;
                  i < a;
                  i++
                )
                  (t = o[i]).nodeName.indexOf("data-sellix-custom") > -1 &&
                    (l +=
                      t.nodeName.replace("data-sellix-custom-", "") +
                      "=" +
                      t.nodeValue +
                      "&");
                var r,
                  d = "https://embed.sellix.io/product/" + n + l,
                  s =
                    '<div class="sellix-fallback-button-container"><a class="sellix-fallback-button" href="' +
                    d +
                    '" target="_blank" >Go to product</a></div>';
                (r = document.createElement("div")).setAttribute(
                  "id",
                  "sellix-modal-" + n
                ),
                  r.setAttribute(
                    "style",
                    "display:none; position:fixed; top: 0; left:0; width: 100%; height:100%; z-index:-1050"
                  ),
                  (r.innerHTML =
                    '<div id="backdrop" class="sellix-backdrop"></div><style>.sellix-iframe {\n    width:100%;\n    height:100%;\n    border:none;\n}\n\n.sellix-iframe-content {\n    height: 100%;\n}\n\n.sellix-iframe-wrapper {\n    top:20px;\n    margin:auto;\n    width: 100%;\n    height:100%;\n    z-index: 1;\n}\n\n.sellix-iframe-loader-container {\n    z-index: 1;\n    position: absolute;\n    top: 30%;\n    left: 50%;\n    transform: translate(-50%);\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n}\n\n.sellix-backdrop {\n    background: #00000075;\n    backdrop-filter: blur(3px);\n    width:100%;\n    height:100%;\n    position:absolute;\n}\n\n.sellix-fallback-button {\n    font-family: "Open Sans";\n    font-size: 14px;\n    font-weight: 600;\n    color: white;\n    text-decoration: none;\n}\n\n.sellix-fallback-button-container {\n    position: absolute;\n    z-index: 2;\n    display: none;\n    top: 50%;\n    height: 50px;\n    line-height: 40px;\n    max-height: 50px;\n    box-sizing: border-box;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    background: #613bea;\n    padding: .375rem .75rem;\n    border-radius: 3px;\n}</style><div class="sellix-iframe-loader-container"><img src="https://cdn.sellix.io/static/logo/single.svg" alt="Loader" class="sellix-iframe-loader" style="width: 35px;" /></div>' +
                    s +
                    '<div class="sellix-iframe-wrapper"><div class="sellix-iframe-content"><iframe scrolling="auto" src="' +
                    d +
                    '" class="sellix-iframe" id="sellix-iframe" onerror="(e) => console.log(e)"></div></div>'),
                  document.getElementById("sellix-container").appendChild(r),
                  ((r = document.getElementById(
                    "sellix-modal-" + n
                  )).style.display = "flex"),
                  (r.style.zIndex = "99999"),
                  document
                    .querySelector("#sellix-iframe")
                    .addEventListener("load", function (e) {
                      document.querySelector(
                        ".sellix-iframe-loader"
                      ).style.display = "none";
                    }),
                  document
                    .querySelector("#sellix-iframe")
                    .addEventListener("error", function (e) {
                      (document.querySelector(
                        ".sellix-iframe-loader"
                      ).style.display = "none"),
                        (document.querySelector(
                          ".sellix-fallback-button-container"
                        ).style.display = "flex");
                    }),
                  window.addEventListener(
                    "message",
                    function (e) {
                      "close-embed" == e.data &&
                        ((r.style.display = "none"),
                        (r.style.zIndex = "-1050")),
                        console.log(e);
                    },
                    !1
                  );
              });
            t = !0;
          }
          document.querySelector("[data-sellix-product]") || (t = !1),
            setTimeout(e, 100, t);
        },
        100,
        !1
      );
  }

  return (
    <Div>
      <h1>Purchase Credits</h1>
      <div className="subscriptions-container">
        {subscriptions.map((subscription) => {
          return (
            <Credits key={subscription.ProductID}>
              <h1>{subscription.Cost.replace("$", "")}</h1>
              <p>credits</p>
              <p>{subscription.Cost}</p>
              <button
                type="button"
                data-sellix-product={subscription.ProductID}
              >
                Buy
              </button>
            </Credits>
          );
        })}
      </div>
      <div className="redeem">
        <h1>Redeem Credits</h1>

        <div className="input">
          <input
            type="text"
            value={code}
            onChange={(e) => setcode(e.target.value)}
          />
          <button onClick={(e) => redeemCode(e)}>Redeem</button>
        </div>

        {successful && <p>Success</p>}
      </div>
    </Div>
  );
};

export default Purchase;
