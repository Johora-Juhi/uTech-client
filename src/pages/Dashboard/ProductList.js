import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";


const ProductList = () => {
  
  const [size, setSize] = useState(8);
  const [page, setPage] = useState(0);

  const { data: productsData = { products: [], count: 0 }, refetch, isError, isLoading } = useQuery({
    queryKey: ["products", size, page],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/products?page=${page}&size=${size}`);
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

  return (
    <div class="flex flex-col justify-center items-center h-full w-full ">
      <div class="w-full max-w-7xl mx-auto rounded-lg  bg-white shadow-lg border border-gray-200">
        <header class="px-5 py-4 border-b border-gray-100">
          <div class="font-semibold text-gray-800">Products</div>
        </header>

        <div class="overflow-x-auto p-3">
          <table class="table-auto w-full">
            <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              <tr>
                <th>#</th>
                <th class="p-2">
                  <div class="font-semibold text-center">Product Name</div>
                </th>
                <th class="p-2">
                  <div class="font-semibold text-left">Brand</div>
                </th>
                <th class="p-2">
                  <div class="font-semibold text-left">In Stock</div>
                </th>
                <th class="p-2">
                  <div class="font-semibold text-left">Price</div>
                </th>
                <th class="p-2">
                  <div class="font-semibold text-center">Action</div>
                </th>
              </tr>
            </thead>

            <tbody class="text-sm divide-y divide-gray-100">
              {products.map((product) => (
                
                <tr>
                  {console.log(product)}
                  <td class="p-2">
                    <input type="checkbox" class="w-5 h-5" value="id-1" />
                  </td>
                  <td class="p-2">
                    <div class="font-medium text-gray-800">{product.model}</div>
                  </td>
                  <td class="p-2">
                    <div class="text-left capitalize">{product.brand}</div>
                  </td>
                  <td class="p-2">
                    <div class="text-left">
                      {product.status ? (
                        <p className="text-green-500 font-medium">Available</p>
                      ) : (
                        <p className="text-red-500 font-medium">Stock out</p>
                      )}
                    </div>
                  </td>
                  <td class="p-2">
                    <div class="text-left font-medium text-indigo-500">
                      {product.price}
                    </div>
                  </td>
                  <td class="p-2">
                    <div class="flex justify-center">
                      <button
                        // onClick={() => removeProduct(_id)}
                      >
                        <svg
                          class="w-8 h-8 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
               ))} 
            </tbody>
          </table>
        </div>
      </div>
    </div>
    // </section>
  );
};

export default ProductList;