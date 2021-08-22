/* eslint-disable react-hooks/exhaustive-deps */
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

let Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const [loading, setloading] = useState(false);
  const [forgotPassVisible, setforgotPassVisible] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (
      localStorage.getItem("cookie") !== null &&
      localStorage.getItem("cookie") !== ""
    ) {
      let cookie = localStorage.getItem("cookie");
      getProfileData(cookie);
      setloading(true);
      console.log(localStorage.getItem("cookie") !== "");
    }
  }, []);

  let handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  let handlePassChange = (e) => {
    setPassword(e.target.value);
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    setloading(true);

    if (!forgotPassVisible) {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let raw = JSON.stringify({
        Email: email,
        Password: password,
        Token: uid(12),
      });

      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "https://easyviews.herokuapp.com/Api/v1/Account/Login",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          localStorage.setItem("cookie", result.Response);
          let cookie = localStorage.getItem("cookie");

          if (result.Error == 0) {
            getProfileData(cookie);
          } else {
            setErr(true);
            setloading(false);
          }
        })
        .catch((error) => console.log("error", error));
    } else {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        Email: email,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "https://easyviews.herokuapp.com/Api/v1/Account/ForgotPassword/SendReset",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
        })
        .catch((error) => console.log("error", error));
    }
  };

  let getProfileData = (cookie) => {
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", cookie);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://easyviews.herokuapp.com/Api/v1/Users/Account/Profile",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result.Response);
        localStorage.setItem("userObject", JSON.stringify(result.Response));

        if (result.Error == 0) {
          router.push("/dashboard");
        }
      });
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
          {!forgotPassVisible && (
            <div className="form">
              <h2>Login</h2>
              <p>We’re happy to see you back! Sign in to your account</p>
              <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="">
                  Email
                  <input
                    type="text"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => handleEmailChange(e)}
                    required
                  />
                </label>

                <label htmlFor="" className="password">
                  Password
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => handlePassChange(e)}
                    required
                  />
                </label>

                <p
                  className="forgotPass"
                  onClick={(e) => {
                    e.preventDefault();
                    setforgotPassVisible(true);
                  }}
                >
                  <a href="">Forgot Password</a>
                </p>

                {err && <p>Incorrect email or password</p>}
                <div className="submit">
                  {loading ? (
                    <div className="spinner">
                      <Image src={spinner} alt="loading" />
                    </div>
                  ) : (
                    <input type="submit" value="Login" />
                  )}
                </div>
              </form>
              <p>
                Dont have an account?{" "}
                <Link href="/register">
                  <a>Sign up</a>
                </Link>
              </p>
            </div>
          )}

          {forgotPassVisible && (
            <div className="form">
              <h2>Forgot Password?</h2>
              <p>
                No worries! Enter your email and we will send you an email to
                reset.{" "}
              </p>
              <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="">
                  Email
                  <input
                    type="text"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => handleEmailChange(e)}
                    required
                  />
                </label>

                {err && <p>Incorrect email or password</p>}
                <div className="submit">
                  {loading ? (
                    <input type="submit" value="Sent!" />
                  ) : (
                    <input type="submit" value="Send" />
                  )}
                </div>
              </form>
              <p>
                Dont have an account?{" "}
                <Link href="/register">
                  <a>Sign up</a>
                </Link>
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </Div>
  );
};

export default Login;
