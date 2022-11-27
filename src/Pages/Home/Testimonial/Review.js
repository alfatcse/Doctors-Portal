import React from 'react';

const Review = ({ review }) => {
    const { name, img, review: userReview, location } = review
    return (
        <section>
            <div className="card  bg-base-100 shadow-xl">
                <div className="card-body">
                    <p>{userReview}</p>
                    <div className="flex items-center ">
                        <div className="avatar mt-6 mr-6">
                            <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img alt='' src={img} />
                            </div>
                        </div>
                        <div>
                            <h5 className='text-lg'>{name}</h5>
                            <p>{location}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Review;