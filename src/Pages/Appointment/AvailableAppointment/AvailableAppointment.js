import React, {  useState } from 'react';
import { format } from 'date-fns';
import AppointOption from './AppointOption';
import BookingModal from '../BookingModal/BookingModal';
import {useQuery} from '@tanstack/react-query';
const AvailableAppointment = ({ selectedDate }) => {
   // const [appointmentOptions, setappointmentOptions] = useState([]);
    const [treatment, setTreatment] = useState(null);
    const {data:appointmentOptions=[]}=useQuery({
        queryKey:['appointmentOptions'],
        queryFn:async()=>{
            const res=await fetch('http://localhost:5006/appointmentOptions');
            const data=await res.json();
            return data;
        }
    })
    // useEffect(() => {
    //     fetch('http://localhost:5006/appointmentOptions')
    //         .then(res => res.json())
    //         .then(data => setappointmentOptions(data))
    // }, [])
    return (
        <section className='mt-16'>
            <p className='text-center text-4xl text-primary font-bold'>Available Appointment On:{format(selectedDate, 'PP')}</p>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6'>
                {
                    appointmentOptions.map(option => <AppointOption key={option._id} option={option} setTreatment={setTreatment}></AppointOption>)
                }
            </div>
            {
                treatment&&
                <BookingModal selectedDate={selectedDate} setTreatment={setTreatment} treatment={treatment}></BookingModal>
            }
        </section>
    );
};

export default AvailableAppointment;