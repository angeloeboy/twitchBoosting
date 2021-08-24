import styled from "styled-components";

let Div = styled.div`
  position: absolute;
  background-color: red;
  text-align: center;

  .success {
    position: fixed;
    top: 20px;
    background-color: green;
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
  }
`;

let TopNotification = (props) => {
  return (
    <Div>
      <div className="success">
        <p className="message"> {props.text} </p>
      </div>
    </Div>
  );
};

export default TopNotification;
