import React, { useEffect, useState } from "react";
import clientAxios from "../../axios/clientAxios";
import { tokenAuth } from "./../../axios/authTokenHeaders";

const Balance = ({ movements }) => {
  const [total, setTotal] = useState([]);

  useEffect(() => {
    const getTotalBalance = async () => {
      try {
        const { data } = await clientAxios.get("movements/total", tokenAuth());
        setTotal(data.movements);
      } catch (error) {
        console.log("error", error);
      }
    };
    getTotalBalance();
  }, [movements]);

  const balance = total.reduce((acc, curr) => {
    if (curr.type === "entry") {
      acc = acc + curr.amount;
    } else {
      acc = acc - curr.amount;
    }

    return acc;
  }, 0);

  const lastBalance = movements.reduce((acc, curr) => {
    if (curr.type === "entry") {
      acc = acc + curr.amount;
    } else {
      acc = acc - curr.amount;
    }

    return acc;
  }, 0);

  return (
    <div className='container balance'>
      <p className='pBalance'> Balance: $ {balance}</p>
      <p className='pBalance'> Balance last 10 movements: $ {lastBalance}</p>
    </div>
  );
};

export default Balance;
