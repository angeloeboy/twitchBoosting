import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

import menu from "../Images/menu.svg";
import { useEffect, useState } from "react";

import logo from "../Images/logo.png";

const Navigation = styled.nav`
  position: fixed;
  width: 100%;
  z-index: 999;
  /* background-color: #192377; */
  background-color: ${(props) =>
    props.pos == "top" ? "transparent" : "#192377"};
  transition: all 0.4s ease-in-out;
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 10%;
    color: white;
    max-width: 1980px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 33% 66%;

    .menu {
      display: none;
    }

    .logo-container {
      width: 80px;

      display: grid;
    }

    @media (max-width: 1064px) {
      position: relative;
      .menu {
        display: block;
        position: absolute;
        right: 10%;
      }
    }
  }
`;

const Linksbtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  display: grid;
  grid-template-columns: 50% 50%;
  .links {
    text-align: center;
    ul {
      li {
        list-style-type: none;
        display: inline-block;
        margin: 0px 17px;
        font-size: 1rem;
      }
    }
  }

  .button-containers {
    text-align: right;
    button {
      padding: 10px 40px;
      font-size: 14px;
      border: 2px solid #203298;
      font-weight: 300;
      border-radius: 5px;
      cursor: pointer;
    }

    .login {
      background-color: #203298;
      color: white;
    }

    .signup {
      background-color: transparent;
      color: white;
      margin-left: 18px;
    }
  }

  @media (max-width: 1064px) {
    position: absolute;
    height: 100vh;
    top: 0;
    background-color: #121a5a;
    right: 0;
    transition: all 0.5s ease-in-out;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    width: 100vw;
    max-width: 400px;
    right: ${(props) => (props.isclicked ? "0%" : "-100%")};
    .links {
      margin-top: 50%;
      ul {
        li {
          display: block;
          margin-bottom: 20px;
          font-size: 2rem;
        }
      }
    }
    .button-containers {
      text-align: center;
    }
  }
`;

const Nav = () => {
  const [pos, setPos] = useState("top");

  useEffect(() => {
    document.addEventListener("scroll", (e) => {
      let scrolled = document.scrollingElement.scrollTop;
      if (scrolled >= 4) {
        setPos("moved");
      } else {
        setPos("top");
      }
      // console.log(scrolled);
    });
  }, []);

  const [isclicked, setClicked] = useState(false);

  let toggleMenu = () => {
    setClicked(!isclicked);
    console.log(isclicked);
  };
  return (
    <Navigation pos={pos}>
      <div className="container">
        <div className="logo-container">
          <Image src={logo} alt="Easyviews Logo" />
        </div>
        <Linksbtn className="links-btn" isclicked={isclicked}>
          <div className="links">
            <ul>
              <li>
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/prices">
                  <a>Prices</a>
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/faq">
                  <a>Faq</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="button-containers">
            <Link href="/login">
              <a>
                <button className="login">Log in</button>
              </a>
            </Link>
            <Link href="/register">
              <a>
                <button className="signup">Sign Up</button>
              </a>
            </Link>
          </div>
        </Linksbtn>

        <div className="menu">
          <Image
            src={menu}
            alt="Menu icon"
            height={35}
            width={35}
            onClick={() => toggleMenu()}
          />
        </div>
      </div>
    </Navigation>
  );
};

export default Nav;
