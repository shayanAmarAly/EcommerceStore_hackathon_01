"use client"
import { createClient } from "next-sanity";
import Link from "next/link";
import { stringify, v4 as uuidv4 } from 'uuid';
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { use } from "react";
// import axios from "axios";
import {client} from "../../../sanity/lib/client";
// const client = createClient({
//     projectId: "ii8xdbt3",
//     dataset: "production",
//     apiVersion: "2023-06-24",
//     useCdn: false
// });

// export async function getAxiosData(id: any, productID: any, userID: any, productNAME: any, productPRICE: any, productIMAGE: any, productCategory: any) {
//     const respones = await axios.post("/api/newproducts", {
//         id: id,
//         userID: userID,
//         productID: productID,
//         productName: productNAME,
//         price: productPRICE,
//         image: productIMAGE,
//         category: productCategory
//     })
//     console.log(respones);
// }


export async function abc() {
    const response = await client.fetch(`*[_type == "product" && product_category == "kids"]{
        _id, title, Price, sub_category, "image": product_image.asset->url
    }`);
    return response;
}

const kidsProducts = abc();


const page = () => {
    const products = use(kidsProducts);
    const uuid = uuidv4().slice(20);
    const { userId } = useAuth();
    console.log(products);
    return (
        // <div className='grid grid-cols-[auto,auto,auto,auto] justify-center gap-10 mt-10'>
        //     <div>
        //          <div>
        //              <h1 className='text-blue-700 font-bold text-sm text-center mt-32'>PRODUCTS</h1>
        //              <h1 className='text-4xl font-bold text-center'>Check What We Have
        //              </h1>
        //          </div>
        //          <div className='grid mobile:grid-cols-1  tablet:grid-cols-3 max-w-[900px] mx-auto mt-10 '>
        //            {data && data.map((product: any, id: any) => {
        //                 <div className=' hover:scale-125 duration-1000 mt-5 mobile:ml-3 tablet:ml-0' key={id}>
        //                     <Image src={product.image} alt='logo' className=' h-80 bg-cover ' />
        //                     <h1 className='font-semibold text-lg py-3'>{product.sub_category}</h1>
        //                     <h1 className='text-xl font-bold'>${product.price}</h1>
        //                 </div>
        //             })
        //             }
        //         </div>
        //    </div>
        // </div>
        <div className="grid grid-cols-[auto,auto,auto,auto] justify-center gap-10 mt-10">
            <div>
                <div>
                    <h1 className='text-blue-700 font-bold text-sm text-center mt-32'>PRODUCTS</h1>
                    <h1 className='text-4xl font-bold text-center'>Check What We Have
                    </h1>
                </div>
                <div className='grid mobile:grid-cols-1  tablet:grid-cols-3 max-w-[900px] mx-auto mt-10 '>
                    {
                        products.map((product: any, id: any) => {
                            return <div className='mt-5 mobile:ml-3 tablet:ml-0' key={id}>
                                <Image src={product.image} alt='logo' className='h-80 bg-cover ' width={200} height={100} />
                                <h2 className="card-title">{product.title}</h2>
                                <h1 className='font-semibold text-lg py-3'>{product.sub_category}</h1>
                                <h1 className='text-xl font-bold'>${product.Price}</h1>
                            </div>
                        })
                    }

                </div>
            </div>
        </div>
    )
}

export default page

// "use client"
// import Link from "next/link";
// import { v4 as uuidv4 } from 'uuid';
// import Image from "next/image";
// import { useAuth } from "@clerk/nextjs";
// import client from "@/lib/sanityConnect";
// import { useEffect, useState } from "react";



// export async function postContent(id: any, productID: any, userID: any, productNAME: any, productPRICE: any, productIMAGE: any, productCategory: any) {
//     const request = await fetch("http://localhost:3000/api/newproducts", {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             id: id,
//             userID: userID,
//             productID: productID,
//             productName: productNAME,
//             price: productPRICE,
//             image: productIMAGE,
//             category: productCategory
//         })
//     })
//     console.log(request);
//     return request;
// }

// type Data = {
//     _id: number;
//     title: string;
//     price: string;
//     sub_category: string;
//     image: string;
// };

// export async function abc() {
//     const response = await client.fetch(`*[_type == "product" && product_category == "female"]{
//         _id, title, price, sub_category, "image": product_image.asset->url
//     }`);
//     return response;
// }

// const respond = abc;

// const page = async () => {
//     const [data, setData] = useState<Data[]>();
//     const uuid = uuidv4().slice(20);
//     const { userId } = useAuth();
//     const products = await respond();
//     console.log(products);
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await client.fetch(`*[_type == "product" && product_category == "female"]{
//                 _id, title, price, sub_category, "image": product_image.asset->url
//             }`);
//                 const jsonData = await response.json();
//                 console.log(jsonData)
//                 setData(jsonData);
//             } catch (error) {
//                 console.log('Error fetching data:', error);
//             }
//         };

//         fetchData();
//         if (data === null) {
//             return <div>Loading...</div>;
//         }

//     }, []);
//     return (
//         <div className='grid grid-cols-[auto,auto,auto,auto] justify-center gap-10 mt-10'>
//            <div>
//                 <div>
//                     <h1 className='text-blue-700 font-bold text-sm text-center mt-32'>PRODUCTS</h1>
//                     <h1 className='text-4xl font-bold text-center'>Check What We Have
//                     </h1>
//                 </div>
//                 <div className='grid mobile:grid-cols-1  tablet:grid-cols-3 max-w-[900px] mx-auto mt-10 '>
//                     {data && data.map((product: any, id: any) => {
//                         <div className=' hover:scale-125 duration-1000 mt-5 mobile:ml-3 tablet:ml-0' key={id}>
//                             <Image src={product.image} alt='logo' className=' h-80 bg-cover ' />
//                             <h1 className='font-semibold text-lg py-3'>{product.sub_category}</h1>
//                             <h1 className='text-xl font-bold'>${product.price}</h1>
//                         </div>
//                     })
//                     }
//                 </div>
//            </div>
//         </div>
//     )

// }

// export default page





