import { create } from "zustand";
//types
import { ICurrency } from "../types";

type CurrencyStore = {
  currenciesData: Array<ICurrency>;
  setCurrenciesData: (data: Array<ICurrency>) => void;
  updateValue: (ccy: string, property: string, newBuyValue: string) => void;
};

export const useCurrencyStore = create<CurrencyStore>((set) => ({
  currenciesData: [],
  initialValue: [],
  setCurrenciesData: (data: Array<ICurrency>) => set({ currenciesData: data }),
  updateValue: (ccy, property, newValue) =>
    set((state) => ({
      currenciesData: state.currenciesData.map((currency) =>
        currency.ccy === ccy ? { ...currency, [property]: newValue } : currency
      ),
    })),
}));

export {};
