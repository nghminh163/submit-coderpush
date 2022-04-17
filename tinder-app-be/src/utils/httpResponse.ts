import { Response } from 'express';

export const badRequest = (res: Response, message = 'Bad request') => {
  res.status(400).send({
    statusCode: 400,
    message,
  });
};

export const notFound = (res: Response, message = 'Not found') => {
  res.status(404).send({
    statusCode: 404,
    message,
  });
};
export const success = (res: Response, data, message = 'Successful') => {
  if (data) {
    res.json({
      statusCode: 200,
      message,
      data,
    });
  } else {
    res.json({
      statusCode: 200,
      message,
    });
  }
};
