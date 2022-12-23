import React, { useState } from 'react';
import Subscribe from './Subscribe';

const Aboutus = () => {
    const [subscribed, setSubscribed] = useState(false)
    return (
        <div className="bg-gradient-to-tr from-red-500 to-purple-400 relative h-screen w-screen max-w-6xl mx-auto">
            <img
                className="absolute border-rounded inset-0 w-full h-full object-cover mix-blend-multiply filter brightness-50"
                alt="main background image"
                src="https://res.cloudinary.com/dmsgdonea/image/upload/v1671711744/wallpaperflare.com_wallpaper_gre6zp.jpg"
            />

            <div className="absolute inset-0 flex flex-col justify-center items-center w-5/6 max-w-lg mx-auto text-center">
                {subscribed ? (
                    <h1 className="font-primary font-extrabold text-white text-3xl sm:text-4xl md:text-5xl md:leading-snug">
                        You have subscribed!
                    </h1>
                ) : (
                    <div className="space-y-8">
                        <h1 className="font-primary font-extrabold text-white text-3xl sm:text-4xl md:text-5xl md:leading-tight">
                            Just Give us your E-mail , We will keep you {' '}
                            <span className="text-palette-primary  text-blue-600">
                                Updated .
                            </span>
                        </h1>
                        <p className="font-secondary text-palette-light  text-white text-base md:text-lg lg:text-xl">
                            About our sales and promotions.
                        </p>
                        <input type="email"

                            className="input input-bordered w-full max-w-xs" />
                        <h1 className='text-center mt-5 font-bold mb-3 text-blue-600'>  <button className="btn  btn-outline btn-primary">Subscribe Our News Latter</button></h1>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Aboutus;