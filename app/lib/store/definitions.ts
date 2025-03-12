export type Period = {
  ledger: string;
  budget: Budget;
  id: string;
};

export type Budget = Record<string, number>;
