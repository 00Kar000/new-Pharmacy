"use client";
import { useState, SyntheticEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/utils/actions/Admin";
import { cookies } from "next/headers";
import { middleware } from "@/utils/actions/Admin";

const initialState = {
  username: "",
  password: "",
};
const page = () => {
  const [data, setData] = useState(initialState);
  const [error, setError] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!data.username || !data.password) {
      return setError(true);
    }
    try {
      const res = await auth(data);
      if (!res) return;
    } catch (error) {
      console.log(error);
    }
  };

  const checkAuth = async () => {
    const res = await middleware();

    if (!res) return;

    return router.push('/');
  };


  useEffect(()=>{
       checkAuth()
  },[data,handleSubmit])

  return (
    <div className="h-screen flex justify-center flex-col items-center">
      <h2 className=" text-3xl text-lime-300+">Admin</h2>
      <form
        onSubmit={handleSubmit}
        className="max-md:h-[60%] max-md:border-none  max-md:shadow-none w-[88%]  md:w-[500px] border px-5 py-10 flex flex-col gap-y-6 rounded-md shadow-md shadow-white mt-5"
      >
        <div>
          <input
            className=" mb-4 w-full bg-transparent border-b py-2 px-4"
            type="text"
            placeholder="username"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            onFocus={() => setError(false)}
          />
        </div>
        <div>
          <input
            className="mb-4 w-full bg-transparent border-b py-2 px-4"
            type="password"
            placeholder="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            onFocus={() => setError(false)}
          />
        </div>
        <button
          type="submit"
          className=" border py-2 rounded-sm hover:bg-white hover:text-black"
        >
          Login
        </button>
        {error && <p className="text-red-500 text-center">Field all inputs</p>}
      </form>
    </div>
  );
};

export default page;
