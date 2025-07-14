import React from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { getOrders } from "../../https/index";
import { formatDateAndTime } from "../../utils";

const Payments = () => {
    const { data: resData, isError } = useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            return await getOrders();
        },
        placeholderData: keepPreviousData,
    });

    if (isError) {
        enqueueSnackbar("Something went wrong!", { variant: "error" });
    }

    // Calculate total revenue
    const totalRevenue = resData?.data?.data?.reduce((total, order) => {
        return total + (order.bills?.totalWithTax || 0);
    }, 0) || 0;

    // Group orders by payment method
    const paymentMethodStats = resData?.data?.data?.reduce((stats, order) => {
        const method = order.paymentMethod || 'Unknown';
        if (!stats[method]) {
            stats[method] = { count: 0, total: 0 };
        }
        stats[method].count += 1;
        stats[method].total += (order.bills?.totalWithTax || 0);
        return stats;
    }, {}) || {};

    return (
        <div className="container mx-auto space-y-6">
            {/* Revenue Summary */}
            <div className="bg-[#262626] p-6 rounded-lg">
                <h2 className="text-[#f5f5f5] text-xl font-semibold mb-4">
                    Payment Summary
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-[#1a1a1a] p-4 rounded-lg">
                        <h3 className="text-[#ababab] text-sm font-medium">Total Revenue</h3>
                        <p className="text-[#f5f5f5] text-2xl font-bold">Rs. {totalRevenue.toFixed(2)}</p>
                    </div>
                    <div className="bg-[#1a1a1a] p-4 rounded-lg">
                        <h3 className="text-[#ababab] text-sm font-medium">Total Orders</h3>
                        <p className="text-[#f5f5f5] text-2xl font-bold">{resData?.data?.data?.length || 0}</p>
                    </div>
                    <div className="bg-[#1a1a1a] p-4 rounded-lg">
                        <h3 className="text-[#ababab] text-sm font-medium">Average Order Value</h3>
                        <p className="text-[#f5f5f5] text-2xl font-bold">
                            Rs. {resData?.data?.data?.length ? (totalRevenue / resData.data.data.length).toFixed(2) : '0.00'}
                        </p>
                    </div>
                    <div className="bg-[#1a1a1a] p-4 rounded-lg">
                        <h3 className="text-[#ababab] text-sm font-medium">Payment Methods</h3>
                        <p className="text-[#f5f5f5] text-2xl font-bold">{Object.keys(paymentMethodStats).length}</p>
                    </div>
                </div>
            </div>

            {/* Payment Method Breakdown */}
            <div className="bg-[#262626] p-6 rounded-lg">
                <h3 className="text-[#f5f5f5] text-lg font-semibold mb-4">
                    Payment Method Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(paymentMethodStats).map(([method, stats]) => (
                        <div key={method} className="bg-[#1a1a1a] p-4 rounded-lg">
                            <h4 className="text-[#f5f5f5] font-semibold">{method}</h4>
                            <p className="text-[#ababab] text-sm">Orders: {stats.count}</p>
                            <p className="text-[#f5f5f5] text-lg font-bold">Rs. {stats.total.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Detailed Payment Records */}
            <div className="bg-[#262626] p-4 rounded-lg">
                <h2 className="text-[#f5f5f5] text-xl font-semibold mb-4">
                    Payment Records
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-[#f5f5f5]">
                        <thead className="bg-[#333] text-[#ababab]">
                            <tr>
                                <th className="p-3">Order ID</th>
                                <th className="p-3">Customer</th>
                                <th className="p-3">Payment Method</th>
                                <th className="p-3">Date & Time</th>
                                <th className="p-3">Subtotal</th>
                                <th className="p-3">Tax</th>
                                <th className="p-3">Total Amount</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resData?.data.data.map((order, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-gray-600 hover:bg-[#333]"
                                >
                                    <td className="p-4">#{Math.floor(new Date(order.orderDate).getTime())}</td>
                                    <td className="p-4">{order.customerDetails?.name || 'N/A'}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            order.paymentMethod === 'Cash' ? 'bg-green-100 text-green-800' :
                                            order.paymentMethod === 'Card' ? 'bg-blue-100 text-blue-800' :
                                            order.paymentMethod === 'QR' ? 'bg-purple-100 text-purple-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                            {order.paymentMethod}
                                        </span>
                                    </td>
                                    <td className="p-4">{formatDateAndTime(order.orderDate)}</td>
                                    <td className="p-4">Rs. {order.bills?.subtotal?.toFixed(2) || '0.00'}</td>
                                    <td className="p-4">Rs. {order.bills?.tax?.toFixed(2) || '0.00'}</td>
                                    <td className="p-4 font-semibold">Rs. {order.bills?.totalWithTax?.toFixed(2) || '0.00'}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            order.orderStatus === 'Ready' ? 'bg-green-100 text-green-800' :
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {order.orderStatus}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Payments; 