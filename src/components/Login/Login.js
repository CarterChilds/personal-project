import React, { Component } from "react";
import "./../NewLogin.css";

export default function Login() {
  return (
    <div className='login-body'>

  
    <div class="login-page">
      <div class="form">
        <form class="register-form" />
        <form class="login-form">
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
  );
}
