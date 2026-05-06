import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IApiResponse, IMeta } from '../types';

const sendResponse = <T>(
  res: Response,
  data: {
    statusCode: number;
    success: boolean;
    message: string;
    data?: T;
    meta?: IMeta;
  }
): void => {
  const responseData: IApiResponse<T> = {
    success: data.success,
    message: data.message,
    data: data.data,
    meta: data.meta,
  };

  res.status(data.statusCode).json(responseData);
};

export default sendResponse;
