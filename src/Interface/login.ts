export interface LoginValues {
  email: string;
  password: string;
}
export interface LoginResult {
  message: string;
  user: UserValues;
  token: string;
}
export interface UserValues {
  tickets: string[];
  deleteAt: boolean;
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: Date;
  gender: boolean;
  address: string;
  type: string;
  __v: number;
}
