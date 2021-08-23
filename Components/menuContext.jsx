import { createContext, useState, useEffect } from "react";

export const MenuContext = createContext();

export const MenuProvider = (props) => {
  const [profileData, setProfileData] = useState("");

  let getProfileData = () => {
    let cookie = localStorage.getItem("cookie");

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
        console.log(result.Response);
        localStorage.setItem("userObject", JSON.stringify(result.Response));
        setProfileData(result.Response);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    let data = localStorage.getItem("userObject");
    setProfileData(JSON.parse(data));
  }, []);

  return (
    <MenuContext.Provider value={[profileData, setProfileData, getProfileData]}>
      {props.children}
    </MenuContext.Provider>
  );
};
