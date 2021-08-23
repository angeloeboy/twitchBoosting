import { motion } from "framer-motion";
import styled from "styled-components";

const Div = styled.div`
  margin-top: 50px;

  h3 {
    font-size: 20px;
  }

  .panels {
    display: flex;
    width: 100%;
    justify-content: space-between;
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 66px;
    padding: 0px 21px;
    padding-bottom: 21px;
    border-bottom: 1px solid #0e0e0e;
    p {
      font-weight: 400;
      color: #535353;
    }

    .date {
      text-align: right;
    }

    @media (max-width: 550px) {
      padding: 0px;
    }
  }

  @media (max-width: 677px) {
    .main-orders {
      overflow-x: scroll;

      .panels,
      .orders {
        min-width: 400px;
      }
    }
  }
`;

const Log = styled.div`
  user-select: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  padding: 24px 21px;
  justify-content: space-between;
  transition: all 0.3s ease;
  margin-top: 16px;
  align-items: center;
  &:hover {
    background-color: #0e0e0e;
    border-radius: 12px;
  }

  .date {
    text-align: right;
  }

  @media (max-width: 998px) {
    font-size: 14px;

    .id {
      width: 100px;
      display: flex;
      p {
        display: inline-block;
        word-break: break-all;
      }
    }
  }

  @media (max-width: 550px) {
    padding-left: 0px;
    padding-right: 0px;
  }

  @media (max-width: 440px) {
    font-size: 12px;

    .id {
      width: 70px;
    }
  }
`;

let OrderLog = (props) => {
  return (
    <Div>
      <h3>Order Log</h3>

      <div className="main-orders">
        <div className="panels">
          <p>Content</p>
          <p className="date">Date</p>
        </div>

        <div className="orders">
          {props.Log.map((log, index) => {
            return (
              <div key={index} onClick={() => getSpecificGc(subscription._id)}>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {
                      opacity: 0,
                    },
                    visible: {
                      opacity: 1,
                      transition: {
                        delay: 0.2,
                      },
                    },
                  }}
                >
                  <Log>
                    <p>{log.Content}</p>
                    <p className="date">{log.Date}</p>
                  </Log>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </Div>
  );
};

export default OrderLog;
