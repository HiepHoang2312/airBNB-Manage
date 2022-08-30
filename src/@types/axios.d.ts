// Override lại default types/interfaces của library
import "axios";

declare module "axios" {
  // Bản chất AxiosResponse<any, any>
  export interface AxiosResponse<T = any> extends Promise<T> {}
}
