export type Method =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "OPTIONS"
  | "HEAD"
  | "PATCH";

export type ReqOptType = {
  label: string;
  value: Method;
  colorClassName?: string;
};
