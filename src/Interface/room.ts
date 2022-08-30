export interface Room {
  deleteAt: boolean;
  _id: string;
  name: string;
  description: string;
  __v: number;
  image: File;
  cableTV: boolean;
  dryer: boolean;
  elevator: boolean;
  gym: boolean;
  heating: boolean;
  kitchen: boolean;
  pool: boolean;
  wifi: boolean;
  bath: number;
  bedRoom: number;
  guests: number;
  locationId: LocationID;
  price: number;
  indoorFireplace: boolean;
  hotTub: boolean;
}
export interface RoomDetail {
  deleteAt: boolean;
  _id: string;
  name: string;
  description: string;
  __v: number;
  image: string;
  cableTV: boolean;
  dryer: boolean;
  elevator: boolean;
  gym: boolean;
  heating: boolean;
  kitchen: boolean;
  pool: boolean;
  wifi: boolean;
  bath: number;
  bedRoom: number;
  guests: number;
  locationId: LocationID;
  price: number;
  indoorFireplace: boolean;
  hotTub: boolean;
}

export interface LocationID {
  deleteAt: boolean;
  name: string;
  province: string;
  country: string;
  valueate: number;
  image: string;
}
