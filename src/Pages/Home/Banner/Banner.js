import React from 'react';
import chair from '../../../assets/images/chair.png';
import bgChair from '../../../assets/images/bg.png';
import PrimaryButton from '../../Components/PrimaryButton/PrimaryButton';
const Banner = () => {
    return (
        <div className="hero" style={{
            backgroundImage: `url(${bgChair})`,
            backgroundSize: 'cover'
        }}>
            <div className="hero-content items-center flex-col lg:flex-row-reverse">
                <img src={chair} className="lg:w-1/2 rounded-lg shadow-2xl" alt='' />
                <div >
                    <h1 className="text-5xl font-bold">Box Office News!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <PrimaryButton>Get Started</PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default Banner;