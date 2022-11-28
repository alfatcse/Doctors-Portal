import { format } from 'date-fns';
import React from 'react';

const BookingModal = ({ treatment, selectedDate,setTreatment }) => {
    const { name, slots } = treatment;
    const handleBooking = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const slot = form.slot.value;
        const booking = {
            AppointmentDate: format(selectedDate, 'PP'),
            patient: name,
            slot,
            email,
            phone,
            treatment: name
        }
        //todo :: send data to the server and once data is saved and close modal
        // display toast
        console.log(booking);
        setTreatment(null);
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
                        <input name='name' type="name" placeholder="Your Name" className="input input-bordered input-info w-full " />
                        <input name='email' type="email" placeholder="Email Address" className="input input-bordered input-info w-full " />
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