/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/link-passhref */
import styled from "styled-components";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { MenuContext, MenuProvider } from "./../menuContext";
import { useRouter } from "next/router";

import cartImg from "../../Images/cartImg.svg";
import plansImg from "../../Images/plansImg.svg";
import purchaseImg from "../../Images/purchaseImg.svg";
import logo from "../../Images/logo.png";

import Image from "next/image";

const SidebarDiv = styled.div`
  width: 340px;
  width: 20%;
  color: white;
  background-color: #070707;
  padding: 22px 0px 0px 39px;
  height: 100vh;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  position: fixed;
  transition: all 0.3s ease-in-out;
  overflow-y: auto;

  .toggleMenu {
    display: none;

    width: 40px;

    div {
      width: 100%;
      height: 3px;
      background-color: white;
      border: 3px;
      &:nth-child(2) {
        margin: 8px 0px;
      }
    }
  }

  .account-title {
    font-weight: 700;
  }

  .account-details {
    background-color: #203298;
    margin-right: 39px;
    padding: 21px;
    margin-top: 42px;
    border-radius: 8px;
    p {
      &:nth-child(2),
      &:nth-child(3) {
        font-size: 14px;
        margin-top: 5px;
      }
    }

    .logout {
      background-color: transparent;
      color: white;
      width: 100%;
      padding: 5px;
      margin-top: 20px;
      border: 1px solid white;
      transition: all 0.3s ease;

      &:hover {
        background-color: white;
        color: black;
      }
    }
  }

  .menu {
    transition: all 0.3s ease;

    .main-menu-text {
      font-weight: 200;
      font-size: 12px;
      text-transform: uppercase;
      margin-top: 50px;

      @media (max-width: 1250px) {
        opacity: 0;
      }
    }

    .admin {
      margin-top: 30px;
    }

    .menu-items {
      ul {
        margin: none;
        li {
          list-style: none;
          padding: 11px 0px;
          margin: 10px 0px;
          cursor: pointer;
          user-select: none;
          display: flex;
          align-items: center;
          transition: opacity 0.3s ease;
          .img {
            margin-right: 30px;
          }
        }
      }
    }
  }

  .verify {
    position: fixed;
    width: 100vw;
    top: 0;
    left: 0px;
    background-color: #ff5c5c60;
    text-align: center;
    z-index: 999;
    padding: 10px;
    transition: all 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: #ff5c5c;
    }
    p {
      margin-right: 20px;
    }
    button {
      margin-left: 10px;
      padding: 10px;
      background-color: transparent;
      border: 1px solid white;
      color: white;

      &:hover {
        background-color: #ee3737;
      }
    }
  }

  @media (max-width: 1250px) {
    max-width: 100px;
    padding: 22px 0px 69px 0px;

    .account-details {
      p {
        display: none;
      }

      margin: 42px auto 0px auto;
    }

    .menu-items {
      ul {
        li {
          p {
            display: none;
          }

          .img {
            margin: 0 auto;
            transform: translateX(-40%);
          }
        }
      }
    }
  }

  @media (max-width: 1250px) {
    width: 100vw;
    z-index: 99;
    max-width: 100vw;
    height: initial;
    padding: 20px 0px;
    background-color: #070707;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    overflow-y: initial;

    .toggleMenu {
      display: inline-block;
      margin-left: 20%;
    }

    .logo {
      display: inline-block;
      width: 60px;
      margin: 0 auto;
    }

    .menu-container {
      background-color: #070707;
      height: calc(100vh - 84px);
      position: absolute;
      width: 60vw;
      top: 84px;
      padding-left: 5%;
      transform: ${(props) =>
        props.visible ? "translateX(0%)" : "translateX(-100%)"};
      transition: all 0.3s ease-in-out;
      overflow-y: auto;
    }

    .account-details {
      margin-top: 20px;
      margin-right: 10%;
      p {
        display: block;
      }
    }

    .menu {
      .main-menu-text {
        opacity: 1;
      }
    }

    .menu-items {
      display: absolute;
      ul {
        li {
          p {
            display: block;
          }

          .img {
            margin: 0px;
            transform: translateX(0px);
          }
        }
      }
    }
  }

  @media (max-width: 500px) {
    .menu {
      .main-menu-text {
        margin-top: 30px;
      }

      .menu-items {
        margin-top: 0px;
        ul {
          li {
            margin: 0px;
            /* padding: 0px; */
            p {
              font-size: 14px;
            }
          }
        }
      }
    }
  }
`;

