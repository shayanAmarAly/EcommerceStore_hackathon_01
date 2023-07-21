"use client"
import React, { useEffect } from 'react';
import Link from 'next/link';
import { UserButton } from "@clerk/clerk-react";
import { BsCartCheck } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import FetchCartButton from '@/components/FetchCartButton';
import CartData from '@/components/displayData';
import { fetchCartData } from '@/app/counter/counterSlice';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from "@clerk/nextjs";
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useAuth();
  console.log("user id is all the way come from navbar ", userId);
  if (!userId){
    deleteCookie('useriid', {path: '/'}); 
  }
  setCookie('useriid', `${userId}`, {maxAge: 60 * 60 * 24 }); 

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  return (
    <div className='bg-white grid grid-cols-4 gap-3 place-items-center mx-12 items-center mt-10 justify-center'>

      <div>
        <Link href={"http://localhost:3000"}>
          <img src='https://full-stack-ecommerce-clothing-web.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FLogo.3267fed8.png&w=256&q=75' />
        </Link>
      </div>
      <div className='link space-x-8 text-[1vw] tablet:block '>
        <Link href="http://localhost:3000/female">Female</Link>
        <Link href="http://localhost:3000/male">Male</Link>
        <Link href="http://localhost:3000/kids">Kids</Link>
        <Link href="http://localhost:3000/allproducts">All Products</Link>
      </div>
      <div className='ml-44 border  tablet:ml-44  border-gray-400 rounded-md w-80 flex p-1'><CiSearch />  <input type='text' className='pl-1 text-xs' placeholder='What you looking for?' /></div>

      <div className='flex align-top'>
        <div className='px-5'>
          {
            !userId ? (<Link href={"http://localhost:3000/sign-in"}><FaUserCircle/></Link>) : (<UserButton />)
          }
        </div>
        <Link href="http://localhost:3000/checkoutProduct">
          <div className='flex py-3'>
            <BsCartCheck className='tablet:block hidden' />
            <CartData />
          </div>
        </Link>
        {/* <FetchCartButton /> */}
        {/* <h5 className='px-1'>{cartLength ? (cartLength) : (
        <span className="loading loading-dots loading-sm"></span>

      )}</h5> */}
      </div>
      <div>
      </div>
    </div>
  )
}

export default Navbar;