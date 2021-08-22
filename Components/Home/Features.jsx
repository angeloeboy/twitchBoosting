import styled from "styled-components";
import Image from "next/image";
import icon1 from "../../Images/icon-1.png";
const Feat = styled.div`
  padding-top: 105px;

  .title,
  .subtitle {
    text-transform: uppercase;
  }

  .subtitle {
    letter-spacing: 0.34em;

    color: #d1d1d1;
  }

  .title {
    font-weight: 500;
    font-size: 30px;

    span {
      font-weight: bold;
      color: #fd9a01;
    }
  }

  .texts {
    margin-top: 30px;
    font-size: 14px;
    font-weight: 300;
    line-height: 173%;
    max-width: 1006px;
  }

  .features-container {
    margin-top: 150px;
    display: flex;
    align-items: top;
    justify-content: space-between;
    padding-bottom: 67px;
    flex-wrap: wrap;
    .feature {
      text-align: center;
      max-width: 211px;
      margin-top: 40px;
      h3 {
        font-size: 18px;
        font-weight: 600;
        margin-top: 17px;
      }

      p {
        font-size: 14px;
        font-weight: 300;
        margin-top: 17px;
      }
    }

    @media (max-width: 1080px) {
      justify-content: center;

      .feature {
        margin: 0px 50px 40px 50px;
      }
    }
  }
`;

const Features = () => {
  return (
    <Feat>
      <div className="container">
        <p className="subtitle">What we offer</p>
        <h2 className="title">
          The most stable twitch viewer bot, <span>Guaranteed</span>
        </h2>

        <p className="texts">
          We&apos;re not kidding. You can compare if you&apos;d like. If
          you&apos;ve tried other Twitch viewer bots, you&apos;ll know, they
          fluctuate a lot, and it&apos;s annoying. They typically sell it as
          &quot;fluctuation looks normal&quot; or &quot;we do it to make it look
          natural&quot;, but we know that&apos;s a lie. We know that their
          Twitch viewer bot is just unstable. Our viewbot, though, none of that!
          We have worked hard to make sure the delivery you ask for is the
          delivery you get, and especially on smaller Twitch channels,
          you&apos;ll notice the solid, stable delivery.
        </p>

        <div className="features-container">
          <div className="feature">
            <Image src={icon1} alt="Feature icon 1" />
            <h3>Lorem Ipsum</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc,
              vestibulum vitae condimentum ullamcorper urna vitae morbi. In
              commodo eget sed tempus elementum pellentesque.{" "}
            </p>
          </div>

          <div className="feature">
            <Image src={icon1} alt="Feature icon 2" />
            <h3>Lorem Ipsum</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc,
              vestibulum vitae condimentum ullamcorper urna vitae morbi.
            </p>
          </div>

          <div className="feature">
            <Image src={icon1} alt="Feature icon 3" />
            <h3>Lorem Ipsum</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc,
            </p>
          </div>

          <div className="feature">
            <Image src={icon1} alt="Feature icon 4" />
            <h3>Lorem Ipsum</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc,
              vestibulum vitae condimentum ullamcorper urna vitae morbi. In
              commodo eget sed tempus
            </p>
          </div>
        </div>
      </div>
    </Feat>
  );
};

export default Features;
