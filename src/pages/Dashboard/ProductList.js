import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import './products.css'


const ProductList = () => {

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
  const removeProduct = id => {
    fetch(`https://utech-server-johora-juhi.vercel.app/products/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success('Sucessfully removed')
        }
      })
  }
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
              {products.map((product, index) => (

                <tr>
                  <td class="p-2">
                    <div class="text-center capitalize">{index + 1}</div>

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
                      <label
                        // onClick={() => removeProduct(_id)}
                        htmlFor="confirmation-modal"
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
                      </label>
                      <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
                      <div className="modal">
                        <div className="modal-box">
                          <h3 className="font-bold text-lg">Are you sure you want to delete!</h3>
                          <p className="py-4">If you delete ${product.model}. It can not be done!</p>
                          <div className="modal-action">
                            <form method="dialog">
                              <label onClick={() => removeProduct(product._id)} htmlFor="confirmation-modal" className="btn mr-2">delete</label>
                              <label htmlFor="confirmation-modal" className='btn btn-outline'>Close</label>
                            </form>

                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div class="footer-tools px-4 py-3" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div class="list-items">
              Show
              <select onChange={handleSelectChange} style={{ marginLeft: "7px", marginRight: "7px", border: "2px solid #005967" }}>
                <option value="8" selected>8</option>
                <option value="12" >12</option>
                <option value="16">16</option>
                <option value="20">20</option>
              </select>
              entries
            </div>
            <div class="pagination mb-0">
              {[...Array(pages).keys()].map((number) => (
                <button
                  key={number}
                  className={page === number ? "w-[26px] h-[26px] bg-indigo-500 text-white" : "w-[26px] h-[26px] bg-gray-300"}
                  onClick={() => setPage(number)}
                >
                  {number + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    // </section>
  );
};

export default ProductList;
