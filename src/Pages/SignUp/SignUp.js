import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import { toast } from "react-hot-toast";
import useToken from "../../Hooks/useToken";
import { useQuery } from "@tanstack/react-query";
import useTitleHook from "../../Hooks/useTitleHook";
import { host } from "../../Utils/APIRoutes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Loading from "../Shared/Loading/Loading";
const SignUp = () => {
  useTitleHook("Sign Up");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUser, signInWithGoogle, loading } =
    useContext(AuthContext);
  const [signUpError, setSignUpError] = useState();
  const [createdUserEmail, setCreatedUserEmail] = useState("");
  const [token] = useToken(createdUserEmail);
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [inputBox, setInputBox] = useState(false);
  const formData = new FormData();
  const [showPassword, setShowPassword] = useState(false);
  const imageHostKey = process.env.REACT_APP_imgbb_key;
  console.log(imageHostKey);
  const { data: specialties, isLoading } = useQuery({
    queryKey: ["specialty"],
    queryFn: async () => {
      try {
        const res = await fetch(`${host}/appointmentSpecialty`);
        const data = await res.json();
        console.log(data?.data);
        return data?.data;
      } catch (e) {
        console.log(e);
      }
    },
  });
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = (e) => {
    setValue(e.target.value);
    if (e.target.value === "Doctor") {
      setInputBox(true);
    } else {
      setInputBox(false);
    }
  };
  if (token) {
    navigate("/");
  }
  const submitHandler = (data) => {
    console.log(data.usertype);
    const image = data.image[0];
    console.log(image);
    setSignUpError("");
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          console.log(imgData.data.url);
          createUser(data.email, data.password)
            .then((result) => {
              console.log(result.user);
              toast.success("Profile Created");
              const userinfo = {
                displayName: data.name,
              };
              updateUser(userinfo)
                .then(() => {
                  const user = {
                    name: data.name,
                    email: data.email,
                    role: data.usertype,
                    registrationnumber: data?.registrationnumber,
                    specialty: data?.specialty,
                    image: imgData.data.url,
                  };
                  saveUser(user);
                })
                .catch((e) => console.error(e));
            })
            .catch((error) => {
              console.log(error);
              setSignUpError(error.message);
            });
        }
      });
  };
  const hadleGoogleSignin = () => {
    setSignUpError("");
    signInWithGoogle()
      .then((result) => {
        console.log("userdata", result.user);
        const userinfo = {
          displayName: result.name,
        };
        const user = {
          name: result.user.displayName,
          email: result.user.email,
          role: "Patient",
          image: result.user.photoURL,
        };
        saveUser(user);
        updateUser(userinfo)
          .then(() => {})
          .catch((e) => console.error(e));
      })
      .catch((e) => {
        console.log(e);
        setSignUpError(e.message);
      });
  };
  const saveUser = (user) => {
    // const user = { name, email, role, registrationnumber, specialty, image };
    console.log("saveUser", user);
    fetch(`${host}/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("signupdata", data);
        setCreatedUserEmail(user?.email);
      });
  };
  if (loading === true) {
    return <Loading></Loading>;
  }
  return (
    <div
      data-theme="light"
      className="h-[800px] flex justify-center items-center mb-2"
    >
      <div className="w-96 p-7">
        <h1 className="text-3xl text-center font-bold">Sign Up</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="name"
              {...register("name", { required: "Name is required" })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.name && (
              <p className="text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is Required" })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
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
                  required: "Password is Required",
                  minLength: {
                    value: 6,
                    message: "Password must be 6 character long",
                  },
                  pattern: {
                    value: /(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/,
                    message: "Password must be UpperCase and Special character",
                  },
                })}
                className="input input-bordered w-full max-w-xs"
              />
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
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Sign Up As</span>
            </label>
            <select
              {...register("usertype", { required: "User Type is Required" })}
              value={value}
              className="select input-bordered w-full max-w-xs"
              onChange={handleChange}
            >
              <option value="Patient">Patient</option>
              <option value="Doctor">Doctor</option>
            </select>
            {errors.usertype && (
              <p className="text-red-500">{errors.usertype.message}</p>
            )}
            {inputBox ? (
              <div>
                <label className="label">
                  <span className="label-text">
                    Enter Your Registration Number
                  </span>
                </label>
                <input
                  type="number"
                  {...register("registrationnumber", {
                    required: "Registration Number is Required",
                  })}
                  className="input input-bordered w-full max-w-xs"
                />
                {errors.registrationnumber && (
                  <p className="text-red-500">
                    {errors.registrationnumber.message}
                  </p>
                )}
                <label className="label">
                  <span className="label-text">Please Select a Specialty</span>
                </label>
                <select
                  {...register("specialty", {
                    required: "Specialty is Required",
                  })}
                  className="select input-bordered w-full max-w-xs"
                >
                  {specialties?.map((specialty) => (
                    <option value={specialty.name} key={specialty._id}>
                      {specialty.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="mb-2 inline-block text-neutral-700 dark:text-neutral-200">
              <span className="label-text">Photo Upload</span>
            </label>
            <input
              type="file"
              className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
              {...register("image", { required: "Image is required" })}
            />
            <p
              className="mt-1 text-sm text-gray-500 dark:text-gray-300"
              id="file_input_help"
            >
              JPG Only (MAX. 800x400px).
            </p>
            {errors.img && <p className="text-red-600">{errors.img.message}</p>}
          </div>
          <input
            className="btn mt-5 w-full btn-accent"
            value="Sign Up"
            type="submit"
          />
          {signUpError && <p className="text-red-500">{signUpError}</p>}
        </form>
        <p className="mt-5">
          Already have an Account
          <Link className="text-primary" to="/login">
            {" "}
            Please log In
          </Link>
        </p>
        <div className="divider">OR</div>
        <button onClick={hadleGoogleSignin} className="btn btn-outline w-full">
          CONTINUE WITH GOOGLE
        </button>
      </div>
      <p>{}</p>
    </div>
  );
};

export default SignUp;
