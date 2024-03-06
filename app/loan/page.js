'use client'

import React, { useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

const page = () => {
  const router = useRouter();
  const {data:session} = useSession();
  if(!session){
    router.push('/')
  }
  const [prices,setPrices] = useState({})
  useEffect(()=>{
    const getPrice = async () =>{
      fetch("https://www.goldapi.io/api/XAU/INR",{
        headers:{
          "x-access-token" : process.env.GOLD_API_TOKEN,
          "Content-Type" : "application/json"
        }
      })
      .then(async (res)=>{
        setPrices(await res.json())
      })
      .catch(e=>{console.log(e)})
    }
    getPrice()
  },[])
  const [value,setValue] = useState()
  const [loan,setLoan] = useState()
  const name = session?.user.name
  const [weight,setWeight] = useState()
  const [karat,setKarat] = useState("24k")
  const [isSubmitting , setIsSubmitting] = useState(false)
  const [phone,setPhone] = useState("")
  const [address,setAddress] = useState("")
  function handleSubmit(e){
    e.preventDefault();
    console.log(prices)
    let val = 0;
    if(karat==="24k") val=prices.price_gram_24k
    if(karat==="22k") val=prices.price_gram_22k
    if(karat==="21k") val=prices.price_gram_21k
    if(karat==="20k") val=prices.price_gram_20k
    if(karat==="18k") val=prices.price_gram_18k
    setValue(val*weight)
    setLoan(0.75 * value)
    console.log(value,loan)
    setIsSubmitting(true)
  }
  async function applyLoan(e){
    e.preventDefault();
    const formData = new FormData();
    formData.set('Name', session.user.name);
    formData.set('Email', session.user.email);
    formData.set('Phone', phone);
    formData.set('Address', address);
    formData.set('Loan', loan.toString()); // Assuming loan is a number
    await fetch("https://script.google.com/macros/s/AKfycbxXhhrYs8RooCGbcrrbD1dcwQVabned1n_Oei509ZljmU5822QE65M8o4T6RArpCFob/exec",{
      method:"POST",
      body:formData
    })
    .then(res=>{
      toast.success("Loan Application Sent")
      setIsSubmitting(false)
    })
    .catch(e=>{console.log(e)})
  }
  return (
    <div className='text-center text-white pt-20 pr-8 pl-8 pb-48 flex flex-col gap-2'>
        <div className='text-2xl mb-8'>
          Welcome {name}, get gold loans at the best market interest rates!
        </div>
        <form>
        <div className='flex gap-4 justify-center'>
        <input required='true' className='text-black outline-none border-none rounded-md p-2 w-52' type='number' placeholder='Enter Weight (in grams)' min={1} max={1000} value={weight} onChange={(e)=>{setWeight(e.target.value)}} />
        <div>
        <select required='true' className='text-black p-2 outline-none rounded-md border-none' value={karat} onChange={(e)=>{setKarat(e.target.value)}}>
          <option value="24k">24k</option>
          <option value="22k">22k</option>
          <option value="21k">21k</option>
          <option value="20k">20k</option>
          <option value="18k">18k</option>
        </select>
        </div>
        </div>
        <button onClick={handleSubmit} className='mt-4 p-2 bg-green-500 rounded-md text-white'>Get Value</button>
        </form>
        {isSubmitting && (
          <div>
          <div>Current Gold Value = {value}</div>
          <div>Loan payable = {loan}</div>
          </div>
        )
        }
        {isSubmitting && (
          <form>
          <div>
            <input required='true' className='text-black outline-none border-none rounded-md p-2 w-40' type='text' placeholder='Enter Phone number' value={phone} onChange={(e)=>{setPhone(e.target.value)}} />
          </div>
          <div className='mt-3'>
            <input required='true' className='text-black outline-none border-none rounded-md p-2 w-32' type='text' placeholder='Enter Address' value={address} onChange={(e)=>{setAddress(e.target.value)}} />
          </div>
          <button onClick={applyLoan} className='mt-4 p-2 bg-blue-400 rounded-md text-white'>Apply for loan</button>
          </form>
        )
        }
    </div>
  )
}

export default page