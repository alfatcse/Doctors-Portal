import React from 'react';
import fluoride from '../../../assets/images/fluoride.png';
import cavity from '../../../assets/images/cavity.png';
import whitening from '../../../assets/images/whitening.png';
import Service from './Service';
import care from '../../../assets/images/treatment.png'
import { Link } from 'react-router-dom';
const Services = () => {
    const serviceData = [
        {
            id: 1,
            name: 'Fluoride Treatment',
            description: 'Fluoride varnish can be applied to both baby teeth and adult teeth by a dentist. The process involves painting a varnish containing high levels of fluoride onto',
            img: fluoride
        },
        {
            id: 2,
            name: 'Cavity Filling',
            description: 'Dental restoration, dental fillings, or simply fillings are treatments used to restore the function, integrity, and morphology of missing tooth structure',
            img: cavity
        },
        {
            id: 3,
            name: 'Teeth Whitening',
            description: 'Teeth whitening involves bleaching your teeth to make them lighter. It can not make your teeth brilliant white, but it can lighten the existing color by.',
            img: whitening
        }

    ]
    return (
        <div className='mt-16 ' >
            <div className='text-center'>
                <h2 className='text-primary uppercase text-xl font-bold'>Our Services</h2>
                <h1>Services We Provide</h1>
            </div>
            <div className='sm:grid-cols-1 md:grid-cols-2 grid gap-8 lg:grid-cols-3'>
                {
                    serviceData.map(service => <Service key={service.id} service={service}></Service>)
                }
            </div>
            <div className="hero m-20">
                <div className="hero-content flex-col lg:flex-row ">

                    <img src={care} className="lg:w-1/2 rounded-lg shadow-2xl" alt='' />

                    <div>
                        <h1 className="text-5xl font-bold">Exceptional Dental Care, on Your Terms</h1>
                        <p className="py-6">Helping you smile.If your smile is not becoming to you, then you should be coming to me! Improving the world, one smile at a time.It is all about you.It is time to smile again.</p>
                        <Link to ='/appointment'><button className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white">Get Started</button></Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Services;