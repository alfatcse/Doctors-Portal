import { format } from 'date-fns';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthProvider';

const BookingModal = ({ treatment, selectedDate, setTreatment,refetch }) => {
    const { name, slots } = treatment;
    const { user } = useContext(AuthContext);
    const handleBooking = (event) => {
        event.preventDefault();
        const form = event.target;
        const patient_name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const slot = form.slot.value;
        const booking = {
            AppointmentDate: format(selectedDate, 'PP'),
            patient_name: patient_name,
            slot,
            email,
            phone,
            treatment: name
        }
        //todo :: send data to the server and once data is saved and close modal
        // display toast
        fetch('http://localhost:5006/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setTreatment(null);
                if (data.acknowledged) {
                    toast.success('Booking Confirmed');
                    refetch();
                }
                else{
                    toast.error(data.message);
                    
                }
            })
        console.log(booking);
    }
    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{name}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10'>
                        <input type="text" disabled value={format(selectedDate, 'PP')} className="input input-bordered input-info w-full " />
                        <select name='slot' className="select select-bordered w-full ">
                            {
                                slots.map((slot, i) => <option key={i} value={slot}>{slot}</option>)
                            }
                        </select>
                        <input name='name' defaultValue={user?.displayName} disabled readOnly type="name" placeholder="Your Name" className="input input-bordered input-info w-full " />
                        <input name='email' defaultValue={user?.email} disabled readOnly type="email" placeholder="Email Address" className="input input-bordered input-info w-full " />
                        <input name='phone' type="phone" placeholder="Phone Number" className="input input-bordered input-info w-full " />
                        <br />
                        <input type="submit" className="w-full btn btn-accent" value="Submit" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;