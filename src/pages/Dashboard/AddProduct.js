import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const imageHostKey = process.env.REACT_APP_imgbb_key;

  const submit = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    // host image 
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        // if successfull post product 
        if (imgData.success) {
          const product = {
            model: data.model,
            brand: data.brand,
            status: data.status === "true" ? true : false,
            price: data.price,
            keyFeature: [
              data.keyFeature1,
              data.keyFeature2,
              data.keyFeature3,
              data.keyFeature4,
            ],
            spec: [],
          };
          fetch("http://localhost:5000/products", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((data) =>
              toast.success('Successfully added!')
            );
          navigate("/dashboard");
        }
      });
  };
  return (
    <div className="flex justify-center items-center h-full ">
      <form
        className="shadow-lg p-10 rounded-md flex flex-wrap gap-3 max-w-3xl justify-between bg-white"
        onSubmit={handleSubmit(submit)}
      >
        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-2 text-start" htmlFor="model">
            Model
          </label>
          <input type="text" id="model" {...register("model", {
            required: "Model is required"
          })}
          />
          {Object.keys(errors).length ? (
            <>
              {errors.model ? (
                <>
                  <p style={{ color: 'red', fontSize: '13px', letterSpacing: '1.5px', width: "auto", pointerEvents: "none", paddingTop: "8px", textAlign: "start" }}>{errors.model?.message}</p>
                </>
              ) : (
                <>
                </>
              )}
            </>
          ) : <></>}
        </div>


        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-2 text-start" htmlFor="brand">
            Brand
          </label>
          <select name="brand" id="brand" {...register("brand", {
            required: "Brand is required"
          })}
          >
            <option value="amd">AMD</option>
            <option value="intel">Intel</option>
          </select>
          {Object.keys(errors).length ? (
            <>
              {errors.brand ? (
                <>
                  <p style={{ color: 'red', fontSize: '13px', letterSpacing: '1.5px', width: "auto", pointerEvents: "none", paddingTop: "8px", textAlign: "sta" }}>{errors.brand?.message}</p>
                </>
              ) : (
                <>
                </>
              )}
            </>
          ) : <></>}
        </div>

        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-2 text-start" htmlFor="price">
            Price
          </label>
          <input type="text" name="price" id="price" {...register("price", {
            required: "Price is required",
          })}
          />
          {Object.keys(errors).length ? (
            <>
              {errors.price ? (
                <>
                  <p style={{ color: 'red', fontSize: '13px', letterSpacing: '1.5px', width: "auto", pointerEvents: "none", paddingTop: "8px", textAlign: "start" }}>{errors.price?.message}</p>
                </>
              ) : (
                <>
                </>
              )}
            </>
          ) : <></>}
        </div>
        <div className="flex flex-col w-full max-w-xs">
          <h1 className="mb-2 text-start">Availability</h1>
          <div className="flex gap-9">
            <div>
              <input
                type="radio"
                id="available"
                checked
                value={true}
                {...register("status", {
                  required: "Status is required"
                })}
              />
              <label className="ml-2" htmlFor="available">
                Available
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="stockOut"
                name="status"
                value={false}
                {...register("status", {
                  required: "Status is required"
                })}
              />
              <label className="ml-2" htmlFor="stockOut">
                Stock out
              </label>
            </div>

          </div>
          {Object.keys(errors).length ? (
            <>
              {errors.status ? (
                <>
                  <p style={{ color: 'red', fontSize: '13px', letterSpacing: '1.5px', width: "auto", pointerEvents: "none", paddingTop: "8px", textAlign: "start" }}>{errors.status?.message}</p>
                </>
              ) : (
                <>
                </>
              )}
            </>
          ) : <></>}
        </div>

        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-2 text-start" htmlFor="keyFeature1">
            Key Feature 1
          </label>
          <input
            type="text"
            name="keyFeature1"
            id="keyFeature1"
            {...register("keyFeature1", {
              required: "Feature1 is required"
            })}
          />
          {Object.keys(errors).length ? (
            <>
              {errors.keyFeature1 ? (
                <>
                  <p style={{ color: 'red', fontSize: '13px', letterSpacing: '1.5px', width: "auto", pointerEvents: "none", paddingTop: "8px", textAlign: "start" }}>{errors.keyFeature1?.message}</p>
                </>
              ) : (
                <>
                </>
              )}
            </>
          ) : <></>}
        </div>
        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-2 text-start" htmlFor="keyFeature2">
            Key Feature 2
          </label>
          <input
            type="text"
            name="keyFeature2"
            id="keyFeature2"
            {...register("keyFeature2", {
              required: "Feature2 is required"
            })}
          />
          {Object.keys(errors).length ? (
            <>
              {errors.keyFeature2 ? (
                <>
                  <p style={{ color: 'red', fontSize: '13px', letterSpacing: '1.5px', width: "auto", pointerEvents: "none", paddingTop: "8px", textAlign: "start" }}>{errors.keyFeature2?.message}</p>
                </>
              ) : (
                <>
                </>
              )}
            </>
          ) : <></>}
        </div>
        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-2 text-start" htmlFor="keyFeature3">
            Key Feature 3
          </label>
          <input
            type="text"
            name="keyFeature3"
            id="keyFeature3"
            {...register("keyFeature3", {
              required: "Feature3 is required"
            })}
          />
          {Object.keys(errors).length ? (
            <>
              {errors.keyFeature3 ? (
                <>
                  <p style={{ color: 'red', fontSize: '13px', letterSpacing: '1.5px', width: "auto", pointerEvents: "none", paddingTop: "8px", textAlign: "start" }}>{errors.keyFeature3?.message}</p>
                </>
              ) : (
                <>
                </>
              )}
            </>
          ) : <></>}
        </div>
        <div className="flex flex-col w-full max-w-xs">
          <label className="mb-2 text-start" htmlFor="keyFeature4">
            Key Feature 4
          </label>
          <input
            type="text"
            name="keyFeature4"
            id="keyFeature4"
            {...register("keyFeature4", {
              required: "Feature4 is required"
            })}
          />
          {Object.keys(errors).length ? (
            <>
              {errors.keyFeature4 ? (
                <>
                  <p style={{ color: 'red', fontSize: '13px', letterSpacing: '1.5px', width: "auto", pointerEvents: "none", paddingTop: "8px", textAlign: "start" }}>{errors.keyFeature4?.message}</p>
                </>
              ) : (
                <>
                </>
              )}
            </>
          ) : <></>}
        </div>
        <div className="flex flex-col w-full col-span-2">
          <label className="mb-2 text-start" htmlFor="image">
          </label>
          <input type="file" name="image" id="image" {...register("image", {
            required: "Image is required"
          })}
          />
          {Object.keys(errors).length ? (
            <>
              {errors.image ? (
                <>
                  <p style={{ color: 'red', fontSize: '13px', letterSpacing: '1.5px', width: "auto", pointerEvents: "none", paddingTop: "8px", textAlign: "start" }}>{errors.image?.message}</p>
                </>
              ) : (
                <>
                </>
              )}
            </>
          ) : <></>}
        </div>
        <div className="flex justify-between items-center w-full">
          <button
            className=" px-4 py-2 bg-indigo-500 rounded-0 font-semibold text-white text-lg hover:bg-indigo-300 disabled:bg-gray-500"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
