import { ACCESS_TOKEN } from "@/constants";
import Cookies from "js-cookie";

class Api {
  uri: string;

  constructor(uri: string) {
    this.uri = uri;
  }

  protected async request(
    method: string,
    path = "",
    data?: object,
    headers: Record<string, string> = {}
  ) {
    const url = `${import.meta.env.VITE_APP_SERVER_URL}/${this.uri}${path}`; 
      
    const token = Cookies.get(ACCESS_TOKEN);
    const authHeaders: Record<string, string> = token
      ? { Authorization: `Bearer ${token}` }
      : {};
    const mergedHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...headers,
      ...authHeaders,
    };
    const options: RequestInit = {
      method,
      headers: mergedHeaders,
      ...(method === "GET"
        ? { body: undefined }
        : {
            body:
              headers["Content-Type"] === "multipart/form-data"
                ? (data as FormData)
                : JSON.stringify(data),
          }),
    };

    try {
      const response = await fetch(url, options);
      return await response.json();
    } catch (error) {
      console.error("API request error:", error);
      throw error;
    }
  }

  get(query: object) {
    return this.request("GET", "", query);
  }

  getById(id: string | number) {
    return this.request("GET", `/${id}`);
  }

  create(resource: object) {
    return this.request("POST", "", resource);
  }

  update(id: string | number, resource: object) {
    return this.request("PUT", `/${id}`, resource);
  }

  destroy(id: string | number) {
    return this.request("DELETE", `/${id}`);
  }
}

export default Api;
