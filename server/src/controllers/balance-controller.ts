import { IAccountingSoftware } from "../types";
import { Request, Response } from "express";
import { AccountingSoftware } from "../services";

class BalanceController {
  constructor(private accountingSoftware: IAccountingSoftware) {}

  getBalanceSheet = async (req: Request, res: Response) => {
    const data = await this.accountingSoftware.getBalanceSheet();
    res.json({ data });
  };
}

export default new BalanceController(AccountingSoftware);
