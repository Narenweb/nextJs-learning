import React from "react";
import { format } from "date-fns";

async function getData() {
  //Mock api
  const res = await fetch( "https://668fa500c0a7969efd98d6ba.mockapi.io/api/product-cards/users")
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}
 

export default async function ProductPage({ users }) {
  const data = await getData()
  return (
    <>
      <div className=" flex justify-between flex-wrap">
        {data.map(
          (user, index) =>
            user.name && (
              <div
                key={index}
                className={`category-list rounded-lg px-8 bg-primaryColor z-10 mt-7 cursor-pointer py-5 mx-3 w-[300px] h-[300px] text-white flex flex-col gap-4`}
              >
                <p>Name : {user.name}</p>
                <p>Date: {format(new Date(user.createdAt), "yyyy-MM-dd")}</p>
                <p>Name : {user.city}</p>
                <p>Price : {user.Price}</p>
              </div>
            )
        )}
      </div>
    </>
  );
}
