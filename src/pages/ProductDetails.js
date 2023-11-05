import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ProductDetails = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const location = useLocation();
    const product = location.state;
    console.log(product.spec[0]);

    return (
        <div className='container mx-auto px-2 lg:px-20 py-20'>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className='px-10  order-12 lg:order-[0]'>
                    <h1 className='text-2xl lg:text-4xl font-semibold mb-8'>{product.model}</h1>
                    <h5 className='mb-7 lg:hidden text-base bg-indigo-100 border border-indigo-500 rounded-md inline px-5 py-3'> <span className='text-gray-400'>৳{product.price}</span> </h5>
                    <h2 className='font-semibold mt-10 mb-3 text-base lg:text-xl text-start text-indigo-500 border-l-4 pl-4 border-indigo-500'>Product Specification</h2>
                    <div className=''>
                            {
                                product.spec[2].ram &&
                                <div className='mb-5 pr-5'>
                                <h3 className='text-sm text-gray-500'>RAM</h3>
                                    <h4 className='font-semibold'>{product.spec[2].ram}</h4></div>
                            }
                        {
                            product.spec[0].processor &&
                            <div className='mb-5 px-5'>
                                <h3 className='text-sm text-gray-500'>Processor</h3>
                                <h4 className='font-semibold'>{product.spec[0].processor}</h4>
                            </div>
                        }
                        {
                            product.spec[1].motherboard &&
                            <div className='mb-5 px-5'>

                                <h3 className='text-sm text-gray-500'>Motherboard</h3>
                                <h4 className='font-semibold'>{product.spec[1].motherboard}</h4>
                            </div>
                        }

                        {
                            product.spec[3].graphics &&
                            <div className='px-5 mb-5'>
                                <h3 className='text-sm text-gray-500'>Graphics</h3>
                                <h4 className='font-semibold'>{product.spec[3].graphics}</h4>
                            </div>
                        }
                        {
                            product.spec[5].casing &&
                            <div className='px-5 b-5'>
                                <h3 className='text-sm text-gray-500'>Casing</h3>
                                <h4 className='font-semibold'>{product.spec[5].casing}</h4>
                            </div>
                        }


                    </div>
                    <h2 className='font-semibold mt-10 mb-3 text-base lg:text-xl text-start text-indigo-500 border-l-4 pl-4 border-indigo-500'>Condition</h2>
                    <div className=''>
                        <div className='mb-5 pr-5'>
                            <h3 className='text-sm text-gray-500'>Status</h3>
                            <h4 className='font-semibold'>{product.status ? "Avaiable" : "Stock Out "}</h4>
                        </div>
                        {
                            product.spec[4].storage &&

                            <div className='px-5 mb-5'>
                                <h3 className='text-sm text-gray-500'>Storage</h3>
                                <h4 className='font-semibold'>{product.spec[4].storage}</h4>
                            </div>

                        }
                        {
                            product.spec[7].cooler &&

                            <div className='px-5'>
                                <h3 className='text-sm text-gray-500'>Cooler</h3>
                                <h4 className='font-semibold'>{product.spec[7].cooler}</h4>
                            </div>

                        }


                    </div>

                </div>
                <div className='mx-auto'>
                    <img src={product.image} className='' alt="" />
                    <h2 className='text-xl font-semibold text-start text-indigo-500 border-l-4 pl-4 border-indigo-500 hidden lg:block'>Price: { product.price}$</h2>
                </div>
            </div>
        </div >
    );
};

export default ProductDetails;