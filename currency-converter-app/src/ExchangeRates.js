import React from "react";

export default function ExchangeRates(props) {
  const { amount, selectedCurrency, exchangeRates } = props;

  const renderExchangeRateList = () =>
    Object.entries(exchangeRates).map(([key, value]) => {
      if (selectedCurrency !== key) {
        return (
          <div className="currencyExchange" key={`${key}-${value}`}>
            <p className="currencyRate">{value * amount}</p>
            <div className="currencyName">
              <img className="currencyLogo" src={`/images/${key}.png`} alt="" />
              <p className="currency">{key}</p>
            </div>
          </div>
        );
      } else return null;
    });

  if (!amount || !amount.lenght) {
    return <p className="instructions">Enter an amount to check the rates</p>;
  } else {
    return <div className="exchangeRates">{renderExchangeRateList()}</div>;
  }
}
