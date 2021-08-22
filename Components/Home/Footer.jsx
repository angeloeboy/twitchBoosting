import styled from "styled-components";
import Image from "next/image";

import logo from "../../Images/logo.png";
const Div = styled.div`
  padding: 61px 0px;
  background-color: #192377;
  color: white;

  .text {
    width: 100%;
    max-width: 300px;
    font-size: 14px;
    font-weight: 200;
    margin-top: 20px;
  }

  @media (max-width: 500px) {
    text-align: center;

    .text {
      margin: 0 auto;
      margin-top: 20px;
    }
  }
`;

let Footer = () => {
  return (
    <Div>
      <div className="container">
        <div className="img-container">
          <Image src={logo} alt="Logo" />
        </div>

        <div className="text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et eu sed
          natoque faucibus lobortis aliquet bibendum magna egestas.
        </div>
      </div>
    </Div>
  );
};

export default Footer;
