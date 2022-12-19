import React, { useContext } from 'react';
import chair from '../../../assets/images/chair.png';
import { DayPicker, DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';
import backImg from '../../../assets/images/bg.png'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../Context/AuthProvider';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
const MakeSchedule = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [specialty, setSpecialty] = useState();
    axios.get(`http://localhost:5006/useremail?email=${user.email}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify()
    }).then(res => {
        setSpecialty(res.data.specialty);
    }).catch(e => console.log(e))
    var option = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const [days, setDays] = useState();
    const [value, setValue] = useState("");
    const [daySlot, setdaySlot] = useState([{
        date: '',
        slot: []
    }])
    const [dateSlot, setDateSlot] = useState([]);
    const footer =
        days && days.length > 0 ? (
            <p>You selected {days.length} day(s).</p>
        ) : (
            <p>Please pick one or more days.</p>
        );
    const handleSlot = (date) => {
        const c = [];
        date.map(d => {
            const a = {
                date: `${d.toLocaleDateString('en-US', option)}`,
            }
            c.push(a);
        })
        setdaySlot(c);
    }
    const handlePrice = event => {
        setValue(event.target.value);
    }
    const handleDaySlot = d => (event) => {
        event.preventDefault();
        const s = [event.target.slot1.value, event.target.slot2.value];
        if (s[0] !== 'Select' && s[1] !== 'Select') {
            d.slot = s;
        }
        const c = [d, ...dateSlot];
        setDateSlot(c);
        event.target.reset();
        event.currentTarget.disabled = true;
    }
    const doctorDetails=[{
        docEmail:user.email,
        docName:user.displayName,
        price:value,
        slots: dateSlot
    }]
    const handleSave = () => {
        const Slotdata = {
            serviceName: specialty,
            doctorDetail:doctorDetails,
        }
        console.log('slotdate', Slotdata);
        setDateSlot([]);
        setValue('');
        // navigate('/');
        fetch(`http://localhost:5006/addslot/${Slotdata.serviceName}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(Slotdata)
        })
            .then(res => res.json())
            .then(result => {
                
            })
    }

    return (
        <section>
            <header className='my-6' style={{ backgroundImage: `url(${backImg})` }}>
                <div className="hero ">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <img src={chair} alt='dentist chair' className="max-w-sm  rounded-lg shadow-2xl" />
                        <div className='mr-6'>
                            <DayPicker
                                mode="multiple"
                                min={1}
                                selected={days}
                                onSelect={setDays}
                                footer={footer}
                            />
                        </div>
                    </div>
                </div>
            </header>
            <label onClick={() => handleSlot(days)} htmlFor='slot-modal' className="btn ml-20 btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-primary">Add Slot</label>
            {daySlot &&
                <>
                    <input type="checkbox" id="slot-modal" className="modal-toggle" />
                    <div className="modal ">
                        <div className="modal-box ml-10">
                            <label className="label">
                                <span className="label-text font-bold">Service Charge</span>
                            </label>
                            <input className='justify-items-center' type='text' id='price' name='price' placeholder='Price' onChange={handlePrice} ></input>
                            {
                                daySlot.map(d =>
                                    <>
                                        <p className='font-bold'>{d.date}</p>
                                        <form className='g-5 justify-items-center' onSubmit={handleDaySlot(d)}>
                                            <select {...register("slot1", { required: "User Type is Required" })} className="select input-bordered  max-w-sm" >
                                                <option value="Select" selected>Select a Slot</option>
                                                <option value="10-12">10-12</option>
                                                <option value="12-02">12-02</option>
                                            </select>
                                            {errors.slot1 && <p className='text-red-500'>{errors.slot1.message}</p>}
                                            <select {...register("slot2", { required: "User Type is Required" })} className="select input-bordered  max-w-sm" >
                                                <option value="Select" selected>Select a Slot</option>
                                                <option value="02-03">02-03</option>
                                                <option value="03-04">03-04</option>
                                            </select>
                                            {errors.slot2 && <p className='text-red-500'>{errors.slot2.message}</p>}
                                            <button className='btn btn-primary' value="Log In" type="submit" >Add</button>
                                        </form>
                                    </>
                                )
                            }
                            <div className="modal-action">
                                <label htmlFor="slot-modal" onClick={handleSave} className="btn">Done</label>
                            </div>
                        </div>
                    </div>
                </>}
        </section>
    );
};

export default MakeSchedule;
//{
//     doctorDetail:[
//         {
//          $set:{
//              docName:'rony'
//          }
//         }
//       ]
//  }
