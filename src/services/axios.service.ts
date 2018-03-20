import axios from "axios";
import config from "../config";
export interface AxiosConfig {
  baseURL: string;
  headers?: object;
}

const generateAxios = ($config: AxiosConfig) => {
  return axios.create($config);
};

const openstackAxios = generateAxios({
  baseURL: config.api.openstack,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json"
  }
});

export interface OpenstackServiceOpts {
  method: string;
  url: string;
  data?: any;
  headers: any;
}

async function openstackService({
  headers,
  method,
  url,
  data
}: OpenstackServiceOpts) {
  method = method.toLowerCase();
  try {
    switch (method) {
      case "get":
        return await openstackAxios.get(url, { headers });
      case "post":
        return await openstackAxios.post(url, data, { headers });
      case "delete":
        return await openstackAxios.delete(url, { headers });
      case "put":
        return await openstackAxios.put(url, data, { headers });
      case "patch":
        return await openstackAxios.patch(url, data, { headers });
      default:
        return await openstackAxios.get(url);
    }
  } catch (error) {
    return Promise.reject(error.message || error);
  }
}

export { openstackService };
