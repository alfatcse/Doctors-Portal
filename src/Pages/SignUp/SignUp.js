import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import { toast } from 'react-hot-toast';
import useToken from '../../Hooks/useToken';
import { useQuery } from '@tanstack/react-query';
import useTitleHook from '../../Hooks/useTitleHook';
const SignUp = () => {
    useTitleHook('Sign Up');
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser, signInWithGoogle } = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState();
    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [token] = useToken(createdUserEmail);
    const navigate = useNavigate();
    const [value, setValue] = useState("");
    const [inputBox, setInputBox] = useState(false);
    const formData = new FormData();
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const { data: specialties, isLoading } = useQuery({
        queryKey: ['specialty'],
        queryFn: async () => {
            try {
                const res = await fetch('https://doctors-portal-server-blush-psi.vercel.app/appointmentSpecialty');
                const data = await res.json();
                console.log(data);
                return data;
            }
            catch (e) {
                console.log(e);
            }

        }
    })
    const handleChange = (e) => {
        setValue(e.target.value);
        if (e.target.value === "Doctor") {
            setInputBox(true);
        } else {
            setInputBox(false);
        }
    };
    if (token) {
        navigate('/');
    }
    const submitHandler = (data) => {
        console.log(data.usertype);
        const image = data.image[0];
        console.log(image);
        setSignUpError('');
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url);
                    createUser(data.email, data.password)
                        .then(result => {
                            console.log(result.user);
                            toast.success('User Created');
                            const userinfo = {
                                displayName: data.name
                            }
                            updateUser(userinfo).then(() => {
                                saveUser(data.name, data.email, data.usertype, data?.registrationnumber, data?.specialty, imgData.data.url);
                            }).catch(e => console.error(e))
                        })
                        .catch(error => {
                            console.log(error)
                            setSignUpError(error.message);
                        })
                }
            })

    }
    const hadleGoogleSignin = () => {
        setSignUpError('');
        signInWithGoogle().then(result => {
            console.log('user', result.user.displayName);
            const userinfo = {
                displayName: result.name
            }
            saveUser(result.user.displayName, result.user.email, "Patient", "no registration number", result.user.photoURL);
            updateUser(userinfo).then(() => { }).catch(e => console.error(e))
        })
            .catch(e => {
                console.log(e)
                setSignUpError(e.message);
            })
    }
    const saveUser = (name, email, role, registrationnumber, specialty, image) => {
        const user = { name, email, role, registrationnumber, specialty, image };
        console.log(user);
        fetch('https://doctors-portal-server-blush-psi.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                setCreatedUserEmail(email);
            })
    }
    return (
        <div data-theme="light" className='h-[800px] flex justify-center items-center mb-2'>
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
                    <div>
                        <label className="label">
                            <span className="label-text">Photo</span>
                        </label>
                        <input type="file"  {...register("image", { required: "Image is required" })} />
                        {errors.img && <p className='text-red-600'>{errors.img.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Sign Up As</span>
                        </label>
                        <select {...register("usertype", { required: "User Type is Required" })} value={value} className="select input-bordered w-full max-w-xs" onChange={handleChange}>
                            <option value="Patient">Patient</option>
                            <option value="Doctor">Doctor</option>
                        </select>
                        {errors.usertype && <p className='text-red-500'>{errors.usertype.message}</p>}
                        {inputBox ?
                            <div>
                                <label className="label">
                                    <span className="label-text">Enter Your Registration Number</span>
                                </label>
                                <input type="number" {...register("registrationnumber", { required: "Registration Number is Required" })} className="input input-bordered w-full max-w-xs" />
                                {errors.registrationnumber && <p className='text-red-500'>{errors.registrationnumber.message}</p>}
                                <label className="label">
                                    <span className="label-text">Please Select a Specialty</span>
                                </label>
                                <select {...register("specialty", { required: "Specialty is Required" })} className="select input-bordered w-full max-w-xs">
                                    {
                                        specialties.map(specialty => <option value={specialty.name} key={specialty._id}>{specialty.name}</option>)
                                    }
                                    <option onChange={console.log('ssss')}>Svelte</option>
                                </select>
                            </div>

                            : null}

                    </div>
                    <input className='btn mt-5 w-full btn-accent' value="Sign Up" type="submit" />
                    {
                        signUpError && <p className='text-red-500'>{signUpError}</p>
                    }
                </form>
                <p className='mt-5'>Already have an Account<Link className='text-primary' to="/login"> Please log In</Link></p>
                <div className="divider">OR</div>
                <button onClick={hadleGoogleSignin} className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
            <p>{ }</p>
        </div>
    );
};

export default SignUp;