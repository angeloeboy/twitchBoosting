import styled from "styled-components";
import { useState, useEffect } from "react";
import stars from "../Images/stars-login.png";
import Image from "next/image";
import Link from "next/link";
import { uid, suid } from "rand-token";
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
          &:nth-child(2),
          &:nth-child(3) {
            margin-top: 27px;
            display: block;
          }
        }

        .submit {
          background-color: #192377;
          color: white;
          font-weight: bold;
          font-size: 16px;
          transition: all 0.4s ease;
          margin-top: 48px;
          &:hover {
            background-color: #2332bd;
          }
        }

        .error {
          color: red;
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
      }
    }
  }
`;

let Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPass, setrepeatPass] = useState("");
  const [passError, setpassError] = useState(false);
  const [emailError, setemailError] = useState(false);
  const [regReady, setregReady] = useState();
  const [loaded, setloaded] = useState(false);

  useEffect(() => {
    if (!emailError && !passError && loaded) {
      setregReady(true);
      if (regReady) {
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
          "https://easyviews.herokuapp.com/Api/v1/Account/Register",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
      }
    } else {
      setregReady(false);
    }
  }, [emailError, passError, regReady, loaded]);

  let handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  let handlePassChange = (e) => {
    setPassword(e.target.value);
  };

  let handleRepeatPass = (e) => {
    setrepeatPass(e.target.value);
  };

  let handleSubmit = (e) => {
    e.preventDefault();

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

    setloaded(true);
  };

  // let register = () => {

  // };

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
              <p className="error">
                {passError ? "Password doesn't match" : ""}
              </p>
              <p className="error">
                {emailError ? "Please input a valid email" : ""}
              </p>

              <input type="submit" value="Sign Up" className="submit" />
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
