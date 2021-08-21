import Image from "next/image";
import loadingImg from "../Images/loading.gif";
import styled from "styled-components";

let Div = styled.div`
  position: absolute;
  /* background-color: green; */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 30px;
`;

let Loading = () => {
  return (
    <Div>
      <Image src={loadingImg} />
    </Div>
  );
};

export default Loading;
