import React from 'react';
import { format } from 'date-fns';
const AvailableAppointment = ({ selectedDate }) => {
    return (
        <div>
            <p className='text-center text-primary font-bold'>date{format(selectedDate, 'PP')}</p>
        </div>
    );
};

export default AvailableAppointment;