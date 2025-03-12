import { v4 } from "uuid";
import { Period } from "./definitions";

export type Action =
  | { type: "added" }
  | { type: "loaded"; periods: Period[] }
  | {
      type: "update ledger";
      id: string;
      ledger: string;
    };

export function periodsReducer(
  storedPeriods: Period[],
  action: Action
): Period[] {
  const type = action.type;
  switch (type) {
    case "added": {
      return [
        ...storedPeriods,
        {
          ledger: "New Ledger\n",
          budget: {},
          id: v4(),
        },
      ];
    }
    case "loaded": {
      return action.periods;
    }
    case "update ledger": {
      return storedPeriods.map((period) => {
        if (period.id === action.id) {
          return {
            ...period,
            ledger: action.ledger,
          };
        }

        return period;
      });
    }
    default: {
      const error: never = type;
      throw new Error(`Unkown dispath type ${error}`);
    }
  }
}
