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

  const handleClick = () => {
    const newName = name
      ?.replace(/[\/\,\֊\.\-\+/\{\}\s⬇️\\]/gim, "")
      .split(" ")
      .join("");
    const newGroup = group?.replace(/[\/\,\֊\.\-\+/\{\}\s⬇️\\]/gim, "");
    const newNumber = number?.replace(/[\/\,\֊\.\-\+/\{\}\s⬇️\\]/gim, "");

    return router.push(`Edit/${id}/${newName}/${newGroup}/${newNumber}`);
  };

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

  return (
    <div className="grid  max-w-2xl   max-h-[100px] max-sm:grid-cols-mobile   grid-cols-Card gap-x-5 relative border my-3 md:my-2 px-5 sm:px-2 py-2 rounded-sm shadow-sm shadow-white sm:min-w-[70%] md:min-w-[600px] xl:[500px]">
      <h3 id="scroll" className="sm:border-r px-2 relative  overflow-auto ">
        {name}
        <span className=" opacity-35 text-zinc-500 text-sm  mx-auto absolute -z-10 top-[50%] left-[50%]  -translate-x-[50%] -translate-y-[50%]">
          name
        </span>
      </h3>
      <h4 id="scroll" className="sm:border-r relative overflow-auto">
        {group}
        <span className=" opacity-35 text-zinc-500 text-sm  mx-auto absolute -z-10 top-[50%] left-[50%]  -translate-x-[50%] -translate-y-[50%]">
          group
        </span>
      </h4>
      <p id="scroll" className="sm:border-r relative overflow-auto">
        {number}
        <span className=" opacity-35 text-zinc-500 text-sm  mx-auto absolute -z-10 top-[50%] left-[50%]  -translate-x-[50%] -translate-y-[50%]">
          number
        </span>
      </p>
      <button onClick={() => handleClick()} className="text-green-400">
        <FaUserEdit />
      </button>
      <button
        onClick={() => handleDelete(id)}
        className=" text-red-400 text-2xl"
      >
        <MdDeleteForever />
      </button>
    </div>
  );
};

export default Card;
