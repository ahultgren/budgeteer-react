import { pipe, reduce, values, sortBy, prop } from "ramda";
import { Period } from "./store";

type Category = {
  amount: number;
  budget: number;
  name: string;
};

export function currentCategories(period: Period): Category[] {
  const ledger = period.ledger;
  const entries = ledger.split(/\n/g).slice(1);
  const currencies = {
    sek: 1,
  };
  let currentCurrencyValue = 1;

  return pipe(
    reduce((obj, entry: string) => {
      const match = entry
        .toLowerCase()
        .match(/^([+-]?(?:[0-9]*[.])?[0-9]+)([a-z]{3})? +([^ ]+) *(.*)$/);

      if (match) {
        const [, amount, currencyCode, name] = match;
        const category = (obj[name] = obj[name] || {
          amount: 0,
          budget: Number(period.budget[name]) || 0,
          name,
        });
        const currencyValue = currencyCode
          ? currencies[currencyCode]
          : currentCurrencyValue;
        category.amount += Number(amount) / currencyValue;
        return obj;
      }

      const currency = entry
        .toLowerCase()
        .match(/^-([a-z]{3}) +([+-]?(?:[0-9]*[.])?[0-9]+)$/);
      if (currency) {
        const [, code, value] = currency;
        currentCurrencyValue = currencies[code] = Number(value);
        return obj;
      }

      return obj;
    }, {}),
    values,
    sortBy(prop("name"))
  )(entries);
}

export function totalSpent(period: Period): number {
  return Math.round(
    currentCategories(period)
      .map((x) => x.amount)
      .reduce((a, b) => a + b, 0)
  );
}

export function totalBudget(period: Period): number {
  return Math.round(
    currentCategories(period)
      .map((x) => x.budget)
      .reduce((a, b) => a + b, 0)
  );
}
