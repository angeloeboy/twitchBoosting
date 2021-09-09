import styled from "styled-components";
import { useState, useEffect } from "react";
import stars from "../Images/stars-login.png";
import Image from "next/image";
import Link from "next/link";
import { uid, suid } from "rand-token";
import { motion } from "framer-motion";
import Head from "next/head";
import logo from "../Images/logo.png";

import loadingImg from "../Images/loading.gif";
import { useRouter } from "next/router";

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

      img {
        cursor: pointer;
      }
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
          &:nth-child(2),
          &:nth-child(3) {
            margin-top: 27px;
            display: block;
          }
        }

        .submit {
          background-color: #192377;
          font-weight: bold;
          transition: all 0.4s ease;
          margin-top: 20px;
          &:hover {
            background-color: #2332bd;
          }

          input {
            color: white;
            font-size: 16px;
          }

          .spinner {
            width: 30px;
            margin-left: auto;
            margin-right: auto;
            padding-top: 8px;

            * {
              margin: 0px;
              padding: 0px;
            }
          }
        }

        .error {
          color: white;
          background-color: #ff000081;
          padding: 15px;
        }

        .success {
          color: #444444;
          background-color: #00ff4081;
          padding: 15px;
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
        width: 80%;
        max-width: 400px;
        margin: 0 auto;
      }
    }
  }
`;

let Register = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPass, setrepeatPass] = useState("");

  const [passError, setpassError] = useState(false);
  const [emailError, setemailError] = useState(false);
  const [regReady, setregReady] = useState(false);
  const [loaded, setloaded] = useState(false);

  const [error, seterror] = useState("");
  const [registerError, setregisterError] = useState(false);

  const [loading, setloading] = useState(false);

  const [registerSuccess, setregisterSuccess] = useState(false);
  const SITE_KEY = "6LeXW08cAAAAAMLCOwashvflc-RqMvyfz3aAes3R";

  useEffect(() => {
    setloading(false);
  }, [registerError, error]);

  let handleSubmit = (e) => {
    e.preventDefault();
    setloaded(true);
    setpassError(false);
    setemailError(false);
    seterror("");

    if (password != repeatPass) {
      setpassError(true);
    } else {
      setpassError(false);
    }

    if (!email.includes("@")) {
      setemailError(true);
    } else {
      setemailError(false);
    }
  };

  useEffect(() => {
    const loadScriptByURL = (id, url, callback) => {
      const isScriptExist = document.getElementById(id);

      if (!isScriptExist) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.id = id;
        script.onload = function () {
          if (callback) callback();
        };
        document.body.appendChild(script);
      }

      if (isScriptExist && callback) callback();
    };

    // load the script by passing the URL
    loadScriptByURL(
      "recaptcha-key",
      `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`,
      function () {
        console.log("Script loaded!");
      }
    );
  }, []);

  useEffect(() => {
    if (loaded) {
      if (!emailError && !passError) {
        setregReady(true);
      } else {
        setregReady(false);
      }
      console.log("loaded");
    }
  }, [emailError, passError, loaded]);

  useEffect(() => {
    if (regReady && loaded) {
      console.log(regReady);
      setloading(true);

      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(SITE_KEY, { action: "submit" })
          .then((token) => {
            let gToken = token;
            console.log(gToken);
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            let raw = JSON.stringify({
              Email: email,
              Password: password,
              Token: gToken,
            });

            let requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: raw,
              redirect: "follow",
            };

            fetch(
              "https://easyviews.herokuapp.com/Api/v1/Account/Register",
              requestOptions
            )
              .then((response) => response.json())
              .then((result) => {
                console.log(result);
                console.log(result.Error);

                if (result.Error > 0) {
                  seterror(result.ErrorMessage);
                  setregisterError(true);
                  setloaded(false);
                  setregReady(false);
                } else {
                  setloading(false);
                  seterror("");
                  console.log("you will be redirected to login");
                  setregisterSuccess(true);
                  sessionStorage.setItem("fromRegister", "true");

                  setTimeout(() => {
                    router.push("/login");
                  }, 3000);
                }
              })
              .catch((error) => console.log("error", error));
          });
      });
    } else {
      setloading(false);
    }
  }, [regReady]);

  let handleEmailChange = (e) => {
    setEmail(e.target.value);
    setloading(false);
  };

  let handlePassChange = (e) => {
    setPassword(e.target.value);
    setloading(false);
  };

  let handleRepeatPass = (e) => {
    setrepeatPass(e.target.value);
    setloading(false);
  };

  return (
    <Div>
      <Head>
        <title>Easyviews | Register</title>
        <meta
          name="description"
          content="Create an account to Easyviews "
        ></meta>
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
          <Link href={"/"} className="logo">
            <Image src={logo} />
          </Link>
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
            <h2>Sign up</h2>
            <p>We’re happy to see you back! Sign in to your account</p>

            <form onSubmit={(e) => handleSubmit(e)}>
              <label htmlFor="">
                Email
                <input
                  type="text"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => handleEmailChange(e)}
                />
              </label>

              <label htmlFor="" className="password">
                Password
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => handlePassChange(e)}
                />
              </label>

              <label htmlFor="" className="password">
                Repeat password
                <input
                  type="password"
                  placeholder="Enter password"
                  value={repeatPass}
                  onChange={(e) => handleRepeatPass(e)}
                />
              </label>

              <div className="submit">
                {loading ? (
                  <div className="spinner">
                    <Image src={loadingImg} alt="loading" />
                  </div>
                ) : (
                  <input type="submit" value="Sign up" />
                )}
              </div>

              {passError && <p className="error">{"Password doesn't match"}</p>}

              {emailError && (
                <p className="error">{"Please input a valid email"}</p>
              )}

              {registerSuccess && (
                <p className="success">
                  Register Success! You will be redirected in login.
                </p>
              )}

              {error !== "" && <p className="error">{error}</p>}
            </form>
            <p>
              Already have an account?{" "}
              <Link href="/login">
                <a>Log in</a>
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </Div>
  );
};

export default Register;
