import React, { useEffect, useState } from "react";
import SDK from "@uphold/uphold-sdk-javascript";
import UserInput from "./UserInput";
import ExchangeRates from "./ExchangeRates";

const sdk = new SDK({
  baseUrl: "http://api-sandbox.uphold.com",
  clientId: "foo",
  clientSecret: "bar",
});

const currenciesList = [
  "USD",
  "EUR",
  "BRL",
  "CAD",
  "SEK",
  "BTC",
  "AED",
  "ETH",
  "GBP",
  "AUD",
  "PHP",
];

const ratesReducer = (acc, result) => {
  if (!result) return acc;

  return {
    ...acc,
    [result.currency]: result.rate,
  };
};

const getExchangeRates = (currency) => (currencyFromList) => {
  if (currencyFromList === currency) {
    return Promise.resolve();
  }

  return sdk
    .getTicker(`${currency}-${currencyFromList}`)
    .then(({ currency, ask: rate }) => {
      return { currency, rate };
    });
};

export default function App() {
  const [currencyOptions] = useState(currenciesList);
  const [currency, setcurrency] = useState("USD");
  const [exchangeRates, setExchangeRates] = useState({});
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    Promise.all(currenciesList.map(getExchangeRates(currency)))
      .then((results) => {
        setExchangeRates(results.reduce(ratesReducer, { ...exchangeRates }));
      })
      .catch((error) => console.error(error));
  }, [currency]);

  return (
    <div className="App">
      <h1 className="title">Currency Converter</h1>
      <p className="description">
        Receive competitive and transparent pricing with <br></br>no hidden
        spreads. See how we compare.
      </p>
      <UserInput
        currencyOptions={currencyOptions}
        selectedCurrency={currency}
        onChangeCurrency={(currency) => setcurrency(currency.target.value)}
        onChangeAmount={(amount) =>
          setAmount(amount.target.value.replace(/,/g, ""))
        }
      />
      <ExchangeRates
        exchangeRates={exchangeRates}
        amount={amount}
        selectedCurrency={currency}
      />
    </div>
  );
}
