export interface IProducts {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

export interface IApiError {
  message: string;
  statusCode: number;
}
