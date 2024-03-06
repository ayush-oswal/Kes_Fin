'use client'

import React from 'react'
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from 'next/link'
import { useRouter } from 'next/navigation';


const Nav = () => {
  const {data:session} = useSession();
  const [providers, setProviders] = useState(null);
  const router = useRouter()
  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);
  return (
    <div className=' bg-red-500 flex items-center justify-between p-7'>
      <div>
      <Link href='/' className='text-yellow-300 text-3xl'>Kesariya Finance</Link>
      </div>
      <div>
      { session?.user ? (
        <div className=' flex gap-6 '>
          <Link className=' p-2 bg-green-500 rounded-md text-white' href="/loan">Get Gold Loan</Link>
          <button className=' p-2 bg-blue-400 rounded-md text-white' onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <div>
        {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}>
                  <span className='p-2  bg-blue-400 rounded-md text-white'>Sign in With {provider.name}</span>
                </button>
              ))}
        </div>
      )
      }
      </div>
    </div>
  )
}

export default Nav