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

let Customers = () => {
  const [customers, setcustomers] = useState({});
  const [loaded, setloaded] = useState(false);

  const [allCustomer, setallCustomer] = useState([]);

  const [seeValid, setseeValid] = useState(true);
  const [seeBanned, setseeBanned] = useState(true);

  const [searchedCustomer, setSearchedCustomer] = useState("");

  const [searchResult, setsearchResult] = useState([]);

  //Get customers on load
  useEffect(() => {
    getCustomers();
  }, []);

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
  }, [customers, seeValid, seeBanned, searchedCustomer]);

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
      "https://easyviews.herokuapp.com/Api/v1/Staff/Users/View",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setcustomers(result.Response);
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
              Valid ({customers.Valid.length})
            </p>
            <p
              className="banned"
              style={!seeBanned ? { color: "#4e4e4e" } : { color: "white" }}
              onClick={() => setseeBanned(!seeBanned)}
            >
              Banned ({customers.Banned.length})
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

              <p>Loading</p>
            </div>
          </div>
        </CustomersContainer>
      </div>
    );
  }
};

export default Customers;
