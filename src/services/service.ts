import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
});

export const getUsers = async (limit: number, skip: number) => {
  try {
    const response = await api.get(`/users?limit=${limit}&skip=${skip}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
