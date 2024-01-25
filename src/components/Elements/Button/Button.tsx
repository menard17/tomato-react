import React from "react";

interface Props {
  children: string;
  color?: string;
  onClick: () => void;
}
const Button: React.FC<Props> = ({ children, onClick, color = "primary" }) => (
  <button className={"btn btn-" + color} onClick={onClick}>
    {children}
  </button>
);

export default Button;
