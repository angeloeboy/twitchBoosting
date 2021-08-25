import { useEmblaCarousel } from "embla-carousel/react";
import styled from "styled-components";
import Image from "next/image";
import userImg from "../../Images//user.jpg";
import { useCallback, useEffect, useRef, useState } from "react";
const Div = styled.div`
  .embla {
    overflow: hidden;
  }
  .embla__container {
    display: flex;
  }
  .embla__slide {
    position: relative;
    flex: 0 0 100%;
    width: 500px;
    color: white;
  }
`;

const Review = styled.div`
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  margin-top: 55px;

  .img-container {
    display: block;

    div {
      border-radius: 50%;
    }
  }

  .name {
    margin-top: 34px;
  }

  .review {
    margin-top: 20px;
  }
`;

const Carousel = () => {
  const [emblaRef] = useEmblaCarousel();
  const btnRef = useRef("");

  const [viewportRef, embla] = useEmblaCarousel({
    loop: true,
    skipSnaps: false,
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  const [number, setNumber] = useState(1);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  const onScroll = useCallback(() => {
    if (!embla) return;
    const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
    setScrollProgress(progress * 100);
  }, [embla, setScrollProgress]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    onScroll();
    embla.on("select", onSelect);
    embla.on("scroll", onScroll);

    // Start scrolling slowly
    const engine = embla.dangerouslyGetEngine();
    engine.scrollBody.useSpeed(1);
    setTimeout(() => {
      console.log("test");
    }, 100);
    engine.scrollTo.index(embla.scrollSnapList().length + number);
  }, [embla, onSelect, onScroll, number]);

  useEffect(() => {
    setTimeout(() => {
      console.log(number + 1);
      setNumber(number + 1);
    }, 5000);
  }, [number]);

  let reviews = [
    {
      Name: "John McQueen",
      Text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem illum dolore obcaecati laborum sequi, ullam quis deserunt soluta magni a odit possimus minima incidunt beatae. Earum vel ratione distinctio iure?",
      Image: userImg,
    },
    {
      Name: "Mercy McQueen",
      Text: "Lorem, ipsum dolor sit amet consectetur laborum sequi, ullam quis deserunt soluta magni a odit possimus minima incidunt beatae. Earum vel ratione distinctio iure?",
      Image: userImg,
    },
    {
      Name: "Christoper McQueen",
      Text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut obcaecati laborum sequi, ullam quis deserunt soluta magni a odit possimus minima incidunt beatae. Earum vel ratione distinctio iure?",
      Image: userImg,
    },
    {
      Name: "Michael McQueen",
      Text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem illum dolore obcaecati laborum sequi, ullam quis deserunt soluta magni a odit possimus minima incidunt beatae. Earum vel ratione  iure?",
      Image: userImg,
    },
  ];

  return (
    <Div>
      <div className="embla" ref={viewportRef}>
        <div className="embla__container">
          {reviews.map((review) => {
            return (
              <div className="embla__slide" key={review.Name}>
                <Review>
                  <div className="img-container">
                    <Image src={review.Image} alt="Reviewer's Image" />
                  </div>
                  <h4 className="name">{review.Name}</h4>
                  <p className="review">{review.Text}</p>
                </Review>
              </div>
            );
          })}
        </div>
      </div>
    </Div>
  );
};

export default Carousel;
