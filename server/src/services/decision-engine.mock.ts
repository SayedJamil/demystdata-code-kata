import { IDecisionEngine, LoanRequest } from "../types";

class DecisionEngineMock implements IDecisionEngine {
  getDecision = async (req: LoanRequest): Promise<boolean> => {
    let decision = true;

    console.log("[DecisionEngineMock] got loan request:", req);
    // The response is very fast and I want you to see the animation here... :)
    await new Promise((res) => setTimeout(res, 2_000));

    console.log("[DecisionEngineMock] returning decision:", decision);
    return decision;
  };
}

export default new DecisionEngineMock();
