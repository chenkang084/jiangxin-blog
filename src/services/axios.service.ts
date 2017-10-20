import axios from "axios";
import config from "../config";

export interface AxiosConfig {
  baseURL: string;
}

const generateAxios = (config: AxiosConfig) => {
  return axios.create(config);
};

export const cephSevice = generateAxios({ baseURL: config.components.ceph });
