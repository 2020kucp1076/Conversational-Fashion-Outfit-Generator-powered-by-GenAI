import React from 'react';
import Div100vh from 'react-div-100vh';

export default function ({ children }) {
  return <Div100vh style={{ position: "relative" }}>{children}</Div100vh>;
}