import React, { useEffect } from "react";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { DeleteMedicine } from "@/utils/actions/Medicine";
import { useRouter } from "next/navigation";
import { middleware } from "@/utils/actions/Admin";
type Props = {
  id: string | undefined;
  name: string | undefined;
  group: string | undefined;
  number: string | undefined;
};

const Card = ({ id, name, group, number }: Props) => {
  const router = useRouter();

  const handleDelete = async (id: string | undefined) => {
    const confirmRes = confirm("Delete this medicine?");
    const res = await middleware();
    if (!confirmRes) return;
    try {
      if (!res) {
        return router.push("/admin");
      }
      await DeleteMedicine(id);
    } catch (error) {
      console.log(error);
    }
    return router.push("/addMedicine");
  };
  // max-sm:grid-cols-mobile
  return (
    <div className="grid  max-w-2xl   max-h-[100px] max-sm:flex max-sm:flex-col max-sm:gap-5 max-sm:min-h-[200px] max-sm:justify-between max-sm:w-[96%] rounded-md   grid-cols-Card gap-x-5 relative border my-3 md:my-2 px-5 sm:px-2 py-2  shadow-sm shadow-white sm:min-w-[70%] md:min-w-[600px] ">
      <h3 id="scroll" className="sm:border-r px-2 relative  overflow-clip ">
        {name}
        <span className=" opacity-35 text-zinc-500 text-sm  mx-auto absolute -z-10 top-[50%] left-[50%]  -translate-x-[50%] -translate-y-[50%]">
          name
        </span>
      </h3>
      <h4 id="scroll" className="sm:border-r relative overflow-clip">
        {group}
        <span className=" opacity-35 text-zinc-500 text-sm  mx-auto absolute -z-10 top-[50%] left-[50%]  -translate-x-[50%] -translate-y-[50%]">
          group
        </span>
      </h4>
      <p id="scroll" className="sm:border-r relative  overflow-clip">
        {number}
        <span className=" opacity-35 text-zinc-500 text-sm  mx-auto absolute -z-10 top-[50%] left-[50%]  -translate-x-[50%] -translate-y-[50%]">
          number
        </span>
      </p>
      <button
        onClick={() => router.push(`Edit/${id}`)}
        className="text-green-400 max-sm:-left-1  
        max-sm:-top-3  max-sm:bg-zinc-600 max-sm:rounded-full max-sm:p-2 max-sm:text-center  max-sm:absolute"
      >
        <FaUserEdit />
      </button>
      <button
        onClick={() => handleDelete(id)}
        className=" text-red-400 text-2xl  max-sm:-top-3  max-sm:-right-1 max-sm:bg-zinc-700 max-sm:rounded-full max-sm:p-1  max-sm:absolute"
      >
        <MdDeleteForever />
      </button>
    </div>
  );
};

export default Card;
