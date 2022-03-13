import React, { useState } from "react";
import clientAxios from "../../axios/clientAxios";
import { ShowError } from "./../errors/ShowError";
import { tokenAuth } from "./../../axios/authTokenHeaders";
import Balance from "./Balance";
import { Spinner } from "../spinner";

export const NewMovements = ({ setNewMovement, movements }) => {
  const [concepts, setConcepts] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([concepts, amount, type].includes("")) {
      setError({
        msg: "All fields is required",
        error: true,
      });

      setTimeout(() => {
        setError({});
      }, 2000);

      return;
    }

    try {
      setLoading(true);
      const { data } = await clientAxios.post(
        "/movements",
        { concepts, amount, type },
        tokenAuth()
      );

      if (data) {
        setLoading(false);
      }
      setNewMovement(data.movement);

      setConcepts("");
      setAmount("");
    } catch (error) {
      console.log("error", error.response.data.msg);
      setLoading(false);
    }
  };

  return (
    <div className='containerForm'>
      <form className='form container formNewMovement' onSubmit={handleSubmit}>
        <ShowError error={error} />
        <h1 className='titleAuth'>New Movement</h1>
        <input
          placeholder='Concepts'
          className='input'
          onChange={(e) => setConcepts(e.target.value)}
          value={concepts}
          name='concepts'
          type='text'
          maxLength={16}
        />
        <input
          placeholder='Amount'
          className='input'
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          name='amount'
          type='number'
        />

        <div className='fieldRadio'>
          <label htmlFor='entry'>ENTRY</label>
          <input
            className='input'
            onChange={(e) => setType(e.target.value)}
            value='entry'
            name='type'
            type='radio'
            id='entry'
          />
        </div>
        <div className='fieldRadio'>
          <label htmlFor='egress'>EGRESS</label>
          <input
            className='input'
            onChange={(e) => setType(e.target.value)}
            value='egress'
            name='type'
            type='radio'
            id='egress'
          />
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <input type='submit' value='Apply movement' className='button' />
        )}
      </form>

      <Balance movements={movements} />
    </div>
  );
};
