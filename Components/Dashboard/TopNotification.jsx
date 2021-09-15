import styled from "styled-components";
import { motion } from "framer-motion";

let Div = styled.div`
  position: absolute;
  background-color: red;
  text-align: center;
  /* 
  .success {
   
  } */
`;

const Success = styled.div`
  position: fixed;
  top: 20px;
  background-color: ${(props) => (props.error ? "red" : "green")};
  padding: 20px 30px;
  border-radius: 10px;
  left: 50%;
  transform: translateX(-50%);

  .message {
    color: white;
    margin-top: 0px;
    font-size: 16px;
    text-align: center;
  }

  @media (max-width: 1250px) {
    top: 100px;
  }
`;

let TopNotification = (props) => {
  return (
    <Div>
      <Success className="success" error={props.error}>
        <p className="message">
          {props.text} {props.error}
        </p>
      </Success>
    </Div>
  );
};

export default TopNotification;
