import express, { Request, Response } from "express";
import { z } from "zod";
import { prismaClient } from "./db";

export const app = express();
app.use(express.json());

const sumInput = z.object({
  a: z.number(),
  b: z.number(),
});

app.get("/", (req: Request, res: Response): void => {
  res.status(200).json({
    msg: `Server is UP`,
  });
  return;
});

app.get("/sum", (req: Request, res: Response): void => {
  const parsedResponse = sumInput.safeParse({
    a: Number(req.headers["a"]),
    b: Number(req.headers["b"]),
  });

  if (!parsedResponse.success) {
    res.status(411).json({
      msg: `Incorrect inputs`,
    });
    return;
  }

  const answer = parsedResponse.data.a + parsedResponse.data.b;

  res.status(200).json({
    answer,
  });
  return;
});

app.post("/sum", async (req: Request, res: Response): Promise<void> => {
  const parsedResponse = sumInput.safeParse(req.body);

  if (!parsedResponse.success) {
    res.status(411).json({
      msg: `Incorrect inputs`,
    });
    return;
  }

  const answer = parsedResponse.data.a + parsedResponse.data.b;

  const response = await prismaClient.sum.create({
    data: {
      a: parsedResponse.data.b,
      b: parsedResponse.data.a,
      result: answer,
    },
  });

  res.status(200).json({
    answer,
    id: response.id,
  });
  return;
});
