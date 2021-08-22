import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

const Div = styled.div`
  display: grid;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

let Verify = () => {
  const router = useRouter();
  const { VerificationCode } = router.query;
  const [verified, setverified] = useState(false);
  const [error, seterror] = useState(false);
  const [errText, seterrText] = useState("initialState");

  useEffect(() => {
    if (VerificationCode != undefined) {
      console.log(VerificationCode);
      verify(VerificationCode);
    }
  }, [VerificationCode]);

  let verify = (code) => {
    let cookie = localStorage.getItem("cookie");

    var myHeaders = new Headers();
    myHeaders.append("x-api-key", cookie);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://easyviews.herokuapp.com/Api/v1/Users/Account/verify/" + code,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        if (result.Error > 0) {
          seterror(true);
          seterrText(result.ErrorMessage);
        } else {
          setverified(true);
        }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <Div>
      {verified && (
        <div>
          <p>Your account is now verified</p>
        </div>
      )}
      {error && (
        <div>
          <p>{errText}</p>
        </div>
      )}
    </Div>
  );
};

export default Verify;
