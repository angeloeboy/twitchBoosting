import { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import searchIcon from "../../../../Images/search-icon.png";
import { motion, AnimatePresence } from "framer-motion";

import AddSubscriptionModal from "../../../../Components/Dashboard/Subscription/AddSubscriptionModal";
import SubscriptonDescriptionModal from "./../../../../Components/Dashboard/Subscription/SubscriptonDescriptionModal";
import { useRouter } from "next/router";

const GiftCardsContainer = styled.div`
  /* position: relative; */
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
      display: flex;
      align-items: center;
      h1 {
        display: inline-block;
      }

      .available,
      .redeemed {
        display: inline-block;
        margin-left: 20px;
        cursor: pointer;
        font-weight: 300;
      }
    }

    button {
      border: 1px solid white;
      background-color: transparent;
      color: white;
      width: 150px;
      border-radius: 8px;
      padding: 14px 0px;
      margin-left: 16px;
      transition: all 0.1s ease;
      cursor: pointer;
      &:hover {
        background-color: #203298;
        color: white;
        border: 1px solid #203298;
      }
    }

    @media (max-width: 740px) {
      flex-flow: column;
      align-items: initial;
      div {
        flex-flow: column;
        align-items: inherit;

        .available,
        .redeemed {
          margin-left: 0px;
          margin-right: 20px;
          margin-top: 10px;
        }
      }

      button {
        margin-left: 0px;
        margin-top: 15px;
      }
    }
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
      color: #535353;
    }

    .Value {
      text-align: center;
    }

    .Available {
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

const GiftCard = styled.div`
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

  .status {
    text-align: center;
    background-color: red;
    width: 120px;
    margin: 0 auto;
    background: rgba(27, 27, 27, 0.34);
    border-radius: 7px;
    padding: 5px 0px;
  }

  .value {
    text-align: center;
  }

  .available {
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

let Subscriptions = () => {
  const router = useRouter();
  const { page, search } = router.query;

  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchedSubscription, setsearchedSubscription] = useState("");

  const [searchResult, setSearchResult] = useState([]);
  const [addsubsVisible, setaddsubsVisible] = useState(false);

  const [subsvisible, setgcVisible] = useState(false);
  const [subsData, setSubsData] = useState({});

  const [deletedSubs, setdeletedSubs] = useState("");
  const [subsLength, setSubsLength] = useState(0);

  const [currentPage, setcurrentPage] = useState();
  const [isNextPossible, setisNextPossible] = useState(true);

  useEffect(() => {
    if (router.isReady) {
      if (search == undefined) {
        if (page != undefined) {
          getSubscriptions();
          setcurrentPage(page);
          setsearchedSubscription("");
        }
      } else {
        console.log(search);
        setsearchedSubscription(search);

        if (search != "") {
          searchSubscription();
        }

        setcurrentPage(page);
      }

      if (page == undefined && search == undefined) {
        router.push("/dashboard/Admin/Subscriptions?page=1");
      }
    }
  }, [page, search, deletedSubs, subsLength]);

  let searchFunc = () => {
    if (searchedSubscription != "") {
      router.push(
        "/dashboard/Admin/Subscriptions?search=" +
          searchedSubscription +
          "&page=1"
      );
      searchSubscription();
    }
  };

  let getSubscriptions = () => {
    let cookie = localStorage.getItem("cookie");

    var myHeaders = new Headers();
    myHeaders.append("x-api-key", cookie);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://easyviews.herokuapp.com/Api/v1/Staff/Subscriptions/View?Page=" +
        page,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.Error == 0) {
          console.log(page);
          setLoading(false);
          setSubscriptions(result.Response);

          if (result.Response > 30) {
            setisNextPossible(false);
          } else {
            getSubscriptionsNextPage(requestOptions);
          }
        }
      })
      .catch((error) => console.log("error", error));
  };

  let getSubscriptionsNextPage = (requestOptions) => {
    let num = parseInt(page) + 1;
    let word = num.toString();

    fetch(
      "https://easyviews.herokuapp.com/Api/v1/Staff/Subscriptions/View?Page=" +
        word,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.Error == 0) {
          if (result.Response.length == 0) {
            setisNextPossible(false);
          } else {
            setisNextPossible(true);
          }
        }
      })
      .catch((error) => console.log("error", error));
  };

  let searchSubscription = () => {
    let cookie = localStorage.getItem("cookie");
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", cookie);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    if (search !== undefined && search !== "") {
      fetch(
        "https://easyviews.herokuapp.com/Api/v1/Staff/Subscriptions/Search?SearchTerm=" +
          search +
          "&Page=" +
          page,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.Error == 0) {
            setSubscriptions(result.Response);
            setLoading(false);

            if (result.Response.length > 30) {
              setisNextPossible(false);
            } else {
              searchGiftcardNextPage(requestOptions);
            }
          }
        })
        .catch((error) => console.log("error", error));
    }
  };

  let searchGiftcardNextPage = (requestOptions) => {
    let num = parseInt(page) + 1;
    let word = num.toString();

    fetch(
      "https://easyviews.herokuapp.com/Api/v1/Staff/Subscriptions/Search?SearchTerm=" +
        search +
        "&Page=" +
        word,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.Error == 0) {
          if (result.Response.length == 0) {
            setisNextPossible(false);
          } else {
            setisNextPossible(true);
          }
        }
      })
      .catch((error) => console.log("error", error));
  };

  let getSpecificGc = (id) => {
    let cookie = localStorage.getItem("cookie");

    var myHeaders = new Headers();
    myHeaders.append("x-api-key", cookie);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://easyviews.herokuapp.com/Api/v1/Staff/Subscriptions/View/" + id,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.Error == 0) {
          setSubsData(result.Response);
          setgcVisible(true);
        }
      })
      .catch((error) => console.log("error", error));
  };

  if (loading) {
    return (
      <GiftCardsContainer>
        <div className="header">
          <div>
            <h1>Subscription</h1>
          </div>

          <button className="giftCard-btn">Add Subscriptions</button>
        </div>
        <div className="search-bar">
          <div>
            <Image src={searchIcon} alt="Search Icon" />
          </div>
          <input
            type="text"
            value={searchedSubscription}
            onChange={(e) => {
              setsearchedSubscription(e.target.value);
            }}
          />
        </div>

        <div className="main-orders">
          <div className="panels">
            <p>Subscription ID</p>
            <p className="Value">Name</p>
            <p className="Available">Service Type</p>
          </div>

          <p>Loading</p>
        </div>
      </GiftCardsContainer>
    );
  } else {
    return (
      <GiftCardsContainer>
        <div className="header">
          <div>
            <h1>Subscriptions</h1>
          </div>

          <button
            className="giftCard-btn"
            onClick={() => setaddsubsVisible(true)}
          >
            Add Subscriptions
          </button>
        </div>

        <div className="search-bar">
          <div>
            <Image
              src={searchIcon}
              alt="Search Icon"
              onClick={() => searchFunc()}
            />
          </div>
          <input
            type="text"
            value={searchedSubscription}
            onChange={(e) => {
              setsearchedSubscription(e.target.value);
              if (e.target.value == "") {
                router.push("/dashboard/Admin/Subscriptions?page=1");
              }
            }}
            placeholder="Type subscription ID or name"
          />
        </div>

        <div className="main-orders">
          <div className="panels">
            <p>Subscription ID</p>
            <p className="Value">Name</p>
            <p className="Available">Service Type</p>
          </div>

          <div className="orders">
            {subscriptions.map((subscription) => {
              return (
                <div
                  key={subscription.Name}
                  onClick={() => getSpecificGc(subscription._id)}
                >
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
                    <GiftCard>
                      <p>{subscription._id}</p>
                      <p className="value">{subscription.Name}</p>
                      <p className="available">{subscription.ServiceType}</p>
                    </GiftCard>
                  </motion.div>
                </div>
              );
            })}
          </div>

          <AnimatePresence>
            {subsvisible && (
              <>
                <SubscriptonDescriptionModal
                  subsData={subsData}
                  setgcVisible={setgcVisible}
                  setdeletedSubs={setdeletedSubs}
                />
              </>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {addsubsVisible && (
              <>
                <AddSubscriptionModal
                  setaddsubsVisible={setaddsubsVisible}
                  setSubsLength={setSubsLength}
                />
              </>
            )}
          </AnimatePresence>
        </div>

        {searchedSubscription == "" ? (
          <Buttons page={currentPage} isNextPossible={isNextPossible}>
            <button
              onClick={() => {
                if (page !== "1") {
                  setLoading(true);
                  setcurrentPage(currentPage - 1);
                  router.push(
                    "/dashboard/Admin/Subscriptions?page=" +
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
                    "/dashboard/Admin/Subscriptions?page=" +
                      (parseInt(page) + 1)
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
                    "/dashboard/Admin/Subscriptions?search=true&page=" +
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
                    "/dashboard/Admin/Subscriptions?search=true&page=" +
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
      </GiftCardsContainer>
    );
  }
};

export default Subscriptions;
