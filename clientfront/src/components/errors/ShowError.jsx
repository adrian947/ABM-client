import React from "react";

export const ShowError = ({ error }) => {
  if (!error.msg) return null;
  return (
    <p className={error.error ? "errorBanner" : "successBanner"}>{error.msg}</p>
  );
};
