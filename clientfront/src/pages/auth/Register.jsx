import React, { useState } from "react";
import clientAxios from "../../axios/clientAxios";
import { ShowError } from "./../../components/errors/ShowError";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();

  const [error, setError] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, email, password].includes("")) {
      setError({ msg: "All fields is required", error: true });
      setTimeout(() => {
        setError({});
      }, 2000);
      return;
    }

    try {
      const { data } = await clientAxios.post("/auth", {
        name,
        email,
        password,
      });

      setError({ msg: data.msg, error: false });
      setTimeout(() => {
        setError({});
      }, 2000);

      navigate("/");
    } catch (error) {
      setError({ msg: error.response.data.msg, error: true });
      setTimeout(() => {
        setError({});
      }, 2000);
    }
  };

  return (
    <>
      <form className='form container' onSubmit={handleSubmit}>
        <ShowError error={error} />
        <h1 className='titleAuth'>Register</h1>
        <input
          placeholder='Name'
          className='input'
          onChange={(e) => setName(e.target.value)}
          value={name}
          name='name'
          type='text'
          maxLength={16}
        />
        <input
          placeholder='Email'
          className='input'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name='email'
          type='email'
          autoComplete='nope'
        />
        <input
          placeholder='Password'
          className='input'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name='password'
          type='password'
        />
        <input type='submit' value='register' className='button' />
      </form>
      <Link to='/' className='link'>
        I have an account
      </Link>
    </>
  );
};
