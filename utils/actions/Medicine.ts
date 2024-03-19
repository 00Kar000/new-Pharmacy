"use server";
import Medicine from "@/components/models/Medicine";
import { connectToDb } from "../mongooste";

type Data = {
  name: string;
  group: string;
  number: string;
};

export const createNewMedicine = async ({ name, group, number }: Data) => {
  if (!name || !group || !number) return;

  try {
    connectToDb();
    await Medicine.create({
      name,
      group,
      number,
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllMedicine = async () => {
  try {
    connectToDb();
    const res = await Medicine.find({});
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const DeleteMedicine = async (id: string | undefined) => {
  try {
    connectToDb();
    await Medicine.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
  }
};

export const updateMedicine = async (
  id: string,
  { name, group, number }: Data
) => {
  try {
    connectToDb();
    await Medicine.findByIdAndUpdate(
      id,
      { name, group, number },
      { new: true }
    ).then((data) => {
      if (data) {
        console.log("Updated Successfully");
      } else {
        console.log("There is no data");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const findOneMedicine = async (id: string) => {
  try {
    connectToDb();
    const data = await Medicine.findById(id);
    if (!data) return null;
    return data;
  } catch (error) {
    console.log(error);
  }
};
