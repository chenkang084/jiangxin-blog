import axios from "axios";
import config from "../config";

export interface AxiosConfig {
  baseURL: string;
  headers?: object;
}

const generateAxios = ($config: AxiosConfig) => {
  return axios.create($config);
};

export const cephSevice = generateAxios({
  baseURL: config.components.ceph,
  headers: { "X-Requested-With": "XMLHttpRequest" }
});
