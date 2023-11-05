import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useQuery } from "@tanstack/react-query";

const Home = () => {

  const [size, setSize] = useState(8);
  const [page, setPage] = useState(0);

  const { data: productsData = { products: [], count: 0 }, refetch, isError, isLoading } = useQuery({
    queryKey: ["products", size, page],
    queryFn: async () => {
      const res = await fetch(`https://utech-server-johora-juhi.vercel.app/products?page=${page}&size=${size}`);
      const data = await res.json();
      return data;
    }
  });

  const { products, count } = productsData;
  const pages = Math.ceil(count / size);
  console.log(products);
  const handleSelectChange = (event) => {
    const selectedValue = parseInt(event.target.value, 10);
    setSize(selectedValue);
    setPage(0)
  };
  const [stock, setStock] = useState(false);
  const [brands, setBrands] = useState([]);

  const toggleStock = () => {
    setStock(!stock);
    console.log(stock);
  };

  const toggleBrand = (brand) => {
    if (brands.includes(brand)) {
      setBrands(brands.filter((b) => b !== brand));
    } else {
      setBrands([...brands, brand]);
    }
  };
  const activeClass = "text-white  bg-indigo-500 border-white";

  let content;

  if (isLoading) {
    content = <h1>Loading.....</h1>;
  }

  if (isError) {
    content = <h1>Something went wrong</h1>;
  }

  if (products.length) {
    content = products.map((product) => (
      <ProductCard key={product._id} product={product}></ProductCard>
    ));
  }

  if (products.length && (stock || brands.length)) {
    content = products
      .filter((product) => {
        if (stock) {
          return product.status === true;
        }
        return product;
      })
      .filter((product) => {
        if (brands.length) {
          return brands.includes(product.brand);
        }
        return product;
      })
      .map((product) => (
        <ProductCard key={product._id} product={product}></ProductCard>
      ));
  }
  return (
    <div className="max-w-7xl gap-14 mx-auto my-10">
      <div className="mb-10 flex justify-end gap-5">
        <button
          onClick={toggleStock}
          className={`border px-3 py-2 rounded-full font-semibold ${stock ? activeClass : null
            } `
          }
        >
          In Stock
        </button>
        <button
          onClick={() => toggleBrand("amd")}
          className={`border px-3 py-2 rounded-full font-semibold ${brands.includes("amd") ? activeClass : null
            }`}
        >
          AMD
        </button>
        <button
          onClick={() => toggleBrand("intel")}
          className={`border px-3 py-2 rounded-full font-semibold ${brands.includes("intel") ? activeClass : null
            }`}
        >
          Intel
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl gap-14 mx-auto my-10">
        {content}
      </div>
      <div className="pagination d-flex justify-content-center ">

        {[...Array(pages).keys()].map((number) => (
          <button
            key={number}
            className={page === number ? "w-[26px] h-[26px] bg-indigo-500 text-white" : "w-[26px] h-[26px] bg-gray-300"}
            onClick={() => setPage(number)}
          >
            {number + 1}
          </button>
        ))}
        <select onChange={handleSelectChange} className=" border border-grey-300 h-[26px]">

          <option value="8" selected>8</option>
          <option value="12">
            12
          </option>1
          <option value="16">16</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
  );
};

export default Home;
