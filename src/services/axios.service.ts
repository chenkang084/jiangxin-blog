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

interface HandleEvent {
  beforeHandle?: (parms: any) => {};
  afterHandle?: (parms: any) => {};
}

const tokenHeaders = {
  "X-auth-token": "",
  "X-subject-token": ""
};

async function openstackService(
  { headers, method, url, data }: OpenstackServiceOpts,
  handle?: HandleEvent
) {
  method = method.toLowerCase();
  try {
    handle && handle.beforeHandle && handle.beforeHandle(tokenHeaders);

    let result;
    switch (method) {
      case "get":
        result = await openstackAxios.get(url, { headers });
      case "post":
        result = await openstackAxios.post(url, data, { headers });
      case "delete":
        result = await openstackAxios.delete(url, { headers });
      case "put":
        result = await openstackAxios.put(url, data, { headers });
      case "patch":
        result = await openstackAxios.patch(url, data, { headers });
      default:
        result = await openstackAxios.get(url);
    }
    handle && handle.afterHandle && handle.afterHandle(tokenHeaders);

    return result;
  } catch (error) {
    return Promise.reject(error.message || error);
  }
}

export { openstackService };
