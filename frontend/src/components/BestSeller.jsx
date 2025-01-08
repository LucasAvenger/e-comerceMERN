import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from '../components/ProductItem'

const BestSeller = () => {
    /*função para bestseller*/
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const bestProduct = products.filter((item) => (item.bestseller));
        setBestSeller(bestProduct.slice(0, 1))
    }, [products])


    return (
        <div className='my-10'>
            <div className='text-center text-3x1 py-8'>
                <Title text1={'MAIS'} text2={'VENDIDAS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    camisas legais que o reinaldo recomenda
                </p>
            </div>
            {/** repassando bestseller */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    bestSeller.map((item, index) => (
                        <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
                    ))
                }
            </div>
        </div>
    )
}

export default BestSeller