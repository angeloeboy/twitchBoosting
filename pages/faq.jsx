import styled from "styled-components";
import arrow from "../Images/arrow.png";
import Image from "next/image";
import { useState } from "react";
import Nav from "./../Components/Nav";
import Head from "next/head";

const FaqPage = styled.section`
  min-height: 100vh;
  background-color: #192377;
  padding-bottom: 100px;

  .container {
    padding-top: 95px;
    color: white;
    .title {
      margin-top: 45px;
      text-align: center;
      color: white;
      font-weight: 700;
      font-size: 40px;
    }

    .subtitle {
      font-weight: 300;
      text-align: center;
      margin-top: 23px;
    }

    .faq-container {
      margin-top: 79px;
      width: 100%;

      .question {
        /* padding: 21px;
        background: #212b77;
        margin-bottom: 25px;
        border-radius: 15px;
        box-shadow: 0px 0px 13px rgba(0, 0, 0, 0.25);
        position: relative;

        &:hover {
          background-color: #1c256b;
        }

        .question-title {
          font-size: 1rem;
          font-weight: 600;
          width: 80%;
          margin: 0 auto;
        }

        .question-answer {
          margin: 0 auto;
          margin-top: 37px;
          font-size: 14px;
          width: 80%;
        }

        .hidden {
          display: none;
        }

        .img-container {
          position: absolute;
          right: 5%;
          top: 49%;
          transform: translateY(-50%) rotate(180deg);
        } */
      }

      .clicked {
        background-color: pink;
      }
    }
  }
`;

const QuestionTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  width: 80%;
  margin: 0 auto;
`;

const QuestionAnswer = styled.p`
  margin: 0 auto;
  margin-top: 37px;
  font-size: 14px;
  width: 80%;
`;

const Question = styled.div`
  padding: 21px;
  background-color: #18226a;
  margin-bottom: 25px;
  border-radius: 15px;
  box-shadow: 0px 0px 13px rgba(0, 0, 0, 0.25);
  position: relative;
  background-color: ${(props) => (props.isVisible ? "pink" : "#212b77")};
  cursor: pointer;

  &:hover {
    background-color: #1c256b;
  }

  .question-title {
    font-size: 1rem;
    font-weight: 600;
    width: 80%;
    margin: 0 auto;
  }

  .question-answer {
    margin: 0 auto;
    margin-top: 37px;
    font-size: 14px;
    width: 80%;
    /* font-family: "Roboto", sans-serif; */
    /* letter-spacing: 2px; */
  }

  .hidden {
    display: none;
  }

  .img-container {
    position: absolute;
    right: 5%;
    top: 30px;
    transform: rotate(180deg);
  }
