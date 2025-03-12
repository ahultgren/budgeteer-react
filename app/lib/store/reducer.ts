import { v4 } from "uuid";
import { Period } from "./definitions";

export type Action = { type: "added" } | { type: "loaded"; periods: Period[] };

export function periodsReducer(
  storedPeriods: Period[],
  action: Action
): Period[] {
  switch (action.type) {
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
    default: {
      const error: never = action.type as never;
      throw new Error(`Unkown dispath type ${error}`);
    }
  }
}
