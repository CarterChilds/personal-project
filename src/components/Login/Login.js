import React, { Component } from "react";
import "./Login.css";

export default function Login() {
  return (
    <div className="login-body" >
      <div className="container" id="slideshow">
        <div >
          <div className="elemnt" />
          <div className="elemnt1" />
          <div className="elemnt2" />
          <div className="elemnt3" />

          <div className="login-page">
            <div className="form">
              <form className="login-form">
                <button>
                  {" "}
                  <a className="loginword" href={process.env.REACT_APP_LOGIN}>
                    Login
                  </a>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
