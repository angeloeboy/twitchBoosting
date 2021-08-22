import styled from "styled-components";

let Div = styled.div`
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
      /* margin-top: 20px; */
      font-size: 16px;
      padding-left: 10px;
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
