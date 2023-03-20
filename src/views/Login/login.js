import React, { useState, useEffect } from "react";

import services from "services";
import useForm from "hooks/useForm";
import { changeLoggedInFlag, setCurrentUser } from "redux/actions/authActions";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useToast } from "components/Toast";
import ButtonLoader from "components/ButtonLoader";
import "./login.css";
export default function Login() {
  const toast = useToast();
  const [initialValues, setInitialValues] = useState({
    userName: "",
    password: "",
  });
  const { values, errors, handleChange, handleSubmit } = useForm(
    initialValues,
    login
  );

  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  function login() {
    setIsLoading(true);
    let obj = {
      username: values.userName,
      password: values.password,
      role: [1],
    };

    services.AuthService.loginUser(obj)
      .then(async (response) => {
        let userObj = {
          token: response.response.token,
          user: response.response.user,
        };

        window.localStorage.setItem("aimfit-user", JSON.stringify(userObj));

        dispatch(setCurrentUser(userObj));
        dispatch(changeLoggedInFlag(true));
        setIsLoading(false);
        toast.add("tr", "success", "Logged In Successfully");
        history.push("/admin/members");
      })
      .catch((err) => {
        setIsLoading(false);
        toast.add(
          "tr",
          "danger",
          err.message || err?.response?.data?.code || "Something went wrong"
        );
      });
  }

  return (
    <div>
      <div className="limiter">
        <div
          className="container-login100"
          style={{ backgroundImage: "url('bg.jpg')" }}
        >
          <div className="wrap-login100">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="login100-form validate-form"
            >
              <span className="login100-form-logo">
                <img src="LOGO.png" />
              </span>

              <span className="login100-form-title p-b-34 p-t-27">Log in</span>
              <div
                className=""
                className={`wrap-input100 validate-input ${
                  errors.password && "mb-5"
                }`}
                data-validate="Enter username"
              >
                <input
                  className={`input input100 ${errors.password && "is-danger"}`}
                  type="text"
                  name="userName"
                  placeholder="Username"
                  onChange={handleChange}
                  noValidate
                  autoComplete="off"
                  value={values.userName || ""}
                  required
                />
                <span className="focus-input100"></span>

                {errors.userName && (
                  <span className="error help is-danger">
                    {errors.userName}
                  </span>
                )}
              </div>
              <div
                className="wrap-input100 validate-input"
                data-validate="Enter password"
              >
                <input
                  className={`input input100 ${errors.password && "is-danger"}`}
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={values.password || ""}
                  required
                />
                <span className="focus-input100 focus-input200"></span>
                {errors.password && (
                  <span className="error help is-danger">
                    {errors.password}
                  </span>
                )}
              </div>
              <div className="container-login100-form-btn">
                <button type="submit" className="login100-form-btn">
                  {!isLoading ? "Login" : <ButtonLoader />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div id="dropDownSelect1"></div>
    </div>
  );
}
