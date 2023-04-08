import { API } from "../../constants";
import { createAxiosInstance } from "./axiosConfig";

const defaultHeaders = {
  "Content-Type": "application/json",
};

const authHeaders = {};

export function setAuthHeader(token) {
  authHeaders.Authorization = `Bearer ${token}`;
}

export function unsetAuthHeader() {
  delete authHeaders.Authorization;
}

export function getCardList(query = "") {
  return createAxiosInstance({
    url: `${API.noAuthUrls.getCards}${query}`,
    method: "GET",
    headers: { ...defaultHeaders },
  });
}

export function getCategories(query = "") {
  return createAxiosInstance({
    url: `${API.noAuthUrls.getCategories}${query}`,
    method: "GET",
    headers: { ...defaultHeaders },
  });
}
