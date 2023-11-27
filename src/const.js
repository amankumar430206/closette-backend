export const API_VERSION = process.env.API_VERSION;
export const BASE_URL = "/api/" + API_VERSION;
export const HEADERS = {
  AUTH_TOKEN: "c-auth-token",
};

export const categories = [
  { name: "casual" },
  { name: "formal" },
  { name: "ethnic" },
  { name: "swimwear" },
  { name: "dailywear" },
  { name: "lingerie" },
];
