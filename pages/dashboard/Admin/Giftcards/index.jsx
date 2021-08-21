import { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import searchIcon from "../../../../Images/search-icon.png";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import AddGiftCardModal from "../../../../Components/Dashboard/Giftcard/AddGiftCardModal";
import GiftcardDescriptionModal from "./../../../../Components/Dashboard/Giftcard/GiftcardDescriptionModal";

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

let GiftCards = () => {
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

  useEffect(() => {
    getGiftCards();
  }, [deletedGc, giftCardLength]);

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

        // arr = [...giftCards.Redeemed, ...arr];
      }

      let result = arr.filter((giftCard) => {
        return giftCard.Name.toLowerCase().includes(searchedGiftCard);
      });

      console.log(result);
      setSearchResult(result);
    }
  }, [giftCards, seeRedeemed, seeAvailable, searchedGiftCard]);

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
      "https://easyviews.herokuapp.com/Api/v1/Staff/GiftCard/view",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setgiftCards(result.Response);
        if (result.Error == 0) {
          setLoading(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

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
              Available ({giftCards.Available.length})
            </p>
            <p
              className="redeemed"
              onClick={() => setseeRedeemed(!seeRedeemed)}
              style={!seeRedeemed ? { color: "#4e4e4e" } : { color: "white" }}
            >
              Redeemed ({giftCards.Redeemed.length})
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
            <Image src={searchIcon} alt="Search Icon" />
          </div>
          <input
            type="text"
            value={searchedGiftCard}
            onChange={(e) => {
              setsearchedGiftCard(e.target.value);
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
      </GiftCardsContainer>
    );
  }
};

export default GiftCards;
