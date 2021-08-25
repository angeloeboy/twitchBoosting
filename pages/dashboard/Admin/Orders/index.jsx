/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/link-passhref */
import styled from "styled-components";
import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import checkImg from "../../../../Images/check.svg";
import xImg from "../../../../Images/x-image.svg";
import { motion } from "framer-motion";
import searchIcon from "../../../../Images/search-icon.png";
import { useRouter } from "next/router";

const OrderContainer = styled.div`
  h1 {
    display: inline-block;
  }

  .open,
  .completed {
    display: inline-block;
    margin-left: 20px;
    cursor: pointer;
    font-weight: 300;
  }

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

    .Email {
      text-align: center;
    }

    .ServiceType {
      text-align: center;
    }

    .Online {
      text-align: right;
    }

    @media (max-width: 550px) {
      padding: 0px;
    }
  }

  .search-bar {
    width: 100%;

    border-bottom: 1px solid #2e2e2e;
    outline: none;
    margin-top: 89px;
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    img {
      cursor: pointer;
    }
    input {
      background-color: transparent;
      border: none;
      color: #757575;
      outline: none;
      font-size: 16px;
      margin-left: 29px;
      width: 100%;
    }
  }

  @media (max-width: 700px) {
    .main-orders {
      overflow-x: scroll;

      .panels,
      .orders {
        min-width: 650px;
      }
    }
  }

  @media (max-width: 500px) {
    h1 {
      display: block;
    }

    .open,
    .completed {
      margin-left: 0px;
      margin-right: 20px;
    }
  }

  @media (max-width: 400px) {
    .main-orders {
      overflow-x: scroll;

      .panels,
      .orders {
        min-width: 450px;
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

  .email {
    text-align: center;
  }

  .serviceType {
    text-align: center;
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

const Buttons = styled.div`
  justify-content: space-between;
  display: flex;
  margin-top: 20px;

  button {
    padding: 10px;
    width: 100px;
    border: 1px solid white;
    background-color: transparent;
    color: white;
    cursor: pointer;
  }

  .previous {
    opacity: ${(props) => (props.page === "1" ? 0.2 : 1)};
  }

  .next {
    opacity: ${(props) => (props.isNextPossible ? 1 : 0.2)};
  }
