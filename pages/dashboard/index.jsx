/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import styled from "styled-components";
import MainDashboard from "../../Components/Dashboard/main-dashboard";
import Sidebar from "../../Components/Dashboard/sidebar";
import { MenuProvider } from "../../Components/menuContext";
import { useRouter } from "next/router";

const DashBoard = styled.div`
  display: flex;
`;

let Dashboard = () => {
  const [cookieFromLocal, setcookieFromLocal] = useState("");
  const router = useRouter();

  useEffect(() => {
    let cookie = localStorage.getItem("cookie");
    setcookieFromLocal(cookie);

    router.push("/dashboard/Orders");
  }, []);

  return (
    <DashBoard>
      <MainDashboard />
    </DashBoard>
  );
};

export default Dashboard;
