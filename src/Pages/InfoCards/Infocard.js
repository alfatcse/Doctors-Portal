import React from 'react';

const Infocard = ({ card }) => {
    const { name, description, icon, bgClass } = card;
    return (
        <div className={`card lg:card-side shadow-xl ${bgClass} p-6 text-white`}>
            <figure>
                <img src={icon} alt="Movie" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default Infocard;