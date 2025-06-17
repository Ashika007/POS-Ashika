import React from 'react'
import { popularDrinks } from "../../constants";

const PopularDrinks = () => {
    return (
        <div className="mt-6 pr-6">
            <div className="bg-[#1a1a1a] w-full rounded-lg">
                <div className="flex justify-between items-center px-6 py-4">
                    <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
                        Popular Items
                    </h1>
                    <a href="" className="text-[#025cca] text-sm font-semibold">
                        View all
                    </a>
                </div>

                <div className="overflow-y-scroll h-[680px] scrollbar-hide">
                    {popularDrinks.map((drink) => {
                        return (
                            <div
                                key={drink.id}
                                className="flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-6 py-4 mt-4 mx-6"
                            >
                                <h1 className="text-[#f5f5f5] font-bold text-xl mr-4">{drink.id < 10 ? `0${drink.id}` : drink.id}</h1>
                                <img
                                    src={drink.image}
                                    alt={drink.name}
                                    className="w-[50px] h-[50px] rounded-full"
                                />
                                <div>
                                    <h1 className="text-[#f5f5f5] font-semibold tracking-wide">{drink.name}</h1>
                                    <p className="text-[#f5f5f5] text-sm font-semibold mt-1">
                                        <span className="text-[#ababab]">Orders: </span>
                                        {drink.numberOfOrders}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default PopularDrinks