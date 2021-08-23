import styled from "styled-components";
import Orders from "../../pages/dashboard/Orders";
import Sidebar from "./sidebar";
import { useState, useEffect, useContext } from "react";
import { MenuProvider } from "../menuContext";
import { motion } from "framer-motion";
import router from "next/router";
import { MenuContext } from "./../menuContext";
import Image from "next/image";

import loading from "../../Images/rocketLoading.gif";

const Div = styled.div`
  min-height: 100vh;
  background-color: #070707;
  width: 100%;
  color: white;

  overflow-x: hidden;
  display: flex;

  .children {
    width: 100%;
    padding: 40px;
    margin-left: 20%;

    @media (max-width: 1250px) {
      margin-left: 10%;
    }

    @media (max-width: 1250px) {
      margin-top: 65px;
      margin-left: 0px;
    }

    @media (max-width: 550px) {
      padding: 40px 5%;
    }
  }

  .loading {
    /* position: relative; */
    /* background-color: red; */
    width: 100%;
    display: grid;
    align-items: center;
    justify-items: center;
    .img-container {
      /* position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%); */
    }
  }
`;

let MainDashboard = ({ children }) => {
  const [visible, setvisible] = useState(false);
  const [logout, setlogout] = useState(false);

  useEffect(() => {
    let cookie = localStorage.getItem("cookie");

    if (sessionStorage.getItem("loggedIn") == null) {
      if (cookie == null) {
        setvisible(false);
        router.push("/login");
      } else {
        var myHeaders = new Headers();
        myHeaders.append("x-api-key", cookie);

        var requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        fetch(
          "https://easyviews.herokuapp.com/Api/v1/Users/Account/Profile",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            if (result.Error == 0) {
              setvisible(true);
              sessionStorage.setItem("loggedIn", "true");
              localStorage.setItem(
                "userObject",
                JSON.stringify(result.Response)
              );
            }
          })
          .catch((error) => console.log("error", error));
      }
    } else {
      setvisible(true);
    }
  }, [logout]);

  if (visible) {
    return (
      <MenuProvider>
        <Div>
          <Sidebar setlogout={setlogout} />
          <div className="children">
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
              {children}
            </motion.div>
          </div>
        </Div>
      </MenuProvider>
    );
  } else {
    return (
      <Div>
        <div className="loading">
          <div className="img-container">
            <Image src={loading} alt="Loading rocket" />
          </div>
        </div>
      </Div>
    );
  }
};

export default MainDashboard;
