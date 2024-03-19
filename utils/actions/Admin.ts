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

export const auth = async ({ username, password }: authProps) => {
  const cookiesList = cookies();
  connectToDb()
  if (!username || !password) return;

  const admin = await AdminDB.findOne({ username });
  const checkedPassword = admin.password === password

  if (!admin || !checkedPassword) {
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
  connectToDb()
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

export const logout = () => {
  const cookiesList = cookies();
 connectToDb()
  try {
    cookiesList.set("jwt", " ", { expires: Date.now() });
    return true;
  } catch (error) {
    return false;
  }
};

