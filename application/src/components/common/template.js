import React from "react";
import { Nav } from "../../components";
import { useSelector } from "react-redux";
import "./template.css";

const Template = (props) => {
    const user = useSelector((state) => state.login.email);

  return (
    <div className="bg-layer">
      <div className="fg-layer">
        <p className='user'>Hello, {user}</p>
        <label className="logo">Bruce's Diner</label>
        <Nav />
        {props.children}
      </div>
    </div>
  );
};

export default Template;
