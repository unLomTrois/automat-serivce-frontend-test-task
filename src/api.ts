import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

export type LoginDTO = {
  username: string;
  password: string;
};

export class API {
  client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: "http://localhost:3000",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    this.client.interceptors.response.use(
      (res) => res,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async (err: AxiosError<any, any>) => {
        console.error("SOME ERROR", err);
        console.error("SOME ERROR", err.response?.status);

        const message = err.response?.data?.message;

        console.error("MESSAGE", message);

        if (
          message === "Пользователь не найден" ||
          message === "No auth token" ||
          message === "Expired Token" ||
          message === "no refresh token!" ||
          message === "invalid refresh token!" ||
          message === "expired refresh token!"
        ) {
          console.log("here");
          window.location.href = "/login";
          return;
        }

        switch (err.response?.status) {
          case 401:
            await this.refresh();
            break;
          case 404:
            throw err;
          default:
            throw err;
        }
      }
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async logout(): Promise<AxiosResponse<any, any>> {
    return this.client.get("auth/logout");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async refresh(): Promise<AxiosResponse<any, any>> {
    return this.client.get("auth/refresh");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async me(): Promise<AxiosResponse<any, any>> {
    return this.client.get("auth/me");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async login(dto: LoginDTO): Promise<AxiosResponse<any, any>> {
    return this.client.post("auth/login", dto);
  }
}

export const api = new API();

export const fetcher = (url: string) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  api.client.get(url).then((res: AxiosResponse<any, any>) => {
    return res.data;
  });
