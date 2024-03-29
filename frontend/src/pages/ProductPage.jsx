import { useParams } from "react-router-dom";
import Breadcrumbs from "../components/common/Breadcrumbs.jsx";

import ProductDetail from "../components/shop/ProductDetail.jsx";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../util/http.js";
import ShopLoader from "../components/shop/ShopLoader";
import ErrorComponent from "../components/common/Error";
import RelatedProducts from "../components/shop/products/RelatedProducts.jsx";
import { getProductData } from "../store/singleProductSlice.jsx";
import { useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";

function ProductPage() {
  const dispatch = useDispatch();

  
  // let productCategory = '';
  // let productData = [];

  // let ifo = 1; 
  // if (ifo) {
  //   const {productCategory, productData} = useSelector(state=>state.singleProduct);
  //   console.log(productCategory, productData);
  // }

  // useEffect(()=> {
  //   if (productCategory.length !==0 && productData.length!==0) {
  //     dispatch(getProductData({productData, productCategory}))
  //   }
  // }, [productData, productCategory])
  
  const { productId } = useParams();
  
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["item"],
    queryFn: () => fetchProduct({ productId }),
  });

  if (isLoading) {
    return(
    <div className="flex justify-center mt-20 mb-20">
    <ShopLoader number={1}/>;
    </div>)
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
    const productCategory = data[0].category;
    const productData = data;

    dispatch(getProductData({productData, productCategory}))
    
      
  
  return (
    <>
      <Breadcrumbs/>
      <ProductDetail />
      <h2 className="font-semibold m-5 md:text-center md:mb-10">Related Products</h2>
      <div className="md:mx-32">
      <RelatedProducts productCategory = {productCategory}/>
      </div>
    </>
  )
}

export default ProductPage;
