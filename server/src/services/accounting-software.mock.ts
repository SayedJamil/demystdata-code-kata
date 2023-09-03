import { BalanceSheet, IAccountingSoftware } from "../types";

export const balances = [
  {
    year: 2020,
    month: 12,
    profitOrLoss: 250000,
    assetsValue: 1234,
  },
  {
    year: 2020,
    month: 11,
    profitOrLoss: 1150,
    assetsValue: 5789,
  },
  {
    year: 2020,
    month: 10,
    profitOrLoss: 2500,
    assetsValue: 22345,
  },
  {
    year: 2020,
    month: 9,
    profitOrLoss: -187000,
    assetsValue: 223452,
  },
];

class AccountingSoftwareMock implements IAccountingSoftware {
  getBalanceSheet = async (): Promise<BalanceSheet> => {
    console.log(`[AccountingSoftwareMock] get balance sheet`);

    // The response is very fast and I want you to see the animation here... :)
    await new Promise((res) => setTimeout(res, 1_000));

    console.log(
      `[AccountingSoftwareMock] returning balance sheet with ${balances.length} balances.`
    );
    return balances;
  };
}

export default new AccountingSoftwareMock();
