import axios from "axios";
import config from "../config";
export interface AxiosConfig {
  baseURL: string;
  headers?: object;
}

const generateAxios = ($config: AxiosConfig) => {
  return axios.create($config);
};

const openStackAxios = generateAxios({
  baseURL: config.api.openStack,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json"
  }
});

interface OpenStackServiceOpts {
  method: string;
  url: string;
  data?: any;
  headers?: any;
}

const tokenHeaders = {
  "X-auth-token": "",
  "X-subject-token": ""
};

async function openStackService({
  headers,
  method,
  url,
  data
}: OpenStackServiceOpts) {
  method = method.toLowerCase();
  try {
    let result;
    switch (method) {
      case "get":
        result = await openStackAxios.get(url, { headers });
        break;
      case "post":
        result = await openStackAxios.post(url, data);
        break;
      case "delete":
        result = await openStackAxios.delete(url, { headers });
        break;
      case "put":
        result = await openStackAxios.put(url, data, { headers });
        break;
      case "patch":
        result = await openStackAxios.patch(url, data, { headers });
        break;
      default:
        result = await openStackAxios.get(url);
        break;
    }

    return result;
  } catch (error) {
    return Promise.reject({
      msg: error.message || error,
      status: error.response ? error.response.status : 401
    });
  }
}

export { openStackService, OpenStackServiceOpts };
