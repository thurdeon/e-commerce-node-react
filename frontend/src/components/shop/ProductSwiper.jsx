import {Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

function ProductSwiper({ products }) {
  return (
    <Swiper
      slidesPerView={products.length > 2 ? 4 : 2}
      spaceBetween={products.length > 2 ? 30 : 10}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="mySwiper"
    >
      {products.map((product) => {
        const productPrice = Math.ceil(product.price);
        return (
          <SwiperSlide key={product.id} className="shadow-2xl">
            <div className="flex flex-col justify-between bg-white md:h-72 h-52 w-40 items-center">
              <div className="md:h-52 md:w-44 h-16 w-32">
                <Link relative="path" to={`/shop/product/${product.id}`}>
                  <img src={product.image} alt={product.title} />
                </Link>
              </div>
              <div className="bg-white w-40 h-20 ml-5">
                <Link relative="path" to={`/shop/product/${product.id}`}>
                  <p className="line-clamp-2 text-bold">{product.title}</p>
                </Link>
                <p className="text-sky-700 font-bold">{`GHS ${productPrice}`}</p>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default ProductSwiper;