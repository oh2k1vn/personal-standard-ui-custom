import React from "react";

interface IDemo extends React.ComponentPropsWithoutRef<"div"> {}

export const Demo: React.FC<IDemo> = () => {
  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const compactNumber = (value: string | number) => {
    const suffixes = ["", "k", "m", "b", "t"];

    // Convert value to number if it's a string
    const numericValue = typeof value === "string" ? parseFloat(value) : value;

    const suffixNum = Math.floor(("" + numericValue).length / 3);

    let shortValue = parseFloat(
      (suffixNum != 0
        ? numericValue / Math.pow(1000, suffixNum)
        : numericValue
      ).toPrecision(2)
    );

    if (shortValue % 1 != 0) {
      shortValue = parseFloat(shortValue.toFixed(1));
    }

    return shortValue + suffixes[suffixNum];
  };

  const ordinalSuffix = (number) => {
    let j = 0;
    let k = 0;
    j = number % 10;
    k = number % 100;
    if (j == 1 && k != 11) {
      return `${number}st`;
    }

    if (j == 2 && k != 12) {
      return `${number}nd`;
    }

    if (j == 3 && k != 13) {
      return `${number}rd`;
    }
    return `${number}th`;
  };

  return (
    <>
      <p>{numberWithCommas(20000000000)}</p>
      <p> {compactNumber(200)}</p>

      <p>{ordinalSuffix(1)}</p>
      <p>{ordinalSuffix(2)}</p>
      <p>{ordinalSuffix(3)}</p>
      <p>{ordinalSuffix(4)}</p>
      <p>{ordinalSuffix(5)}</p>
    </>
  );
};
