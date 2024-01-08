"use client";
import { useState, SyntheticEvent, useEffect } from "react";
import { createNewMedicine } from "@/utils/actions/Medicine";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { updateMedicine } from "@/utils/actions/Medicine";
import { middleware } from "@/utils/actions/Admin";

const initialState = {
  name: "",
  group: "",
  number: "",
};
const page = ({ params }: any) => {
  const { id, name, group, number } = params;
  const [data, setData] = useState({
    name,
    group,
    number,
  });
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!data.name || !data.group || !data.number) {
      return setError(true);
    }
    try {
      await updateMedicine(id, data);
      setData(initialState);
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setError(false);
    }
  };

  async function checkmiddleaware() {
    const res = await middleware();

    if (!res) {
      return router.push("/admin");
    }
  }

  useEffect(() => {
    checkmiddleaware();
  }, []);

  return (
    <div className="h-screen flex justify-center flex-col items-center">
      <div className="absolute top-5 left-5 md:text-3xl text-2xl flex justify-center items-center py-2 px-4 rounded-full">
        <Link href="/">
          <FaArrowAltCircleLeft />
        </Link>
      </div>
      <h2 className=" text-3xl text-lime-300+">Update Medicine</h2>
      <form
        onSubmit={handleSubmit}
        className="max-md:h-[60%] max-md:border-none  max-md:shadow-none  w-[88%] py-16 gap-y-6  md:w-[500px] border px-5 flex flex-col  rounded-md shadow-md shadow-white mt-5"
      >
        <div>
          <input
            className=" mb-3 w-full bg-transparent border-b py-2 px-4"
            type="text"
            placeholder="name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            onFocus={() => setError(false)}
          />
        </div>
        <div>
          <input
            className=" mb-3 w-full bg-transparent border-b py-2 px-4"
            type="text"
            placeholder="group"
            value={data.group}
            onChange={(e) => setData({ ...data, group: e.target.value })}
            onFocus={() => setError(false)}
          />
        </div>
        <div>
          <input
            className="mb-3 w-full bg-transparent border-b py-2 px-4"
            type="text"
            placeholder="number"
            value={data.number}
            onChange={(e) => setData({ ...data, number: e.target.value })}
            onFocus={() => setError(false)}
          />
        </div>

        <button
          type="submit"
          className=" border py-2 rounded-sm hover:bg-white hover:text-black"
        >
          Update
        </button>
        {error && <p className="text-red-500 text-center">Field all inputs</p>}
      </form>
    </div>
  );
};

export default page;
