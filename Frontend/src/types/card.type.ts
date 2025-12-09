export interface IProducts {
  id: string;
  name: string;
  price: number;
  image_url: string;
}

export interface IApiError {
  message: string;
  statusCode: number;
}
