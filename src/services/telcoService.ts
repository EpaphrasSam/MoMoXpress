"use server";

import axios from "axios";
import { Telco } from "@/types/telcoTypes";
import { AppError, handleError } from "@/utils/errorHandler";

export async function getTelcos(): Promise<{
  data?: Telco[];
  error?: { message: string; statusCode: number };
}> {
  try {
    const response = await axios.get(
      "https://telcos-five.vercel.app/api/telcos"
    );
    return { data: response.data };
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      throw new AppError(
        error.response?.data?.message || "Failed to fetch telco data",
        error.response?.status || 500
      );
    }
    return { error: handleError(error) };
  }
}
