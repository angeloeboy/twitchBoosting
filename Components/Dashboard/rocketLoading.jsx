import loadingRocket from "../../Images/rocketLoading.gif";
import Image from "next/image";
import styled from "styled-components";

let Div = styled.div`
  width: 100;
  background-color: green;
  position: relative;
  .img-container {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 20%;
  }
`;

let RocketLoading = () => {
  return (
    <Div>
      <div className="img-container">
        <Image src={loadingRocket} alt="loading" />
      </div>
    </Div>
  );
};

export default RocketLoading;
