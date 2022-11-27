import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import AppointOption from './AppointOption';
const AvailableAppointment = ({ selectedDate }) => {
    const [appointmentOptions,setappointmentOptions]=useState([]);
    useEffect(()=>{
        fetch('appointmentOptions.json')
        .then(res=>res.json())
        .then(data=>setappointmentOptions(data))
    },[])
    return (
        <section className='mt-16'>
            <p className='text-center text-primary font-bold'>date{format(selectedDate, 'PP')}</p>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                 {
                    appointmentOptions.map(option=><AppointOption key={option._id} option={option}></AppointOption>)
                 }
            </div>
        </section>
    );
};

export default AvailableAppointment;