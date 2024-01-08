"use client";
import { useEffect, useState } from "react";
import Card from "./Card";
import Link from "next/link";
import { fetchAllMedicine } from "@/utils/actions/Medicine";
import { CiLogout } from "react-icons/ci";
// import { logout } from "@/utils/actions/Admin";
import { useRouter } from "next/router";

type Data = {
  _id: string;
  name: string;
  group: string;
  number: string;
};
const Medicines = () => {
  const [data, setData] = useState<Data[] | null[]>([]);
  const [query, setQuery] = useState("");

  const fetchAll = async () => {
    const res = await fetchAllMedicine();
    if (!res) return;
    return setData(res);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const filteredData = data.filter((item) => {
    return (
      item?.name.toLocaleLowerCase().includes(query.toLowerCase()) ||
      item?.group.toLocaleLowerCase().includes(query.toLowerCase()) ||
      item?.number.toLocaleLowerCase().includes(query.toLowerCase())
    );
  });

  const handleLogout = () => {
    const confirmRes = confirm("Logout? ");
      
    if(!confirmRes) return

    return console.log("REMOVED")
  };

  

  return (
    <div className="h-screen w-[100%] flex justify-center items-center flex-col">
      <nav className=" bg-zinc-900 shadow-md shadow-black w-full flex items-center justify-between px-7 py-3  fixed z-10 top-0 right-0">
        <div className=" absolute left-0 top-0 w-[50px] md:w-[100px] h-[60px] flex justify-left items-center ">
          <button
            onClick={() => handleLogout()}
            title="logout"
            className="text-2xl md:ml-3 ml-1 "
          >
            <CiLogout />
          </button>
        </div>
        <div className="w-[80%] max-sm:w-[300px] flex justify-center items-center">
          <input
            type="search"
            placeholder="Search..."
            className=" bg-transparent border-b text-white py-2 px-2 w-[80%]"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Link
          className="bg-green-500 py-2 px-4 rounded-full max-sm:px-1  max-sm:text-sm  whitespace-nowrap  max-sm:ml-0 w-[200px] h-[40px] ml-8 flex justify-center items-center"
          href="/addMedicine"
        >
          Add New
        </Link>
      </nav>

      {data.length < 1 ? (
        <h2 className=" animate-pulse text-2xl text-red-400">
          There Is No Result
        </h2>
      ) : (
        <section className="flex absolute top-24 gap-x-5 w-full justify-center flex-wrap-reverse">
          {filteredData.map((item) => (
            <Card
              key={item?._id}
              id={item?._id}
              name={item?.name}
              group={item?.group}
              number={item?.number}
            />
          ))}
        </section>
      )}
    </div>
  );
};

export default Medicines;
