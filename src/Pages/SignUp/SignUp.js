import { da } from 'date-fns/locale';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {createUser}=useContext(AuthContext);

    const submitHandler = (data) => {
        console.log(data);
        createUser(data.email,data.password)
        .then(result=>{
            console.log(result.user);
        })
        .catch(error=>console.log(error))
    }
    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h1 className='text-3xl text-center font-bold'>Sign Up</h1>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="name" {...register("name", { required: "Name is required" })} className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-red-600'>{errors.name.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" {...register("email", { required: "Email is Required" })} className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register("password", {
                            required: "Password is Required",
                            minLength: { value: 6, message: "Password must be 6 character long" },
                            pattern: { value: /(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/, message: "Password must be UpperCase and Special character" }
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                        
                    </div>
                    <input className='btn mt-5 w-full btn-accent' value="Sign Up" type="submit" />
                </form>
                <p className='mt-5'>Already have an Account<Link className='text-primary' to="/login"> Please log In</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default SignUp;