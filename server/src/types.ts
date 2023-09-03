export interface IAccountingSoftware {
    getBalanceSheet: () => Promise<BalanceSheet>
}

export interface IDecisionEngine {
    getDecision: (req: LoanRequest) => Promise<boolean>
}

export type Balance = {
    year: number
    month: number
    profitOrLoss: number
    assetsValue: number
}

export type BalanceSheet = Balance[]

export type LoanRequest = {
    balanceSheet: BalanceSheet
    preAssessment: number
}