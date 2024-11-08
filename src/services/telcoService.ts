"use server";

import axios from "axios";
import { Telco } from "@/types/telcoTypes";

export async function getTelcos(): Promise<Telco[]> {
  try {
    const telcos = await axios.get("https://telcos-five.vercel.app/api/telcos");
    return telcos.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
