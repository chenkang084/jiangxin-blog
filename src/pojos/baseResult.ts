// abstract class BaseResult {
//   public type: boolean;
//   public msg: string;
//   public items: object;
// }

export interface BaseResult {
  status: string;
  msg?: any;
  items?: object;
}
