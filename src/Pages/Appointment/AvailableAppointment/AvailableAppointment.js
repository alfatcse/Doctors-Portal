import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import AppointOption from './AppointOption';
import BookingModal from '../BookingModal/BookingModal';
const AvailableAppointment = ({ selectedDate }) => {
    const [appointmentOptions, setappointmentOptions] = useState([]);
    const [treatment, setTreatment] = useState(null);
    useEffect(() => {
        fetch('appointmentOptions.json')
            .then(res => res.json())
            .then(data => setappointmentOptions(data))
    }, [])
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
                <BookingModal selectedDate={selectedDate} treatment={treatment}></BookingModal>
            }
        </section>
    );
};

export default AvailableAppointment;