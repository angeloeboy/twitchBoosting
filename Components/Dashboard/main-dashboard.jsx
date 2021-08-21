import styled from "styled-components";
import Orders from "../../pages/dashboard/Orders";
import Sidebar from "./sidebar";
import { useState, useEffect } from "react";
import { MenuProvider } from "../menuContext";
import { motion } from "framer-motion";
import router from "next/router";

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
`;

let MainDashboard = ({ children }) => {
  const [visible, setvisible] = useState(false);

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
              console.log("testing testing");
            }
          })
          .catch((error) => console.log("error", error));
      }
    } else {
      setvisible(true);
    }
  }, []);

  if (visible) {
    return (
      <MenuProvider>
        <Div>
          <Sidebar />
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
      <div>
        <h1>Loading</h1>
      </div>
    );
  }
};

export default MainDashboard;
