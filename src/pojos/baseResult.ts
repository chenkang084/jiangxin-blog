// abstract class BaseResult {
//   public type: boolean;
//   public msg: string;
//   public items: object;
// }

export interface BaseResult {
  type: string;
  msg?: string;
  items?: object;
}

const a: BaseResult = {
  type: "success"
};
