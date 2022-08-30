export interface User {
  tickets: string[];
  deleteAt: boolean;
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  type: string;
  __v: number;
  avatar: File;
  birthday: string;
  gender: boolean;
}
export interface UserInfo {
  tickets: string[];
  deleteAt: boolean;
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  type: string;
  __v: number;
  avatar: string;
  birthday: string;
  gender: boolean;
}
