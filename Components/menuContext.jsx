import { createContext, useState, useEffect } from "react";

export const MenuContext = createContext();

export const MenuProvider = (props) => {
  const [profileData, setProfileData] = useState("");

  useEffect(() => {
    let data = localStorage.getItem("userObject");
    setProfileData(JSON.parse(data));
  }, []);

  return (
    <MenuContext.Provider value={[profileData, setProfileData]}>
      {props.children}
    </MenuContext.Provider>
  );
};
