import styled from "styled-components";
import { useState, useEffect } from "react";
import stars from "../Images/stars-login.png";
import Image from "next/image";
import Link from "next/link";
import { uid, suid } from "rand-token";
import { useRouter } from "next/router";
import spinner from "../Images/spinner.gif";
import { motion } from "framer-motion";
import Head from "next/head";
import TopNotification from "./../Components/Dashboard/TopNotification";

const Div = styled.div`
  display: flex;
  .greetings {
    background: linear-gradient(180deg, #192377 0%, #2735a9 100%);
    width: 40%;
    height: 100vh;
    color: white;
    padding: 100px 5%;
    position: relative;
    display: inline-block;

    .texts {
      position: absolute;
      bottom: 100px;
      width: 70%;
    }
  }

  .loginform {
    width: 60%;
    display: inline-block;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #e5e5e5;

    .form {
      h2 {
        font-weight: bold;
        font-size: 40px;
        color: #192377;
        text-align: center;
      }

      p {
        font-weight: 300;
        font-size: 14px;
        text-align: center;
        margin-top: 25px;
        color: #192377;
      }

      form {
        margin-top: 25px;
        input {
          display: block;
          width: 100%;
          padding: 8px 23px;
          border: 2px solid #192377;
          outline: #192377;
          background-color: transparent;
          color: #192377;
          margin-top: 8px;
        }

        label {
          font-weight: bold;
          font-size: 14px;
          color: #192377;
          margin-top: 50px;
          &:nth-child(2) {
            margin-top: 27px;
            display: block;
          }
        }

        .forgotPass {
          text-align: right;
          font-weight: 400;
          font-size: 14px;
        }

        .submit {
          background-color: #192377;
          font-weight: bold;
          transition: all 0.4s ease;
          &:hover {
            background-color: #2332bd;
          }

          input {
            color: white;
            font-size: 16px;
          }

          .spinner {
            width: 50px;
            margin: 0 auto;
          }
        }
      }
    }
  }

  @media (max-width: 1000px) {
    flex-flow: column;

    .greetings {
      display: none;
    }

    .loginform {
      width: 100%;
      height: 100vh;

      .form {
        width: 100%;
        max-width: 400px;
      }
    }
  }

  @media (max-width: 420px) {
    .loginform {
      .form {
        width: 80%;
        margin: 0 auto;
      }
    }
  }
`;

let ResetPassword = () => {
  const router = useRouter();
  const { VerificationCode } = router.query;

  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);

  const [succesfullPassReset, setsuccesfullPassReset] = useState(false);
  useEffect(() => {
    if (VerificationCode != undefined) {
      console.log(VerificationCode);
    }
  }, [VerificationCode]);

  let handlePassChange = (e) => {
    setPassword(e.target.value);
  };

  let resetPassword = (e) => {
    e.preventDefault();

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      VerificationCode: VerificationCode,
      Password: password,
    });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://easyviews.herokuapp.com/Api/v1/Account/ForgotPassword/ResetPassword",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        if (result.Error == 0) {
          setsuccesfullPassReset(true);
        }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <Div>
      <Head>
        <title>Easyviews | Login</title>
        <meta name="description" content="Login to Easyviews "></meta>
        <meta
          property="og:title"
          content="Easyviews | Boost your Twitch Channel"
        />
        <meta property="og:type" content="website" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0"
        ></meta>
      </Head>

      <div className="greetings">
        <div className="img-container">
          <Image src={stars} alt="Stars" />
        </div>
        <div className="texts">
          <h1>Welcome Back!</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae
            lacus, nulla mauris vel. Purus lacus ut nullam rhoncus. Proin a ut
            sit tempus libero. Convallis volutpat nunc urna, eu ornare.
          </p>
        </div>
      </div>

      <div className="loginform">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {
              opacity: 0,
              transform: "translateX(100%)",
            },
            visible: {
              opacity: 1,
              transform: "translateX(0%)",
              transition: {
                delay: 0.2,
              },
            },
          }}
        >
          <div className="form">
            <h2>Password Reset</h2>
            <form onSubmit={(e) => resetPassword(e)}>
              <label htmlFor="" className="password">
                Password
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => handlePassChange(e)}
                  required
                />
                <div className="submit">
                  {loading ? (
                    <div className="spinner">
                      <Image src={spinner} alt="loading" />
                    </div>
                  ) : (
                    <input type="submit" value="Submit" />
                  )}
                </div>
              </label>
            </form>
            <p>
              Dont have an account?{" "}
              <Link href="/register">
                <a>Sign up</a>
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {succesfullPassReset && (
        <TopNotification text={"Password Reset Success!"} />
      )}
    </Div>
  );
};

export default ResetPassword;
