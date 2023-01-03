import React from 'react';
import doctor from '../../../assets/images/doctor.png';
import appointment from '../../../assets/images/appointment.png';
import PrimaryButton from '../../Components/PrimaryButton/PrimaryButton';
import { Link } from 'react-router-dom';
const MakeAppointment = () => {
    return (
        <section className='mt-32 rounded' style={{ background:`url(${appointment})`   }}>
            <div className="hero ">
                <div className="hero-content flex-col lg:flex-row">
                    <img src={doctor} alt className="lg:w-1/2 -mt-32 -mb-4 hidden md:block rounded-lg shadow-2xl" />
                    <div>
                        <h4 className='text-xl font-bold text-primary'>Appointment</h4>
                        <h1 className="text-4xl text-white font-bold">Make an appointment Today</h1>
                        <p className="py-6 text-white">Enjoy Your Life — We'll Be Here to Save it! We care for you — inside and out! Taking Care of You Since — Well, Beginning of Time!</p>
                        <Link to='/appointment'>  <PrimaryButton>Make Appointment</PrimaryButton></Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MakeAppointment;