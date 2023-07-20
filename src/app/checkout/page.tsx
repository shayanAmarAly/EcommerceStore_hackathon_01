"use client"
import Image from 'next/image'
import {use} from "react"

const cartProducts = async () => {
  const response = await fetch("http://localhost:3000/api/cart", {
    method: "GET"
  })
  return response.json();
}

const json_response = cartProducts();

const page = () => {
const abc = use(json_response);
  return (
    <div>
      <div className="card card-side bg-base-100 shadow-xl">
        <figure><Image src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" width={70} height={100} alt="Movie" /></figure>
        <div className="card-body">
          <h2 className="card-title">{abc.message1[0].title}New movie is released!</h2>
          <p>{abc.message1[0].price}Click the button to watch on Jetflix app.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Watch{abc.message1[0].image}</button>
          </div>
        </div>
      </div>
    </div> 
  )
}

export default page

