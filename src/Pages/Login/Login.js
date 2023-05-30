import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import useTitleHook from "../../Hooks/useTitleHook";
import useToken from "../../Hooks/useToken";
import { host } from "../../Utils/APIRoutes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Loading from "../Shared/Loading/Loading";
const Login = () => {
  useTitleHook("Log in");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { signIn, signInWithGoogle, loading } = useContext(AuthContext);
  const [loginError, setloginError] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [token] = useToken(loginEmail);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";
  if (token) {
    navigate(from, { replace: true });
  }
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = (data) => {
    console.log(data.email);
    setloginError("");
    signIn(data.email, data.password)
      .then((result) => {
        setLoginEmail(result.user.email);
      })
      .catch((e) => {
        console.error(e.message);
        setloginError(e.message);
      });
  };
  const hadleGoogleSignin = () => {
    setloginError("");
    signInWithGoogle()
      .then((result) => {
        setLoginEmail(result.user.email);
      })
      .catch((e) => {
        console.log(e);
        setloginError(e.message);
      });
  };
  if (loading === true) {
    return <Loading></Loading>;
  }
  return (
    <div className="h-[800px] flex justify-center items-center">
      <div className="w-96 p-7">
        <h1 className="text-3xl text-center font-bold">login</h1>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email", { required: "Email Address is required" })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && (
              <p className="text-red-600">{errors.email?.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="input-group">
              <input
                type={showPassword === true ? `text` : `password`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be 6 characters or longer",
                  },
                })}
                className="input input-bordered w-full max-w-xs"
              ></input>
              <button
                type="button"
                className="input input-bordered"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon
                  icon={showPassword === false ? faEyeSlash : faEye}
                  className="eye-icon"
                />
              </button>
            </div>
            {errors.password && (
              <p className="text-red-600">{errors.password?.message}</p>
            )}
            <label className="label">
              <span className="label-text">
                <Link className="text-primary">Forget Password?</Link>{" "}
              </span>
            </label>
          </div>
          <input
            className="btn w-full btn-accent"
            value="Log In"
            type="submit"
          />
          <div>
            {loginError && <p className="text-red-500">{loginError}</p>}
          </div>
        </form>
        <p>
          New to Doctors Portal{" "}
          <Link className="text-primary" to="/signup">
            Create New Account
          </Link>
        </p>
        <div className="divider">OR</div>
        <button onClick={hadleGoogleSignin} className="btn btn-outline w-full">
          CONTINUE WITH GOOGLE
        </button>
      </div>
    </div>
  );
};

export default Login;
