import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../util/http";
import ShopLoader from "./ShopLoader";
import ErrorComponent from "../common/Error";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

function ProductCarousel({ featured }) {
  const {productId} = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts({ featured }),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20 mb-20">
        <ShopLoader number={2} />;
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-20 mb-20">
        <ErrorComponent
          title={"product could not load"}
          message={"try again later"}
        />
      </div>
    );
  }
  
  console.log('product id', productId)
  const recommendedProducts = data.filter(product=>product.id != productId);
  

  return (
    <>
    
    <div className="hidden md:block mr-32 ml-32">
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {recommendedProducts.map((product) => {
          
          return (
            <SwiperSlide
              key={product.id}
              className="bg-red-500 h-32 text-white"
            >
              {product.title} 
            </SwiperSlide>
          );
        })}
      </Swiper>
      </div>

      <div className="block md:hidden ml-5 mr-5">
      
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {recommendedProducts.map((product) => {
          const productPrice = Math.ceil(product.price);
          
          return (
            <SwiperSlide key={product.id} className="shadow-2xl">
              <div className="flex flex-col justify-between bg-white h-52 w-40  items-center">
                <div className="h-16 w-32">
                <Link relative="path" to={`/shop/product/${product.id}`}>  <img src={product.image} alt={product.title} /></Link>
                </div>
                <div className="bg-white w-40 h-20 ml-5">
                  <Link relative="path" to={`/shop/product/${product.id}`}><p className="line-clamp-2 text-bold">{product.title}</p></Link>
                  <p className="text-sky-700 font-bold">{`GHS ${productPrice}`}</p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      </div>
    </>
  );
}

export default ProductCarousel;
