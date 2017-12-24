// abstract class BaseResult {
//   public type: boolean;
//   public msg: string;
//   public items: object;
// }

export interface BaseResult {
  type: string;
  msg?: any;
  items?: object;
}

