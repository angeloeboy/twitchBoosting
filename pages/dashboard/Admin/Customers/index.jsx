/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/link-passhref */
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import styled from "styled-components";

import checkImg from "../../../../Images/check.svg";
import xImg from "../../../../Images/x-image.svg";
import searchIcon from "../../../../Images/search-icon.png";
import { useRouter } from "next/router";
import RocketLoading from "./../../../../Components/Dashboard/rocketLoading";

const CustomersContainer = styled.div`
  h1 {
    display: inline-block;
  }

  .valid,
  .banned {
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
    grid-template-columns: 1fr 1fr 1fr;
    margin-top: 66px;
    padding: 0px 21px;
    padding-bottom: 21px;
    border-bottom: 1px solid #0e0e0e;
    p {
      font-weight: 400;
    }

    .credits {
      text-align: center;
    }

    .verified {
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

    div {
    }
  }

  @media (max-width: 677px) {
    .main-orders {
      overflow-x: scroll;

      .panels,
      .orders {
        min-width: 500px;
      }
    }
  }
`;

const Customer = styled.div`
  user-select: none;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
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

  .credits {
    text-align: center;
    width: 120px;
    margin: 0 auto;
    background: rgba(27, 27, 27, 0.34);
    border-radius: 7px;
    padding: 5px 0px;
  }

  .credits {
    text-align: center;
  }

  .verified {
    text-align: right;
  }

  @media (max-width: 998px) {
    font-size: 14px;
  }

  @media (max-width: 550px) {
    padding: 13px 5px;
  }

  @media (max-width: 440px) {
    /* font-size: 12px; */

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

let Customers = () => {
  const router = useRouter();
  const { page, search } = router.query;

  const [customers, setcustomers] = useState({});
  const [loaded, setloaded] = useState(false);

  const [seeValid, setseeValid] = useState(true);
  const [seeBanned, setseeBanned] = useState(true);

  const [searchedCustomer, setSearchedCustomer] = useState("");

  const [searchResult, setsearchResult] = useState([]);

  const [currentPage, setcurrentPage] = useState();
  const [isNextPossible, setisNextPossible] = useState(false);

  // Get customers on load
  useEffect(() => {
    if (router.isReady) {
      setloaded(false);

      if (search == undefined) {
        if (page != undefined) {
          getCustomers();
          setcurrentPage(page);
          setSearchedCustomer("");
        }
      } else {
        console.log(search);
        setSearchedCustomer(search);

        searchCustomer();

        setcurrentPage(page);
      }

      if (page == undefined && search == undefined) {
        router.push("/dashboard/Admin/Customers?page=1");
      }

      console.log("ready");
    }
  }, [page, search]);

  //Filter the customers || Valid or Banned
  useEffect(() => {
    if (Object.keys(customers).length != 0) {
      setloaded(true);
      let arr = [];
      if (seeValid) {
        arr = [...customers.Valid, ...arr];
      }
      if (seeBanned) {
        arr = [...customers.Banned, ...arr];
      }
      let searched = arr.filter((customer) => {
        return customer.Email.includes(searchedCustomer);
      });

      setsearchResult(searched);
    }
  }, [customers, seeValid, seeBanned]);

  let searchFunc = () => {
    if (searchedCustomer != "") {
      router.push(
        "/dashboard/Admin/Customers?search=" + searchedCustomer + "&page=1"
      );
      searchCustomer();
    }
  };

  let getCustomers = () => {
    let cookie = localStorage.getItem("cookie");

    var myHeaders = new Headers();
    myHeaders.append("x-api-key", cookie);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://easyviews.herokuapp.com/Api/v1/Staff/Users/View?Page=" + page,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.Error == 0) {
          setcustomers(result.Response);
          console.log(result.Response);
          if (
            result.Response.Valid.length + result.Response.Banned.length >
            30
          ) {
            setisNextPossible(false);
          } else {
            getNextPageCostumers(requestOptions);
          }

          if (
            result.Response.Valid.length + result.Response.Banned.length ==
            0
          ) {
            router.push("/dashboard/Admin/Customers?page=1");
          }
        }
      })
      .catch((error) => console.log("error", error));
  };

  let getNextPageCostumers = (requestOptions) => {
    let num = parseInt(page) + 1;
    let word = num.toString();

    fetch(
      "https://easyviews.herokuapp.com/Api/v1/Staff/Users/View?Page=" + word,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.Response.Valid.length + result.Response.Banned.length == 0) {
          setisNextPossible(false);
        } else {
          setisNextPossible(true);
        }
      })
      .catch((error) => console.log("error", error));
  };

  let searchCustomer = () => {
    let cookie = localStorage.getItem("cookie");

    var myHeaders = new Headers();
    myHeaders.append("x-api-key", cookie);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    if (search !== undefined && search !== "") {
      fetch(
        "https://easyviews.herokuapp.com/Api/v1/Staff/Users/Search?SearchTerm=" +
          search +
          "&Page=" +
          page,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setcustomers(result.Response);
          console.log("searched");

          if (
            result.Response.Valid.length + result.Response.Banned.length >
            0
          ) {
            setisNextPossible(false);
          } else {
            getNextPageSearchedCustomer(requestOptions);
          }

          if (
            result.Response.Valid.length + result.Response.Banned.length ==
            0
          ) {
            router.push(
              "/dashboard/Admin/Customers?search=" + search + "&page=1"
            );
          }
        })
        .catch((error) => console.log("error", error));
    }
  };

  let getNextPageSearchedCustomer = (requestOptions) => {
    fetch(
      "https://easyviews.herokuapp.com/Api/v1/Staff/Users/Search?SearchTerm=" +
        search +
        "&Page=" +
        page,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setcustomers(result.Response);
        console.log("searched");

        if (
          result.Response.Valid.length + result.Response.Banned.length ===
          0
        ) {
          setisNextPossible(false);
        } else {
          setisNextPossible(true);
        }
      })
      .catch((error) => console.log("error", error));
  };

  if (loaded) {
    return (
      <div>
        <CustomersContainer>
          <div>
            <h1>Costumers</h1>
            <p
              className="valid"
              style={!seeValid ? { color: "#4e4e4e" } : { color: "white" }}
              onClick={() => setseeValid(!seeValid)}
            >
              Valid (
              {Object.keys(customers).length != 0 ? customers.Valid.length : 0})
            </p>
            <p
              className="banned"
              style={!seeBanned ? { color: "#4e4e4e" } : { color: "white" }}
              onClick={() => setseeBanned(!seeBanned)}
            >
              Banned (
              {Object.keys(customers).length != 0 ? customers.Banned.length : 0}
              )
            </p>

            <div className="search-bar">
              <div>
                <Image src={searchIcon} onClick={() => searchFunc()} />
              </div>
              <input
                type="text"
                value={searchedCustomer}
                onChange={(e) => {
                  setSearchedCustomer(e.target.value);
                  if (e.target.value == "") {
                    router.push("/dashboard/Admin/Customers?page=1");
                  }
                }}
                placeholder="Type Email"
              />
            </div>

            <div className="main-orders">
              <div className="panels">
                <p>Email</p>
                <p className="credits">Credits</p>
                <p className="verified">Verified</p>
              </div>

              <div className="orders">
                {searchResult.map((customer) => {
                  return (
                    <div key={customer._id + 0}>
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
                      >
                        <Link
                          href={"/dashboard/Admin/Customers/" + customer.Email}
                        >
                          <Customer customer={customer}>
                            <div className="Email">
                              <p>{customer.Email}</p>
                            </div>

                            <p className="credits">{customer.Credits}</p>

                            <div className="verified">
                              {customer.EmailVerified ? (
                                <Image src={checkImg} alt="Online Image" />
                              ) : (
                                <Image src={xImg} alt="Offline image" />
                              )}
                            </div>
                          </Customer>
                        </Link>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CustomersContainer>

        {/* <Buttons page={currentPage} isNextPossible={isNextPossible}>
          <button
            onClick={() => {
              if (page !== "1") {
                setLoading(true);
                setcurrentPage(currentPage - 1);
                router.push("/dashboard/Orders?page=" + (parseInt(page) - 1));
              }
            }}
            className="previous"
          >
            {"< Previous"}
          </button>

          <button
            onClick={() => {
              if (searchResult.length == "30") {
                setLoading(true);
                setcurrentPage(currentPage + 1);
                router.push("/dashboard/Orders?page=" + (parseInt(page) + 1));
              }
            }}
            className="next"
          >
            {"Next >"}
          </button>
        </Buttons> */}

        {searchedCustomer == "" ? (
          <Buttons page={currentPage} isNextPossible={isNextPossible}>
            <button
              onClick={() => {
                if (page !== "1") {
                  setLoading(true);
                  setcurrentPage(currentPage - 1);
                  router.push(
                    "/dashboard/Admin/Customers?page=" + (parseInt(page) - 1)
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
                    "/dashboard/Admin/Customers?page=" + (parseInt(page) + 1)
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
                    "/dashboard/Admin/Customers?search=" +
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
                    "/dashboard/Admin/Customers?search=" +
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
  } else {
    return (
      <div>
        <CustomersContainer>
          <div>
            <h1>Costumers</h1>
            <p
              className="valid"
              style={!seeValid ? { color: "#4e4e4e" } : { color: "white" }}
              onClick={() => setseeValid(!seeValid)}
            >
              Valid (0)
            </p>
            <p
              className="banned"
              style={!seeBanned ? { color: "#4e4e4e" } : { color: "white" }}
              onClick={() => setseeBanned(!seeBanned)}
            >
              Banned (0)
            </p>

            <div className="search-bar">
              <div>
                <Image src={searchIcon} />
              </div>
              <input
                type="text"
                value={searchedCustomer}
                onChange={(e) => {
                  setSearchedCustomer(e.target.value);
                }}
                placeholder="Type Email"
              />
            </div>

            <div className="main-orders">
              <div className="panels">
                <p>Email</p>
                <p className="credits">Credits</p>
                <p className="verified">Verified</p>
              </div>

              <RocketLoading />
            </div>
          </div>
        </CustomersContainer>
      </div>
    );
  }
};

export default Customers;
