'use client'

import { useEffect, useState } from "react";

export default function Home() {
  const [price,setPrice] = useState("");
  useEffect(()=>{
      const getPrice = async () =>{
        fetch("https://www.goldapi.io/api/XAU/INR",{
          headers:{
            "x-access-token" : process.env.GOLD_API_TOKEN,
            "Content-Type" : "application/json"
          }
        })
        .then(async (res)=>{
          const result = await res.json();
          setPrice(result.price_gram_24k)
        })
        .catch(e=>{console.log(e)})
      }
      getPrice()
  },[])
  return (
    <main>
      <div className="p-6 pt-10 pb-10 h-1/2 bg-slate-500 text-center items-center flex flex-col gap-7 text-white">
        <div>
          Welcome to <span className=" underline ">Kesariya Finance</span>, your trusted partner for accessing quick and reliable financial solutions using your gold assets. We pride ourselves on offering gold loans at government interest rates, ensuring that you receive fair terms tailored to your needs. Our commitment to exceptional customer service sets us apart, as our dedicated team is always available to guide you through a hassle-free borrowing process, providing personalized attention every step of the way.
        </div>
        <div>
          At <span className=" underline ">Kesariya Finance</span>, your satisfaction is our priority. With secure facilities and transparent policies, we safeguard your gold assets while offering competitive interest rates. Experience the convenience and professionalism of <span className=" underline ">Kesariya Finance</span>, and unlock the potential of your gold assets to achieve your financial goals. Contact us today to discover how we can help you pave the way to a brighter financial future.
        </div>
        <div>
          Avail Your Loan in just 3 simple steps!!
          <div className="flex flex-col sm:flex-row gap-8 text-center items-center justify-between pt-10">
          <div className="bg-slate-600 p-3 rounded-md w-1/3">Enter your gold details and check maximum recievable loan amount</div>
          <div className="bg-slate-600 p-3 rounded-md w-1/3">Enter your presonal details and click apply for loan</div>
          <div className="bg-slate-600 p-3 rounded-md w-1/3">Thats it ! We will get back to you within 24 hrs!</div>
          </div>
        </div>
        <div>
          <span className="text-lg">Current Gold Rate : <span className="text-lime-700">₹ {price}/g</span></span>
        </div>
      </div>
    </main>
  );
}
