import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShowError } from "./../../components/errors/ShowError";
import clientAxios from "./../../axios/clientAxios";
import useAuth from "./../../hooks/useAuth";
import { Spinner } from "../../components/Spinner";

export const SignIn = () => {
  const navigate = useNavigate();
  const { setAuth, response, setResponse } = useAuth();

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setError({ msg: "All fields is required", error: true });
      setTimeout(() => {
        setError({});
      }, 2000);
      return;
    }

    try {
      setResponse(true);
      const { data } = await clientAxios.post("/auth/login", {
        email,
        password,
      });

      if (data) {
        setResponse(false);
      }

      setAuth(data);

      localStorage.setItem("token", data.token);

      navigate("/movements");
    } catch (error) {
      setError({ msg: error.response.data.msg, error: true });
      setTimeout(() => {
        setError("");
      }, 2000);
      setResponse(false);
    }
  };

  return (
    <>
      <form className='form container' onSubmit={handleSubmit}>
        <ShowError error={error} />
        <h1 className='titleAuth'>SingIn</h1>
        <input
          className='input'
          name='email'
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          value={email}
          type='email'
        />
        <input
          className='input'
          name='password'
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          value={password}
          type='password'
        />
        {response ? (
          <Spinner />
        ) : (
          <input type='submit' value='login' className='button' />
        )}
      </form>
      <Link to='register' className='link'>
        I have to register
      </Link>
    </>
  );
};
