import React from "react";
import Banner from "./Banner";
import Section from "./Section";
import Product from "./Product";
import ProductHotBuy from './ProductHotBuy'
import ProductNew from './ProductNew'
import Blog from "./Blog";


export default function MainHome() {
  return (
    <>
      <Banner />
      <Section />
      <Product />
      <ProductHotBuy></ProductHotBuy>
      <ProductNew></ProductNew>
      <Blog />
    </>
  );
}
