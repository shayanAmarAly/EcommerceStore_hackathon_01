import { UsersTable, db, User, NewUser } from "@/lib/drizzle";
import { NextRequest, NextResponse } from "next/server";
import { eq, like } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { auth } from '@clerk/nextjs';
import { getCookie } from "cookies-next";


const newEntry: NewUser = {
  id: 1,
  userid: "13",
  productid: "P003",
  title: "trouser Product",
  price: 30,
  image: "trouser.jpg",
};

export async function GET(req: NextRequest) {
  // const retrive = await db.select().from(UsersTable);
  const abc = req.cookies.get('useriid');
  console.log("cookies are ",abc?.value);
  // const response = NextResponse.next();
  // // const cookie = setCookie("useriid", `${}`);
  // const cookie = getCookie("useriid")?.valueOf();
  //   console.log(response.cookies.get('useriid'));
    const retrive = await db.select().from(UsersTable).where(eq(UsersTable.userid, `${abc?.value}`));
  console.log("get request is triggered...",retrive);
  return NextResponse.json({message1: retrive})
}




export async function POST(req: NextRequest, res: NextResponse) {
  const { id, userid, productid, title, price, image } = await req.json();

  const responseObject: NewUser = {
    id: id,
    userid: userid,
    productid: productid,
    title: title,
    price: price,
    image: image,
  };
  const sendData = await db.insert(UsersTable).values(responseObject).returning();

  // Then set a cookie
  // res.cookies.set({
  //   name: 'userid',
  //   value: userid,
  //   httpOnly: true,
  //   maxAge: 3600,
  // })

  return NextResponse.json({message1: sendData})

  // return NextResponse.json({
  //   message1: sendData,
  // });
}

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  // if (req.method !== 'DELETE') {
  //   res.status(405).json({ message: 'Method Not Allowed' });
  //   return;
  // }

  //   const url = req.nextUrl.searchParams;
  let productID: String | null;
  if (typeof (req.nextUrl.searchParams.get("productId")) == "string") {
    productID = req.nextUrl.searchParams.get("productId");
  }
  // const pID = String(productID)

  const deletedProduct = await db.delete(UsersTable)
    .where(eq(UsersTable.id, productID))
    .returning({ name: UsersTable.title });

  //   const response = await db.delete(UsersTable).where(eq(productId, `${url}`));
  return NextResponse.json({
    message: deletedProduct
  })
};

