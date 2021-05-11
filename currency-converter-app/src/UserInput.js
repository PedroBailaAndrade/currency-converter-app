import React from "react";
import NumberFormat from "react-number-format";

export default function UserInput(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
  } = props;

  const renderOptions = () =>
    currencyOptions.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ));

  return (
    <div className="userInputs">
      <NumberFormat
        className="userAmountInput"
        thousandSeparator={true}
        placeholder="0.00"
        onChange={onChangeAmount}
      />
      <select
        className="userCurrencyInput"
        value={selectedCurrency}
        onChange={onChangeCurrency}
      >
        {renderOptions()}
      </select>
    </div>
  );
}