`;

const Faq = () => {
  const [answerVisible, setanswerVisible] = useState(false);
  const questions = [
    {
      Question: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      Answer:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio expedita officiis nemo accusamus illum sunt libero dolores veniam eos delectus iure consequuntur, quisquam qui, reiciendis provident consectetur, nulla autem maiores Maiores quae sit provident vitae enim dolorum, deleniti exercitationem ex sapiente nisi blanditiis harum illum ducimus repellendus, inventore tempore placeat quos facere velit! Vel accusamus harum, eius ipsa numquam nostrum.",
      Clicked: false,
      Id: "1",
    },

    {
      Question:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim excepturi molestias aperiam fugiat magnam quasi earum possimus! Consequatur, ex porro delectus ab quis aliquam sed id repudiandae consectetur? Temporibus, eius.",
      Answer:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio expedita officiis nemo accusamus illum sunt libero dolores veniam eos delectus iure consequuntur, quisquam qui, reiciendis provident consectetur, nulla autem maiores Maiores quae sit provident vitae enim dolorum, deleniti exercitationem ex sapiente nisi blanditiis harum illum ducimus repellendus, inventore tempore placeat quos facere velit! Vel accusamus harum, eius ipsa numquam nostrum.",
      Clicked: false,
      Id: "2",
    },

    {
      Question:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim excepturi molestias aperiam fugiat magnam quasi earum possimus! Consequatur, ex porro delectus ab quis aliquam eius.",
      Answer:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio expedita officiis nemo accusamus illum sunt libero dolores veniam eos delectus iure consequuntur, quisquam qui, reiciendis provident consectetur, nulla autem maiores Maiores quae sit provident vitae enim dolorum, deleniti exercitationem ex sapiente nisi blanditiis harum illum ducimus repellendus, inventore tempore placeat quos facere velit! Vel accusamus harum, eius ipsa numquam nostrum.",
      Clicked: false,
      Id: "3",
    },
    {
      Question:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim excepturi molestias aperiam fugiat magnam quasi earum possimus! Consequatur, ex porro delectus ab quis aliquam eius.",
      Answer:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio expedita officiis nemo accusamus illum sunt libero dolores veniam eos delectus iure consequuntur, quisquam qui, reiciendis provident consectetur, nulla autem maiores Maiores quae sit provident vitae enim dolorum, deleniti exercitationem ex sapiente nisi blanditiis harum illum ducimus repellendus, inventore tempore placeat quos facere velit! Vel accusamus harum, eius ipsa numquam nostrum.",
      Clicked: false,
      Id: "4",
    },
    {
      Question:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim excepturi molestias aperiam fugiat magnam quasi earum possimus! Consequatur, ex porro delectus ab quis aliquam eius.",
      Answer:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio expedita officiis nemo accusamus illum sunt libero dolores veniam eos delectus iure consequuntur, quisquam qui, reiciendis provident consectetur, nulla autem maiores Maiores quae sit provident vitae enim dolorum, deleniti exercitationem ex sapiente nisi blanditiis harum illum ducimus repellendus, inventore tempore placeat quos facere velit! Vel accusamus harum, eius ipsa numquam nostrum.",
      Clicked: false,
      Id: "5",
    },
    {
      Question:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim excepturi molestias aperiam fugiat magnam quasi earum possimus! Consequatur, ex porro delectus ab quis aliquam eius.",
      Answer:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio expedita officiis nemo accusamus illum sunt libero dolores veniam eos delectus iure consequuntur, quisquam qui, reiciendis provident consectetur, nulla autem maiores Maiores quae sit provident vitae enim dolorum, deleniti exercitationem ex sapiente nisi blanditiis harum illum ducimus repellendus, inventore tempore placeat quos facere velit! Vel accusamus harum, eius ipsa numquam nostrum.",
      Clicked: false,
      Id: "6",
    },
    {
      Question:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim excepturi molestias aperiam fugiat magnam quasi earum possimus! Consequatur, ex porro delectus ab quis aliquam eius.",
      Answer:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio expedita officiis nemo accusamus illum sunt libero dolores veniam eos delectus iure consequuntur, quisquam qui, reiciendis provident consectetur, nulla autem maiores Maiores quae sit provident vitae enim dolorum, deleniti exercitationem ex sapiente nisi blanditiis harum illum ducimus repellendus, inventore tempore placeat quos facere velit! Vel accusamus harum, eius ipsa numquam nostrum.",
      Clicked: false,
      Id: "7",
    },
  ];
  // const [questionsList, setquestionsList] = useState(questions);
  const [clickedID, setclickedID] = useState(null);

  return (
    <>
      <Nav />

      <FaqPage>
        <Head>
          <title>Easyviews | Faq</title>
          <meta
            name="description"
            content="Have a question? Read our frequently asked question."
          ></meta>
          <meta property="og:title" content="Easyviews | Faq" />
          <meta property="og:type" content="website" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1.0"
          ></meta>
        </Head>
        <div className="container">
          <h1 className="title">Faq</h1>
          <p className="subtitle">
            Have a question? Read our frequently asked questions.
          </p>

          <div className="faq-container">
            {questions.map((question) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <Question
                  key={question.Id}
                  onClick={() => {
                    setclickedID(question.Id);
                  }}
                  style={
                    question.Id === clickedID
                      ? { backgroundColor: " #1c256b" }
                      : { backgroundColor: "#18226A" }
                  }
                >
                  <h2 className="question-title">{question.Question}</h2>
                  <p
                    className="question-answer hidden"
                    style={
                      question.Id === clickedID
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    {question.Answer}
                  </p>
                  <div
                    className="img-container"
                    style={
                      question.Id === clickedID
                        ? { transform: "translateY(-50%) rotate(270deg)" }
                        : { transform: "translateY(-50%) rotate(180deg)" }
                    }
                  >
                    <Image src={arrow} alt="Arrow" />
                  </div>
                </Question>
              );
            })}
          </div>
        </div>
      </FaqPage>
    </>
  );
};

export default Faq;
