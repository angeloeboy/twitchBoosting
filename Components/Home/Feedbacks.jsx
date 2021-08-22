import styled from "styled-components";
import Image from "next/image";

const Div = styled.div`
  background: linear-gradient(283.19deg, #192377 0%, #3244da 99.3%);
  padding: 100px 0px;
  .title,
  .subtitle {
    text-transform: uppercase;
  }

  .subtitle {
    letter-spacing: 0.34em;
    color: #d1d1d1;
  }

  .title {
    font-weight: bold;
    font-size: 30px;
    color: white;
  }
`;

const Feedback = () => {
  return (
    <Div>
      <div className="container">
        <div className="text-container">
          <p className="subtitle">Feedbacks</p>
          <h2 className="title">See what our clients tell about us</h2>
        </div>
      </div>
    </Div>
  );
};

export default Feedback;
