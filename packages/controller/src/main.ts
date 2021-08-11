import express, { Request, Response } from "express";
import { ControlRequest } from "shared";
import { execute } from "./execute";

const sendExecutablePath = "/home/pi/Coding/433Utils/RPi_utils/send";

const controller = express();
const port = 3000;

controller.use(express.json());

controller.use((error: Error, req: Request, res: Response, next: any) => {
  console.error(`Unexpected error: ${error.message}`);
  next(error);
});

controller.post('/switch-control', async (req: Request, res: Response) => {
  const switchRequest = req.body as ControlRequest;
  console.log(`New switch request ${JSON.stringify(switchRequest)}`);

  const command = `${sendExecutablePath} ${switchRequest.systemCode} ${switchRequest.unitCode} ${switchRequest.direction}`;

  await execute(command);
});

controller.listen(port, () => {
  console.log(`Controller listening at http://localhost:${port}`);
});
