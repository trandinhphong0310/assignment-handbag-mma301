import axios from "axios";
import { HandBag } from "../types/types";

export const getAllHandBag = async () => {
  try {
    const response = await axios.get<HandBag[]>(`${process.env.EXPO_PUBLIC_API_URL}/handbag`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
