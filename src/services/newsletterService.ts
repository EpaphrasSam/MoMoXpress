"use server";

import axios from "axios";

interface NewsletterResponse {
  success: boolean;
  message: string;
}

export async function subscribeToNewsletter(
  phoneNumber: string
): Promise<NewsletterResponse> {
  try {
    const response = await axios.post(
      "https://telcos-five.vercel.app/api/newsletter",
      { phoneNumber }
    );
    return response.data;
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    throw error;
  }
}
