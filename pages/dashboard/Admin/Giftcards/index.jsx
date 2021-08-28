import { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import searchIcon from "../../../../Images/search-icon.png";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import AddGiftCardModal from "../../../../Components/Dashboard/Giftcard/AddGiftCardModal";
import GiftcardDescriptionModal from "./../../../../Components/Dashboard/Giftcard/GiftcardDescriptionModal";
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
      width: 132px;
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

let GiftCards = () => {
  const router = useRouter();
  const { page, search } = router.query;

  const [giftCards, setgiftCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchedGiftCard, setsearchedGiftCard] = useState("");
  const [seeAvailable, setseeAvailable] = useState(true);
  const [seeRedeemed, setseeRedeemed] = useState(true);

  const [searchResult, setSearchResult] = useState([]);
  const [addGiftCardVisible, setaddGiftCardVisible] = useState(false);

  const [gcVisible, setgcVisible] = useState(false);
  const [gcData, setgcData] = useState({});

  const [deletedGc, setDeletedGc] = useState("");
  const [giftCardLength, setgiftCardLength] = useState("");

  const [currentPage, setcurrentPage] = useState();
  const [isNextPossible, setisNextPossible] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      if (search == undefined) {
        if (page != undefined) {
          getGiftCards();
          setcurrentPage(page);
          setsearchedGiftCard("");
        }
      } else {
        console.log(search);
        setsearchedGiftCard(search);

        if (search != "") {
          searchGiftcard();
        }

        setcurrentPage(page);
      }

      if (page == undefined && search == undefined) {
        router.push("/dashboard/Admin/Giftcards?page=1");
      }
    }
  }, [page, search, deletedGc, giftCardLength]);

  //filter the display
  useEffect(() => {
    if (Object.keys(giftCards).length != 0) {
      let arr = [];

      if (seeAvailable) {
        let item = giftCards.Available;

        item.map((giftcard) => {
          giftcard.Available = true;
        });

        arr = [...item, ...arr];
      }

      if (seeRedeemed) {
        let item = giftCards.Redeemed;

        item.map((giftcard) => {
          giftcard.Available = false;
        });

        arr = [...item, ...arr];
      }

      console.log(arr);

      setSearchResult(arr);
      setLoading(false);
    }
  }, [giftCards, seeRedeemed, seeAvailable]);

  let searchFunc = () => {
    if (searchedGiftCard != "") {
      router.push(
        "/dashboard/Admin/Giftcards?search=" + searchedGiftCard + "&page=1"
      );
      searchGiftcard();
    }
  };

  //get giftcards
  let getGiftCards = () => {
    let cookie = localStorage.getItem("cookie");

    var myHeaders = new Headers();
    myHeaders.append("x-api-key", cookie);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://easyviews.herokuapp.com/Api/v1/Staff/GiftCard/view?Page=" + page,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.Error == 0) {
          setgiftCards(result.Response);
          // console.log(result.Response);

          if (result.Response.Available + result.Response.Redeemed > 30) {
            setisNextPossible(false);
            console.log("bigger?");
          } else {
            getGiftCardsNextPage(requestOptions);
          }

          if (result.Response.Available + result.Response.Redeemed == 0) {
            router.push("/dashboard/Admin/Giftcards?page=1");
          }
        }
      })
      .catch((error) => console.log("error", error));
  };

  //check if next page has content. If false, allow going to next page
  let getGiftCardsNextPage = (requestOptions) => {
    let num = parseInt(page) + 1;
    let word = num.toString();

    fetch(
      "https://easyviews.herokuapp.com/Api/v1/Staff/GiftCard/view?Page=" + word,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.Error == 0) {
          console.log(result.Response);
          if (result.Response.Available + result.Response.Redeemed < 0) {
            setisNextPossible(true);
          }
        }
      })
      .catch((error) => console.log("error", error));
  };

  //search giftcards
  let searchGiftcard = () => {
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
        "https://easyviews.herokuapp.com/Api/v1/Staff/GiftCard/Search?SearchTerm=" +
          search +
          "&Page=" +
          page,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.Error == 0) {
            setgiftCards(result.Response);
            if (
              result.Response.Available.length +
                result.Response.Redeemed.length <
              30
            ) {
              setisNextPossible(false);
            } else {
              getSearchCardsNextPage(requestOptions);
            }

            if (result.Response.Available + result.Response.Redeemed == 0) {
              router.push(
                "/dashboard/Admin/Giftcards?search=" + search + "&page=1"
              );
            }
          }
        })
        .catch((error) => console.log("error", error));
    } else {
      console.log("undefined");
    }
  };

  //check if next page has content. If false, allow going to next page
  let getSearchCardsNextPage = (requestOptions) => {
    let num = parseInt(page) + 1;
    let word = num.toString();

    fetch(
      "https://easyviews.herokuapp.com/Api/v1/Staff/GiftCard/Search?SearchTerm=" +
        search +
        "&Page=" +
        word,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.Error == 0) {
          console.log(result.Response);
          console.log("smailler");

          if (result.Response.Available + result.Response.Redeemed === 0) {
            setisNextPossible(true);
          }
        }
      })
      .catch((error) => console.log("error", error));
  };

  //get giftcard data
  let getSpecificGc = (codeName) => {
    let cookie = localStorage.getItem("cookie");

    var myHeaders = new Headers();
    myHeaders.append("x-api-key", cookie);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://easyviews.herokuapp.com/Api/v1/Staff/GiftCard/view/" + codeName,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // setgiftCards(result.Response);
        // console.log(result.Response);
        if (result.Error == 0) {
          setgcData(result.Response);
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
            <h1>Gift Cards</h1>

            <p className="available">Available (0)</p>
            <p className="redeemed">Redeemed (0)</p>
          </div>

          <button className="giftCard-btn">Add GiftCard</button>
        </div>
        <div className="search-bar">
          <div>
            <Image src={searchIcon} alt="Search Icon" />
          </div>
          <input
            type="text"
            value={searchedGiftCard}
            onChange={(e) => {
              setsearchedGiftCard(e.target.value);
            }}
          />
        </div>

        <div className="main-orders">
          <div className="panels">
            <p>Name</p>
            <p className="Value">Value</p>
            <p className="Available">Available</p>
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
            <h1>Gift Cards</h1>

            <p
              className="available"
              onClick={() => setseeAvailable(!seeAvailable)}
              style={!seeAvailable ? { color: "#4e4e4e" } : { color: "white" }}
            >
              Available (
              {Object.keys(giftCards).length != 0
                ? giftCards.Available.length
                : 0}
              )
            </p>
            <p
              className="redeemed"
              onClick={() => setseeRedeemed(!seeRedeemed)}
              style={!seeRedeemed ? { color: "#4e4e4e" } : { color: "white" }}
            >
              Redeemed (
              {Object.keys(giftCards).length != 0
                ? giftCards.Redeemed.length
                : 0}
              )
            </p>
          </div>

          <button
            className="giftCard-btn"
            onClick={() => setaddGiftCardVisible(true)}
          >
            Add GiftCard
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
            value={searchedGiftCard}
            onChange={(e) => {
              setsearchedGiftCard(e.target.value);
              if (e.target.value == "") {
                router.push("/dashboard/Admin/Giftcards?page=1");
              }
            }}
            placeholder="Type giftcard name"
          />
        </div>

        <div className="main-orders">
          <div className="panels">
            <p>Name</p>
            <p className="Value">Value</p>
            <p className="Available">Available</p>
          </div>

          {/* {error && <p>No orders found</p>} */}

          <div className="orders">
            {searchResult.map((giftCard) => {
              return (
                // <Link
                //   key={giftCard.Name}
                //   href={"/dashboard/Admin/Giftcards/" + giftCard.Name}
                // >
                <div
                  key={giftCard.Name}
                  onClick={() => getSpecificGc(giftCard.Name)}
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
                      <p>{giftCard.Name}</p>
                      <p className="value">{giftCard.Value}</p>
                      <p className="available">
                        {giftCard.Available ? "Yes" : "No"}
                      </p>
                    </GiftCard>
                  </motion.div>
                </div>

                // </Link>
              );
            })}
          </div>

          <AnimatePresence>
            {gcVisible && (
              <>
                <GiftcardDescriptionModal
                  gcData={gcData}
                  setgcVisible={setgcVisible}
                  setDeletedGc={setDeletedGc}
                />
              </>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {addGiftCardVisible && (
              <>
                <AddGiftCardModal
                  setaddGiftCardVisible={setaddGiftCardVisible}
                  setgiftCardLength={setgiftCardLength}
                />
              </>
            )}
          </AnimatePresence>
        </div>

        {searchedGiftCard == "" ? (
          <Buttons page={currentPage} isNextPossible={isNextPossible}>
            <button
              onClick={() => {
                if (page !== "1") {
                  setLoading(true);
                  setcurrentPage(currentPage - 1);
                  router.push(
                    "/dashboard/Admin/Giftcards?page=" + (parseInt(page) - 1)
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
                    "/dashboard/Admin/Giftcards?page=" + (parseInt(page) + 1)
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
                    "/dashboard/Admin/Giftcards?search=true&page=" +
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
                    "/dashboard/Admin/Giftcards?search=true&page=" +
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

export default GiftCards;
