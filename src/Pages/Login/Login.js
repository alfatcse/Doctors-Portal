import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useToken from '../../Hooks/useToken';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { signIn, signInWithGoogle } = useContext(AuthContext);
    const [loginError, setloginError] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [token] = useToken(loginEmail);
    console.log('looooo', loginEmail);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';
    if (token) {
        navigate(from, { replace: true })
    }
    console.log('looooo', loginEmail);
    const handleLogin = (data) => {
        console.log(data.email);
        setloginError('');
        signIn(data.email, data.password)
            .then(result => {
                //  console.log('userr',result.user.email);
                setLoginEmail(result.user.email);
                console.log('looooo', loginEmail);

                //navigate(from, { replace: true })
            })
            .catch(e => {
                console.error(e.message);
                setloginError(e.message);
            })
    }

    const hadleGoogleSignin = () => {
        setloginError('');
        signInWithGoogle().then(result => {
            console.log('emmmm', result.user.email);
            axios.get(`http://localhost:5006/useremail?email=${result.user.email}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify()
            }).then(res => {
                console.log(res.data);
               
                if (res.data.email === result.user.email) {
                    setLoginEmail(result.user.email);
                }
                else {
                    setloginError('User not exist');
                }
            }).catch(e => console.log(e))
        })
            .catch(e => {
                console.log(e)
                setloginError(e.message);
            })
    }

    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h1 className='text-3xl text-center font-bold'>login</h1>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email"
                            {...register("email", { required: "Email Address is required" })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-600' >{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password"
                            {...register("password", { required: "Password is required", minLength: { value: 6, message: 'Password must be 6 characters or longer' } })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-red-600' >{errors.password?.message}</p>}
                        <label className="label">
                            <span className="label-text"><Link className='text-primary' >Forget Password?</Link> </span>
                        </label>
                    </div>
                    <input className='btn w-full btn-accent' value="Log In" type="submit" />
                    <div>
                        {
                            loginError && <p className='text-red-500'>{loginError}</p>
                        }
                    </div>
                </form>
                <p>New to Doctors Portal <Link className='text-primary' to="/signup">Create New Account</Link></p>
                <div className="divider">OR</div>
                <button onClick={hadleGoogleSignin} className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;