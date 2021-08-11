import { State as State } from "./state";

export class ControlRequest {
  public systemCode: string;
  public unitCode: string;
  public direction: State;
}