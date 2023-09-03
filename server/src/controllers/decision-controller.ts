import { Request, Response } from "express";
import { BalanceSheet, IDecisionEngine, LoanRequest } from "../types";
import { DecisionEngine } from "../services";
import dayjs from "dayjs";
import { matchedData, validationResult } from "express-validator";

export const applyRulesToSummariseLoanRequest = (
  balances: BalanceSheet,
  loanAmount: number
): LoanRequest => {
  let preAssessment: number = 20;

  // get last year balances
  const now = dayjs();
  const lastYearBalances = balances.filter(
    (balance) =>
      dayjs(new Date(balance.year, balance.month)).diff(now, "month") <= 12
  );

  // if the business had made a profit in the last 12 months: pre-assessment = 60%
  if (lastYearBalances.some((x) => x.profitOrLoss > 0)) {
    preAssessment = 60;
  }

  // if the average assert value across 12 months (across means the recent 12 months available?)
  // is grater than the loan amount: pre-assessment = 100%
  const average =
    lastYearBalances.map((x) => x.assetsValue).reduce((acc, x) => acc + x) /
    lastYearBalances.length;
  if (average > loanAmount) {
    preAssessment = 100;
  }

  return { balanceSheet: balances, preAssessment };
};

class DecisionController {
  constructor(private decisionEngine: IDecisionEngine) {}

  submitLoanRequest = async (req: Request, res: Response) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      res
        .status(400)
        .json({
          msg: "Bad request. Fix the following errors",
          errors: errors.array(),
        });
      return;
    }
    const { balanceSheet, loanAmount } = matchedData(req);
    const loanRequest = applyRulesToSummariseLoanRequest(
      balanceSheet,
      loanAmount
    );
    const answer = await this.decisionEngine.getDecision(loanRequest);
    res.json({ answer, assessment: loanRequest.preAssessment });
  };
}

export default new DecisionController(DecisionEngine);
