"use client";
import Image from "next/image";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import Checkout from "@/app/checkout/page"
import { AppDispatch } from "@/app/store";
import CartData from "@/components/displayCheckoutProducts"
import FetchCartButton from "@/components/FetchCheckoutProducts"
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store';
import data from "@/app/counter/checkoutSlice"
import { fetchCheckoutData } from "@/app/counter/checkoutSlice"
import { fetchCartData } from "@/app/counter/counterSlice"
import { increaseQuantity, decreaseQuantity } from '@/app/counter/checkoutSlice';

export default function Product() {
  const [item, setItem] = useState({
    name: "Apple AirPods",
    description: "Latest Apple AirPods.",
    image:
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80",
    quantity: 0,
    price: 999,
  });
  const dispatch = useDispatch<AppDispatch>();
  const {data, loading} = useSelector((state: RootState) => state.checkout);


  const publishableKey = process.env
    .NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string;
  const stripePromise = loadStripe(publishableKey);

  const createCheckOutSession = async () => {
    const stripe = await stripePromise;
    const checkoutSession = await fetch(
      "http://localhost:3000/api/create-stripe-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({data}),
      }
    );

    console.log("Result------------- in prod page==========", checkoutSession);

    const sessionID = await checkoutSession.json();
    const result = await stripe?.redirectToCheckout({
      sessionId: sessionID,
    });
    if (result?.error) {
      alert(result.error.message);
    }
  };
  
  const changeQuantity = (value: number) => {
    setItem({ ...item, quantity: Math.max(0, value) });
  };

  const onQuantityPlus = () => {
    changeQuantity(item.quantity + 1);
  };
  const onQuantityMinus = () => {
    changeQuantity(item.quantity - 1);
  };
  const onInputChange = (e: { target: { value: string } }) => {
    changeQuantity(parseInt(e.target.value));
  };

  const handleIncreaseQuantity = (productId: number) => {
    dispatch(increaseQuantity({ productId }));
    console.log("product with id",productId, "increase")
  };

  const handleDecreaseQuantity = (productId: number) => {
    dispatch(decreaseQuantity({ productId }));
    console.log("product with id",productId, "decrease")
  };
  
  const deleteCartItem = async (productId: any) => {
    console.log("method triggered with productID",productId);
    const response = await fetch(`http://localhost:3000/api/cart?productId=${productId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log("product is deleted and the response you got is ", response);
    dispatch(fetchCheckoutData());
    dispatch(fetchCartData());
    return response.json();
  }

  const totalPrice = data.reduce((total, product) => {
    console.log(typeof data[0].price)
    return total + product.price * 1;
  }, 0);

  useEffect(() => {
    dispatch(fetchCheckoutData());
  }, [dispatch]);

  return (
    <div>
      <h1 className='text-3xl text-black font-bold'>Shopping Cart</h1>
      {
        (data) ? (
          <div className="tablet:flex justify-between mt-20">
            <div className=' w-[1000px] mx-auto '>
              {
                data.map((value: any, id: number) => {
                  return <div key={id}>
                    <div className=' flex hover:shadow-lg tablet:w-[800px] mobile:w-[600px] gap-5 mt-5 '>
                      <div>
                        <img className='w-[200px]' src={value.image} />
                      </div>
                      <div className='space-y-2'>
                        <h1 className='text-xl '>{value.title}</h1>
                        <p className='text-gray-400 text-xl'>Sweater</p>
                        <h2 className='text-lg text-gray-500  '>XS Size</h2>
                        <h1 className='font-bold'>Delivery Estimation</h1>


                        <h1 className='text-yellow-500 font-bold mt-2'>5 Working Days

                        </h1>
                        <h1 className='font-bold text-xl mt-3'>${value.price}</h1>
                      </div>
                      <button> <RiDeleteBin6Line className="text-2xl ml-44 " onClick={() => deleteCartItem(value.id)} />
                        <div className='flex space-x-4 ml-16 mt-32'>
                          <button
                            // onClick={onQuantityMinus} 
                            onClick={() => handleDecreaseQuantity(value.id)}
                            className='text-2xl  rounded-full w-10 h-10 shadow-lg'
                          > - </button>
                          <input type="number" className="text-xl mt-2" onChange={onInputChange} value={value.quantity} />
                          <button 
                          // onClick={onQuantityPlus}
                          onClick={() => handleIncreaseQuantity(value.id)}
                            className='text-2xl  rounded-full w-10 h-10 shadow-lg'> + </button>
                        </div>
                      </button>
                    </div>
                  </div>
                })
              }
            </div>
            <div className=' mobile:w-[230px]'>
              <h1 className='text-2xl font-bold'>Order Summary</h1>

              <div className='flex justify-between mt-5' >
                <p>Quantity</p>
                <p>{data.length}Product/s</p>
              </div>
              <div className='flex justify-between mt-3'  >
                <p>Price</p>
                <p>${totalPrice}</p>
              </div>

              <button
          disabled={data.length === 0}
          onClick={createCheckOutSession}
          className="bg-black text-white w-[240px] text-center py-2 font-semibold mt-5 disabled:cursor-not-allowed disabled:bg-blue-100"
        >
         {loading ? 'Processing...' : 'checkout to proceed'}
        </button>
            
            </div>

          </div>
        ) : (
          <div>{loading}</div>
        )
      }
    </div>
  );
}

{/* <div className="max-w-sm flex mx-auto mt-20">
      <div className="shadow-lg border rounded p-2 ">
        <Image src={item.image} width={300} height={150} alt={item.name} />
        <h2 className="text-2xl">$ {item.price}</h2>
        <h3 className="text-xl">{item.name}</h3>
        <p className="text-gray-500">{item.description}</p>
        <p className="text-sm text-gray-600 mt-1">Quantity:</p>
        <div className="border rounded">
          <button
            onClick={onQuantityMinus}
            className="bg-blue-500 py-2 px-4 text-white rounded hover:bg-blue-600"
          >
            -
          </button>
          <input
            type="number"
            className="p-2"
            onChange={onInputChange}
            value={item.quantity}
          />
          <button
            onClick={onQuantityPlus}
            className="bg-blue-500 py-2 px-4 text-white rounded hover:bg-blue-600"
          >
            +
          </button>
        </div>
        <p>Total: ${item.quantity * item.price}</p>
        <button
          disabled={item.quantity === 0}
          onClick={createCheckOutSession}
          className="bg-blue-500 hover:bg-blue-600 text-white block w-full py-2 rounded mt-2 disabled:cursor-not-allowed disabled:bg-blue-100"
        >
         {loading ? 'Processing...' : 'Buy'}
        </button>
      </div>
    
    </div> */}