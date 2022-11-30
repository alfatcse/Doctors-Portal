import React from 'react';
import { useForm } from 'react-hook-form';
import {useQuery} from '@tanstack/react-query';
import { async } from '@firebase/util';
import Loading from '../../Shared/Loading/Loading';
const AddDoctor = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {data:specialties,isLoading}=useQuery({
        queryKey:['specialty'],
        queryFn:async()=>{
            const res=await fetch('http://localhost:5006/appointmentSpecialty');
            const data=await res.json();
            console.log(data);
            return data;
        }
    })
    const handleAddDoctor = (data) => {
        console.log(data);
    }
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div className='w-96 p-7'>
            <h1>Doc</h1>
            <form onSubmit={handleSubmit(handleAddDoctor)}>
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
                        <span className="label-text">Please Select a Specialty</span>
                    </label>
                    <select {...register("specialty", { required: "Specialty is Required" })}  className="select input-bordered w-full max-w-xs">
                        {
                           specialties.map(specialty=><option value={specialty.name} key={specialty._id}>{specialty.name}</option>)
                        }
                        <option>Svelte</option>
                    </select>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Photo</span>
                    </label>
                    <input type="file" {...register("img", { required: "Name is required" })} className="input input-bordered w-full max-w-xs" />
                    {errors.img && <p className='text-red-600'>{errors.img.message}</p>}
                </div>
                <input className='btn mt-5 w-full btn-accent' value="Add Doctor" type="submit" />
            </form>
        </div>
    );
};

export default AddDoctor;