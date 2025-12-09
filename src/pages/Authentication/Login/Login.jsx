import React from "react";
import logo from "../../../assets/logo.png";

const Login = () => {
  return (
    <div className="flex w-7xl items-center mx-auto">
      <div className="w-50% flex justify-around items-center">
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" className="input" placeholder="Password" />
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
      </div>
      <div className="w-50% flex flex-cols justify-around items-center bg-primary">
        <img src={logo} alt="logo" />
      </div>
    </div>
  );
};

export default Login;
