import React, { useState } from "react";
import { MdTableBar } from "react-icons/md";
import Metrics from "../components/dashboard/Metrics";
import RecentOrders from "../components/dashboard/RecentOrders";
import Payments from "../components/dashboard/Payments";
import Modal from "../components/dashboard/Modal";

const buttons = [
    { label: "Add Table", icon: <MdTableBar />, action: "table" },
   
];

const tabs = ["Metrics", "Orders", "Payments"];


const Dashboard = () => {

    // useEffect(() => {
    //     document.title = "POS | Admin Dashboard"
    // }, [])

    const [isTableModalOpen, setIsTableModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("Metrics");

    const handleOpenModal = (action) => {
        if (action === "table") setIsTableModalOpen(true);
    };

    return (
        <div className="bg-[#1f1f1f] h-[calc(100vh-5rem)]">
            <div className="container mx-auto flex items-center justify-between py-14 px-6 md:px-4">
                <div className="flex items-center gap-3">
                    {buttons.map(({ label, icon, action }) => {
                        return (
                            <button
                                onClick={() => handleOpenModal(action)}
                                className="bg-[#1a1a1a] hover:bg-[#262626] px-8 py-3 rounded-lg text-[#f5f5f5] font-semibold text-md flex items-center gap-2"
                            >
                                {label} {icon}
                            </button>
                        );
                    })}
                </div>

                <div className="flex items-center gap-3">
                    {tabs.map((tab) => {
                        return (
                            <button
                                // onClick={() => handleOpenModal(action)}
                                className="bg-[#1a1a1a] hover:bg-[#262626] px-8 py-3 rounded-lg text-[#f5f5f5] font-semibold text-md flex items-center gap-2"
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        );
                    })}
                </div>
            </div>

            {activeTab === "Metrics" && <Metrics />}
            {activeTab === "Orders" && <RecentOrders />}
            {activeTab === "Payments" && <Payments />}

            {isTableModalOpen && <Modal setIsTableModalOpen={setIsTableModalOpen} />}
        </div>
    )
}

export default Dashboard