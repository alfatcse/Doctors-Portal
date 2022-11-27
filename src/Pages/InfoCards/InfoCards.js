import React from 'react';
import clock from '../../assets/icons/clock.svg';
import marker from '../../assets/icons/marker.svg';
import phone from '../../assets/icons/phone.svg';
import Infocard from './Infocard';
const InfoCards = () => {
    const cardData=[
        {
            id:1,
            name:'Opening Hours',
            description:'Open 9.00 AM to 6.00 PM Monday-Friday',
            icon:clock,
            bgClass:'bg-gradient-to-r from-primary to-secondary'
        },
        {
           id:2,
           name:'Our Location',
           description:'Chemnitz,Germany',
           icon:marker,
           bgClass:'bg-accent'
        },
        {
            id:3,
            name:'Contact Us',
            description:'+11222343',
            icon:phone,
            bgClass:'bg-gradient-to-r from-primary to-secondary'
        }
    ]
    return (
        <div className='grid mt-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6' >
            {
                cardData.map(card=><Infocard key={card.id} card={card}></Infocard>)
            }
        </div>
    );
};

export default InfoCards;