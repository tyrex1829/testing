import express, { Request, Response } from "express";

export const app = express();

app.use(express.json());

interface ISum {
  a: number;
  b: number;
}

app.get("/", (req: Request, res: Response): void => {
  res.status(200).json({
    msg: "Server is Up",
  });
  return;
});

app.get("/ping", (req: Request, res: Response): void => {
  res.status(200).json({
    msg: "Pong",
  });
  return;
});

app.post("/sum", (req: Request, res: Response) => {
  const { a, b }: ISum = req.body;
  const answer = a + b;

  res.status(200).json({
    data: `Answer: ${answer}`,
  });

  return;
});
