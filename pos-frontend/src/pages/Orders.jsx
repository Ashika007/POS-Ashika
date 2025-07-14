import React, { useState } from 'react'
import BottomNav from '../components/shared/BottomNav'
import OrderCard from '../components/orders/OrderCard'
import BackButton from '../components/shared/BackButton'
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getOrders } from '../https/index'
import OrderDetailsModal from '../components/orders/OrderDetailsModal';
import { enqueueSnackbar } from 'notistack'
import { useEffect } from 'react';

const Orders = () => {

    const [status, setStatus] = useState("all");
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        document.title = "POS | Orders"
    }, [])

    const { data: resData, isError } = useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            return await getOrders();
        },
        placeholderData: keepPreviousData
    })

    if (isError) {
        enqueueSnackbar("Something went wrong!", { variant: "error" })
    }
    console.log("Fetched orders data:", resData);


    return (
        <section className="bg-[#1f1f1f]  h-[calc(100vh-5rem)] overflow-hidden">
            <div className="flex items-center justify-between px-10 py-4">
                <div className="flex items-center gap-4"  >
                    <BackButton />
                    <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">Orders</h1>
                </div>

                {/* <div className="flex items-center justify-around gap-4">
                    <button onClick={() => setStatus("all")} className={`text-[#ababab] text-lg ${status === "all" && "bg-[#383838] rounded-lg px-5 py-2"}  rounded-lg px-5 py-2 font-semibold`}>
                        All
                    </button>

                </div> */}
            </div>

            <div className="flex flex-wrap items-start gap-6 px-12 py-4 overflow-y-auto scrollbar-hide h-[calc(100vh-5rem-5rem)]">
                {
                    resData?.data.data.filter(order => order.customerDetails?.name).length > 0 ? (
                        resData.data.data.filter(order => order.customerDetails?.name).map((order) => {
                            return <OrderCard key={order._id} order={order} />
                        })
                    ) : <p className="col-span-3 text-gray-500">No orders available, please create order.</p>
                }
            </div>

            <BottomNav />
            {selectedOrder && (
                <OrderDetailsModal
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                />
            )}
        </section>
    )
}

export default Orders