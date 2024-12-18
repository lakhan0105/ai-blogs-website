import axios from "axios";
const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY;

export const openaiFetch = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${openaiApiKey}`,
  },
});
