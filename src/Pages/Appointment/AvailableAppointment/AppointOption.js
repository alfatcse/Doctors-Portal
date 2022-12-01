import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';

const AppointOption = ({ option, setTreatment }) => {
    const { name, price,slots } = option;
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleBooking = (op) => {
        if (user) {
            setTreatment(op);
        }
        else {
            navigate('/login');
        }
    }
    return (
        <div className="card  shadow-xl ">
            <div className="card-body text-center">
                <h2 className="text-2xl text-secondary font-bold text-center">{name}</h2>
                <p>{slots.length > 0 ? slots[0] : 'Try Another Day'}</p>
                <p>{slots.length} {slots.length > 1 ? 'Spaces' : 'Space'} Available</p>
                <p>Price: ${price}</p>
                <div className="card-actions justify-center">
                    <label
                        onClick={() => handleBooking(option)}
                        disabled={slots.length === 0}
                        htmlFor="booking-modal" className="btn btn-primary text-white font-bold">Book Appointment</label>
                </div>
            </div>
        </div>
    );
};

export default AppointOption;