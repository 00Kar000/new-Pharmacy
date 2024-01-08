"use client"
import Image from 'next/image'
import { useEffect } from "react";
import Medicines from '@/components/Medicines'
import { middleware } from "@/utils/actions/Admin";
import { useRouter} from "next/navigation";


export default function Home() {
  const router = useRouter()


  async function checkmiddleaware () {
    const res = await middleware()

    if(!res) {
      return router.push('/admin')
    }
  }

  useEffect(()=>{
    checkmiddleaware()
  },[])


  return (
    <main className="flex min-h-screen flex-col w-[100%] ">
      <Medicines/> 
    </main>
  )
}
