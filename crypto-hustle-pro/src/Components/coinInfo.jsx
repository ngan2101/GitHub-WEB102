import React, { Component, useEffect, useState } from "react";
const API_KEY =
  "8beb505fe8878ec5ec5c27921cd3d9618e17c50484584a86f4ac376ccf2e7bd7";
import { Link } from "react-router-dom";

const CoinInfo = ({ image, name, symbol, index }) => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const getCoinPrice = async () => {
      try {
        const response = await fetch(
          `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=` +
            API_KEY,
          { signal: controller.signal }
        );
        const json = await response.json();
        setPrice(json);
      } catch (error) {
        if (error.name === "AbortError") {
          // It's ok, don't do anything
        } else {
          console.error(error);
        }
      }
    };
    getCoinPrice();
    return () => controller.abort();
  }, [symbol]);

  return (
    <div>
      {price ? (
        <li className="main-list" key={index}>
          <img
            className="icons"
            src={`https://www.cryptocompare.com${image}`}
            alt={`Small icon for ${name} crypto coin`}
          />
          <Link
            style={{ color: "white" }}
            to={`/coinDetails/${symbol}`}
            key={symbol}
          >
            {name} <span className="tab"></span> ${price.USD} USD
          </Link>
        </li>
      ) : null}
    </div>
  );
};

export default CoinInfo;