import React from 'react';
import chair from '../../../assets/images/chair.png';
import bgChair from '../../../assets/images/bg.png';
import PrimaryButton from '../../Components/PrimaryButton/PrimaryButton';
import { Link } from 'react-router-dom';
const Banner = () => {
    return (
        <div className="hero" style={{
            backgroundImage: `url(${bgChair})`,
            backgroundSize: 'cover'
        }}>
            <div className="hero-content items-center flex-col lg:flex-row-reverse">
                <img src={chair} className="lg:w-1/2 rounded-lg shadow-2xl" alt='' />
                <div >
                    <h1 className="text-5xl font-bold">Your New Smile Starts Here!</h1>
                    <p className="py-6">Relax, this is going to be so easy. The smart way to find a dentist. Get matched with a great dentist today. Seriously, it’s time.</p>
                   <Link to='/appointment'><PrimaryButton>Get Started</PrimaryButton></Link> 
                </div>
            </div>
        </div>
    );
};

export default Banner;