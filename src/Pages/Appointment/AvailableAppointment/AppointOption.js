import React from 'react';

const AppointOption = ({ option }) => {
    const { name, slots } = option;
    return (
        <div className="card  shadow-xl">
            <div className="card-body text-center">
                <h2 className="text-2xl text-secondary font-bold text-center">{name}</h2>
                <p>{slots.length>0?slots[0]:'Try Another Day'}</p>
                <p>{slots.length} {slots.length>1?'Spaces':'Space'} Available</p>
                <div className="card-actions justify-center">
                    <button className="btn btn-primary text-white font-bold">Book Appointment</button>
                </div>
            </div>
        </div>
    );
};

export default AppointOption;