`;

let Orders = (props) => {
  const router = useRouter();
  const { page, search } = router.query;

  const [orders, setorders] = useState([]);

  const [isLoading, setLoading] = useState(true);
  const [error, seterror] = useState(true);

  const [seeCompleted, setseeCompleted] = useState(true);
  const [seeOpen, setseeOpen] = useState(true);

  const [searchedOrder, setsearchedOrder] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const [currentPage, setcurrentPage] = useState();
  const [isNextPossible, setisNextPossible] = useState(false);

  // Get orders on load
  useEffect(() => {
    if (router.isReady) {
      setLoading(true);
      if (search == undefined) {
        getOrders();
        setcurrentPage(page);
        setsearchedOrder("");
      } else {
        console.log(search);
        setsearchedOrder(search);

        searchOrder();

        setcurrentPage(page);
      }

      if (page == undefined && search == undefined) {
        router.push("/dashboard/Admin/Orders?page=1");
      }

      console.log("ready");
    }
  }, [page, search]);

  //Filter the page depending on choices
  useEffect(() => {
    if (Object.keys(orders).length != 0) {
      let arr = [];

      if (seeOpen) {
        arr = [...orders.Open, ...arr];
      }

      if (seeCompleted) {
        arr = [...orders.Completed, ...arr];
      }

      let result = arr.filter((order) => {
        if (
          order._id.includes(searchedOrder) ||
          order.Email.includes(searchedOrder)
        ) {
          return true;
        }
      });

      setSearchResult(result);
      setLoading(false);
    }
  }, [orders, seeOpen, seeCompleted]);

  let searchFunc = () => {
    if (searchedOrder != "") {
      router.push(
        "/dashboard/Admin/Orders?search=" + searchedOrder + "&page=1"
      );
      searchOrder();
    }
  };

  let searchOrder = () => {
    let cookie = localStorage.getItem("cookie");

    var myHeaders = new Headers();
    myHeaders.append("x-api-key", cookie);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    //Check if search is
    if (search !== undefined && search !== "") {
      fetch(
        "https://easyviews.herokuapp.com/Api/v1/Staff/Orders/Search?SearchTerm=" +
          search +
          "&Page=" +
          page,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log("first pge");
          console.log(
            "https://easyviews.herokuapp.com/Api/v1/Staff/Orders/Search?SearchTerm=" +
              search +
              "&Page=" +
              page
          );

          if (result.Error == 0) {
            setorders(result.Response);
            seterror(false);

            if (
              result.Response.Completed.length + result.Response.Open.length <
              30
            ) {
              setisNextPossible(false);
            } else {
              searchOrderNextPage(requestOptions);
            }

            if (
              result.Response.Completed.length + result.Response.Open.length ==
              0
            ) {
              router.push(
                "/dashboard/Admin/Orders?search=" + search + "&page=1"
              );
            }
          }
        })
        .catch((error) => console.log("error", error));
    }
  };

  let searchOrderNextPage = (requestOptions) => {
    let num = parseInt(page) + 1;
    let word = num.toString();

    fetch(
      "https://easyviews.herokuapp.com/Api/v1/Staff/Orders/Search?SearchTerm=" +
        search +
        "&Page=" +
        word,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("nextPAge");

        if (result.Error == 0) {
          if (
            result.Response.Completed.length + result.Response.Open.length ==
            0
          ) {
            setisNextPossible(false);
          } else {
            setisNextPossible(true);
          }
        }
      })
      .catch((error) => console.log("error", error));
  };

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
      "https://easyviews.herokuapp.com/Api/v1/Staff/Orders/View?Page=" + page,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.Error == 0) {
          setorders(result.Response);
          seterror(false);
          console.log(page);
          if (
            result.Response.Completed.length + result.Response.Open.length <
            30
          ) {
            setisNextPossible(false);
          } else {
            getOrdersNextPage(requestOptions);
          }

          if (
            result.Response.Completed.length + result.Response.Open.length ==
            0
          ) {
            router.push("/dashboard/Admin/Orders?page=1");
          }
        }
      })
      .catch((error) => console.log("error", error));
  };

  let getOrdersNextPage = (requestOptions) => {
    let num = parseInt(page) + 1;
    let word = num.toString();
    fetch(
      "https://easyviews.herokuapp.com/Api/v1/Staff/Orders/View?Page=" + word,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.Error == 0) {
          if (
            result.Response.Completed.length + result.Response.Open.length ==
            0
          ) {
            setisNextPossible(false);
          } else {
            setisNextPossible(true);
          }
        }
      })
      .catch((error) => console.log("error", error));
  };

  if (isLoading) {
    return (
      <div>
        <OrderContainer>
          <h1>Orders</h1>

          <p
            className="open"
            onClick={() => setseeOpen(!seeOpen)}
            style={!seeOpen ? { color: "#4e4e4e" } : { color: "white" }}
          >
            Open (0)
          </p>
          <p
            className="completed"
            onClick={() => setseeCompleted(!seeCompleted)}
            style={!seeCompleted ? { color: "#4e4e4e" } : { color: "white" }}
          >
            Completed (0)
          </p>

          <div className="search-bar">
            <div>
              <Image src={searchIcon} />
            </div>
            <input
              type="text"
              value={searchedOrder}
              onChange={(e) => {
                setsearchedOrder(e.target.value);
              }}
              disabled
              placeholder="Type Order ID or Email"
            />
          </div>

          <div className="main-orders">
            <div className="panels">
              <p>Order ID</p>
              <p className="Email">Email</p>
              <p className="ServiceType">ServiceType</p>
              <p className="Online">Online</p>
            </div>
            <p>Loading</p>
          </div>
        </OrderContainer>
      </div>
    );
  } else {
    return (
      <div>
        <OrderContainer>
          <h1>Orders</h1>

          <p
            className="open"
            onClick={() => setseeOpen(!seeOpen)}
            style={!seeOpen ? { color: "#4e4e4e" } : { color: "white" }}
          >
            Open ( {Object.keys(orders).length != 0 ? orders.Open.length : 0})
          </p>
          <p
            className="completed"
            onClick={() => setseeCompleted(!seeCompleted)}
            style={!seeCompleted ? { color: "#4e4e4e" } : { color: "white" }}
          >
            Completed ({" "}
            {Object.keys(orders).length != 0 ? orders.Completed.length : 0})
          </p>

          <div className="search-bar">
            <div>
              <Image src={searchIcon} onClick={() => searchFunc()} />
            </div>
            <input
              type="text"
              value={searchedOrder}
              onChange={(e) => {
                setsearchedOrder(e.target.value);
                if (e.target.value == "") {
                  router.push("/dashboard/Admin/Orders?page=1");
                }
              }}
              placeholder="Type Order ID or Email"
            />
          </div>

          <div className="main-orders">
            <div className="panels">
              <p>Order ID</p>
              <p className="Email">Email</p>
              <p className="ServiceType">ServiceType</p>
              <p className="Online">Online</p>
            </div>

            {error && <p>No orders found</p>}

            <div className="orders">
              {searchResult.map((order, index) => {
                return (
                  // eslint-disable-next-line react/jsx-key
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
                    <Link href={"/dashboard/Admin/Orders/" + order._id}>
                      <Order order={order}>
                        <div className="id">
                          <p>
                            {" "}
                            {index + 1}: {order._id}
                          </p>
                        </div>
                        <p className="email">{order.Email}</p>

                        <p
                          className="serviceType"
                          style={
                            order.Status == "Processing"
                              ? { color: "#FD9A01" }
                              : { color: "#209833" }
                          }
                        >
                          {order.ServiceType}
                        </p>
                        <div className="online">
                          {order.Online ? (
                            <Image src={checkImg} alt="Online Image" />
                          ) : (
                            <Image src={xImg} alt="Offline image" />
                          )}
                        </div>
                      </Order>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </OrderContainer>

        {searchedOrder == "" ? (
          <Buttons page={currentPage} isNextPossible={isNextPossible}>
            <button
              onClick={() => {
                if (page !== "1") {
                  setLoading(true);
                  setcurrentPage(currentPage - 1);
                  router.push(
                    "/dashboard/Admin/Orders?page=" + (parseInt(page) - 1)
                  );
                }
              }}
              className="previous"
            >
              {"< Previous"}
            </button>

            <button
              onClick={() => {
                if (isNextPossible) {
                  setLoading(true);
                  setcurrentPage(currentPage + 1);
                  router.push(
                    "/dashboard/Admin/Orders?page=" + (parseInt(page) + 1)
                  );
                }
              }}
              className="next"
            >
              {"Next >"}
            </button>
          </Buttons>
        ) : (
          <Buttons page={currentPage} isNextPossible={isNextPossible}>
            <button
              onClick={() => {
                if (page !== "1") {
                  setLoading(true);
                  setcurrentPage(currentPage - 1);
                  router.push(
                    "/dashboard/Admin/Orders?search=" +
                      search +
                      "&page=" +
                      (parseInt(page) - 1)
                  );
                }
              }}
              className="previous"
            >
              {"< Previous"}
            </button>

            <button
              onClick={() => {
                if (isNextPossible) {
                  setLoading(true);
                  setcurrentPage(currentPage + 1);
                  router.push(
                    "/dashboard/Admin/Orders?search=" +
                      search +
                      "&page=" +
                      (parseInt(page) + 1)
                  );
                }
              }}
              className="next"
            >
              {"Next >"}
            </button>
          </Buttons>
        )}
      </div>
    );
  }
};

export default Orders;
