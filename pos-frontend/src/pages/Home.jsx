import React from 'react'
import BottomNav from '../components/shared/BottomNav';
import Greetings from '../components/home/Greetings';
import MiniCard from '../components/home/MiniCard';
import RecentOrders from '../components/home/RecentOrders';
import PopularDrinks from '../components/home/popularDrinks';
import { FaRupeeSign } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";

const Home = () => {
    return (
        <section className="bg-[#1f1f1f]  h-[calc(100vh-5rem)] overflow-hidden flex gap-3">
            {/* Left Div */}
            <div className="flex-[3] ">
                <Greetings />
                <div className="flex items-center w-full gap-3 px-8 mt-8">
                    <MiniCard title="Total Earnings" icon={<FaRupeeSign />} number={512} footerNum={1.6} />
                    <MiniCard title="In Progress" icon={<GrInProgress />} number={16} footerNum={3.6} />
                </div>
                <RecentOrders />
            </div>

            {/* Right Div */}
            <div className="flex-[2]">
                <PopularDrinks />
            </div>

            <BottomNav />
        </section >
    )
}

export default Home;