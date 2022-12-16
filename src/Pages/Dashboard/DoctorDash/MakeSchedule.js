import React from 'react';
import chair from '../../../assets/images/chair.png';
import { DayPicker, DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';
import backImg from '../../../assets/images/bg.png'
import { useState } from 'react';
const MakeSchedule = () => {
    const d = new Date();
    var option = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const initialDays = d;
    // console.log('in', initialDays);
    const d1 = new Date();
    const [days, setDays] = useState();
    const [daySlot, setdaySlot] = useState([{
        date: '',
        slot:''
    }])
    // if (days && days.length > 0) {
    //     days.map(d => {
    //         console.log('ddd::', d);
    //     })
    // }
    const footer =
        days && days.length > 0 ? (
            <p>You selected {days.length} day(s).</p>
        ) : (
            <p>Please pick one or more days.</p>
        );
    const handleSlot = (date) => {
        //console.log(date)
        const c=[];
        date.map(d=>{
            const a={
                date:d,
                slot:'10-12'
            }
            c.push(a);
        })
        //console.log(c);
        setdaySlot(c);
    }
    console.log(daySlot)
    return (
        <section>
            <header className='my-6' style={{ backgroundImage: `url(${backImg})` }}>
                <div className="hero ">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <img src={chair} alt='dentist chair' className="max-w-sm  rounded-lg shadow-2xl" />
                        <div className='mr-6'>
                            <DayPicker
                                mode="multiple"
                                min={1}
                                selected={days}
                                onSelect={setDays}
                                footer={footer}
                            />

                        </div>
                    </div>
                </div>
               
            </header>
            <label onClick={()=>handleSlot(days)} htmlFor='slot-modal' className="btn ml-20 btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-primary">Add Slot</label>
            {
                <>
                    <input type="checkbox" id="slot-modal" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
                            {/* {
                                days.map(d => console.log('date' ,d))
                            } */}
                            <div className="modal-action">
                                <label htmlFor="slot-modal" className="btn">Yay!</label>
                            </div>
                        </div>
                    </div>
                </>}
        </section>
    );
};

export default MakeSchedule;