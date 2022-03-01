import { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import axios from "axios";

import { TrendingCoins } from "../../config/api";
import { toCommaFormat } from "../../utils/toCommaFormat";

import "swiper/css";
import "swiper/css/autoplay";
import "./banner.css";

const Banner = () => {
  const [trending, setTrending] = useState([]);

  const fetchData = async () => {
    const { data } = await axios
      .get(TrendingCoins("usd"))
      .catch((err) => console.error(err));

    setTrending(data);
  };

  useEffect(() => {
    fetchData();

    return () => setTrending([]);
  }, []);

  return (
    <div className="banner">
      <Swiper
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        breakpoints={{
          640: {
            width: 640,
            slidesPerView: 2,
          },
          768: {
            width: 768,
            slidesPerView: 4,
          },
        }}
      >
        {trending.length > 0 &&
          trending.map((coin) => (
            <SwiperSlide key={coin.id}>
              <div className="crypto-thumb">
                <img src={coin.image} alt={coin.name} />
                <div className="crypto-thumb_desc">
                  <small>
                    {coin.symbol.toUpperCase()} &nbsp;
                    <span
                      className={
                        coin.price_change_percentage_24h >= 0
                          ? "increase"
                          : "decrease"
                      }
                    >
                      {coin.price_change_percentage_24h >= 0 && "+"}
                      {toCommaFormat(
                        coin.price_change_percentage_24h.toFixed(2)
                      )}
                      %
                    </span>
                  </small>
                  <br />
                  <strong>
                    USD {toCommaFormat(coin.current_price.toFixed(2))}{" "}
                  </strong>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Banner;
