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
  headers?: any;
}

const tokenHeaders = {
  "X-auth-token": "",
  "X-subject-token": ""
};

async function openstackService({
  headers,
  method,
  url,
  data
}: OpenstackServiceOpts) {
  method = method.toLowerCase();
  try {
    let result;
    switch (method) {
      case "get":
        result = await openstackAxios.get(url, { headers });
        break;
      case "post":
        result = await openstackAxios.post(url, data);
        break;
      case "delete":
        result = await openstackAxios.delete(url, { headers });
        break;
      case "put":
        result = await openstackAxios.put(url, data, { headers });
        break;
      case "patch":
        result = await openstackAxios.patch(url, data, { headers });
        break;
      default:
        result = await openstackAxios.get(url);
        break;
    }

    return result;
  } catch (error) {
    return Promise.reject(error.message || error);
  }
}

export { openstackService };
