import React from "react";
import { FaCheckDouble, FaLongArrowAltRight } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import { formatDateAndTime, getAvatarName } from "../../utils/index";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateOrderStatus } from '../../https';
import { enqueueSnackbar } from 'notistack';

const OrderCard = ({ order, onClick }) => {

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate: changeStatus } = useMutation({
        mutationFn: ({ orderId, orderStatus }) => updateOrderStatus({ orderId, orderStatus }),
        onSuccess: () => {
            enqueueSnackbar('Order status updated!', { variant: 'success' });
            queryClient.invalidateQueries(['orders']);
        },
        onError: () => {
            enqueueSnackbar('Failed to update order status', { variant: 'error' });
        }
    });

    const handleEdit = () => {
        navigate('/menu', { state: { order } });
    };

    const handleStatusChange = (e) => {
        changeStatus({ orderId: order._id, orderStatus: e.target.value });
    };

    console.log(order);
    return (

        <div onClick={onClick}
            className="w-[500px] bg-[#262626] p-4 rounded-lg mb-4 cursor-pointer hover:bg-[#303030] transition-colors"
        >
            {/*  */}
            <div className="flex items-center gap-5">
                <button className="bg-[#f6b100] p-3 text-xl font-bold rounded-lg">
                    {getAvatarName(order.customerDetails.name)}
                </button>
                <div className="flex items-center justify-between w-[100%]">
                    <div className="flex flex-col items-start gap-1">
                        <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
                            {order.customerDetails.name}
                        </h1>
                        <p className="text-[#ababab] text-sm">#{Math.floor(new Date(order.orderDate).getTime())} / Dine in</p>
                        <p className="text-[#ababab] text-sm">Table <FaLongArrowAltRight className="text-[#ababab] ml-2 inline" />{order.table?.tableNo} </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <div className="text-yellow-600 bg-[#4a452e] px-2 py-1 rounded-lg" >
                            <button onClick={handleEdit}>Edit</button>
                        </div>
                        <select
                            className={`bg-[#1a1a1a] text-[#f5f5f5] border border-gray-500 p-2 rounded-lg focus:outline-none ${order.orderStatus === "Ready"
                                ? "text-green-500"
                                : "text-yellow-500"
                                }`}
                            value={order.orderStatus}
                            onChange={handleStatusChange}
                        >
                            <option className="text-yellow-500" value="In Progress">
                                In Progress
                            </option>
                            <option className="text-green-500" value="Ready">
                                Ready
                            </option>
                        </select>
                        {order.orderStatus === "Ready" ? (
                            <>
                                <p className="text-green-600 bg-[#2e4a40] px-2 py-1 rounded-lg">
                                    <FaCheckDouble className="inline mr-2" /> {order.orderStatus}
                                </p>
                                <p className="text-[#ababab] text-sm">
                                    <FaCircle className="inline mr-2 text-green-600" /> Ready to
                                    serve
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="text-yellow-600 bg-[#4a452e] px-2 py-1 rounded-lg">
                                    <FaCircle className="inline mr-2" /> {order.orderStatus}
                                </p>
                                <p className="text-[#ababab] text-sm">
                                    <FaCircle className="inline mr-2 text-yellow-600" /> Preparing your order
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center mt-4 text-[#ababab]">
                <p>{formatDateAndTime(order.orderDate)}</p>
                <p>{order.items.length} Items</p>
            </div>
            <hr className="w-full mt-4 border-t-1 border-gray-500" />
            <div className="flex items-center justify-between mt-4">
                <h1 className="text-[#f5f5f5] text-lg font-semibold">Total</h1>
                <p className="text-[#f5f5f5] text-lg font-semibold">Rs.{order.bills.totalWithTax.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default OrderCard;