let Sidebar = (props) => {
  let menuItems = [
    {
      name: "Orders",
      clicked: false,
      img: cartImg,
    },
    {
      name: "Purchase",
      clicked: false,
      img: purchaseImg,
    },
    {
      name: "Plans",
      clicked: false,
      img: plansImg,
    },
  ];

  let menuItemsAdmin = [
    {
      name: "Customers",
      clicked: false,
      img: purchaseImg,
    },
    {
      name: "Orders",
      clicked: false,
      img: purchaseImg,
    },
    {
      name: "Giftcards",
      clicked: false,
      img: purchaseImg,
    },
    {
      name: "Subscriptions",
      clicked: false,
      img: purchaseImg,
    },
  ];

  const router = useRouter();

  const [menuItem, setmenuItem] = useState(menuItems);
  const [adminItem, setadminItem] = useState(menuItemsAdmin);

  const [loaded, setloaded] = useState(false);
  const [userData, setuserData] = useState({});

  const [data, setData] = useContext(MenuContext);
  const [isMenuVisible, setIsMenuvisible] = useState(false);

  const [selected, setselected] = useState("");

  const [isNotVerifiedVisible, setisNotVerifiedVisible] = useState(true);
  useEffect(() => {
    setuserData(JSON.parse(localStorage.getItem("userObject")));
  }, [data]);

  useEffect(() => {
    let clickedItem;

    clickedItem = router.pathname.replace("/dashboard/", "");

    if (router.pathname.includes("Admin")) {
      clickedItem = clickedItem.split("/")[0] + "/" + clickedItem.split("/")[1];
    } else {
      clickedItem = clickedItem.split("/")[0];
    }

    setselected(clickedItem);
  }, []);

  // let getProfileData = () => {
  //   let cookie = localStorage.getItem("cookie");

  //   var myHeaders = new Headers();
  //   myHeaders.append("x-api-key", cookie);

  //   var requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,
  //     redirect: "follow",
  //   };

  //   fetch(
  //     "https://easyviews.herokuapp.com/Api/v1/Users/Account/Profile",
  //     requestOptions
  //   )
  //     .then((response) => response.json())
  //     .then((result) => {
  //       localStorage.setItem("userObject", JSON.stringify(result.Response));
  //       setloaded(true);
  //       setData(result.Response);
  //     })
  //     .catch((error) => console.log("error", error));
  // };

  let sendVerification = () => {
    let cookie = localStorage.getItem("cookie");

    var myHeaders = new Headers();
    myHeaders.append("x-api-key", cookie);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://easyviews.herokuapp.com/Api/v1/Users/Account/SendVerification",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <SidebarDiv visible={isMenuVisible}>
      {!userData.Verified && isNotVerifiedVisible && (
        <div className="verify">
          <p>Your account is unverified</p>
          <button
            onClick={() => {
              setTimeout(() => {
                setisNotVerifiedVisible(false);
              }, 1000);
              sendVerification();
            }}
          >
            Send Verification
          </button>
        </div>
      )}

      <div
        onClick={() => setIsMenuvisible(!isMenuVisible)}
        className="toggleMenu"
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="logo">
        <Image src={logo} />
      </div>
      <div className="menu-container">
        <div className="account-details">
          {/* <p className="account-name">{userData.Email}</p> */}
          <p> Type: {userData.AccountType}</p>
          <p>Credits: {userData.Credits}</p>
          <button
            onClick={() => {
              setTimeout(() => {
                localStorage.clear();
                sessionStorage.clear();
                props.setlogout(true);
              }, 2000);
            }}
            className="logout"
          >
            <p>Logout</p>
          </button>
        </div>

        <div className="menu">
          <p className="main-menu-text">Main menu</p>

          <div className="menu-items">
            <ul>
              {menuItem.map((item) => {
                return (
                  <Link href={"/dashboard/" + item.name} key={item.name}>
                    <li
                      key={item.name}
                      style={
                        item.name == selected
                          ? { borderRight: "2px solid #192377" }
                          : { opacity: "0.2" }
                      }
                      value={item.name}
                      onClick={() => {
                        setselected(item.name);
                        setIsMenuvisible(!isMenuVisible);
                      }}
                    >
                      <div className="img">
                        <Image src={item.img} />
                      </div>{" "}
                      <p>{item.name}</p>
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
        </div>

        {userData.AccountType == "Staff" && (
          <div className="menu">
            <p className="main-menu-text admin">Admin menu</p>

            <div className="menu-items">
              <ul>
                {adminItem.map((item) => {
                  return (
                    <Link
                      href={"/dashboard/Admin/" + item.name}
                      key={item.name}
                    >
                      <li
                        key={item.name}
                        style={
                          "Admin/" + item.name == selected
                            ? { borderRight: "2px solid #192377" }
                            : { opacity: "0.2" }
                        }
                        value={item.name}
                        onClick={() => {
                          setselected("Admin/" + item.name);
                          setIsMenuvisible(!isMenuVisible);
                        }}
                      >
                        <div className="img">
                          <Image src={item.img} />
                        </div>{" "}
                        <p>{item.name}</p>
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </SidebarDiv>
  );
};

export default Sidebar;
