"use server";
import AdminDB from "@/components/models/Admin";
import { connectToDb } from "../mongooste";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { SECRET } from "../secret";
import { cookies } from "next/headers";

type authProps = {
  username: string;
  password: string;
};

export const createAdmin = async () => {
  const password = "Imblessed100%";
  const hashedPassword = await bcryptjs.hash(password, 10);

  try {
    connectToDb();
    await AdminDB.create({
      username: "Karen",
      password: hashedPassword,
    });
  } catch (error) {
    console.log(error);
  }
};

export const auth = async ({ username, password }: authProps) => {
  const cookiesList = cookies();

  if (!username || !password) return;

  const admin = await AdminDB.findOne({ username });
  const checkPassword = await bcryptjs.compare(password, admin.password);

  if (!admin || !checkPassword) {
    throw new Error("Username or password is incorrect");
  }
  const oneDay = 24 * 60 * 60 * 1000;
  const token = jwt.sign({ username }, SECRET, { expiresIn: "24h" });
  cookiesList.set("jwt", JSON.stringify(token), {
    expires: Date.now() + oneDay,
    httpOnly: true,
  });

  return token;
};

export const middleware = async () => {
  const cookiesList = cookies();

  try {
    const token = cookiesList.get("jwt")?.value;

    if (!token) throw new Error("No token");

    const verifiedToken = jwt.verify(JSON.parse(token), SECRET);

    if (!verifiedToken) throw new Error("Token is not valid");

    return verifiedToken;
  } catch (error) {
    return console.log(error);
  }
};

// export const logout = () => {
//   const cookiesList = cookies();

//   try {
//     const res = cookiesList.set("jwt", " ", { expires: Date.now() });
//     return res;
//   } catch (error) {
//     return;
//   }
// };
