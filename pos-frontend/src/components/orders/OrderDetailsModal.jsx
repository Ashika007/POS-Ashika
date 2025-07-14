import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrder, deleteOrder } from '../../https/index';
import { enqueueSnackbar } from 'notistack';

const OrderDetailsModal = ({ order, onClose }) => {
    const queryClient = useQueryClient();

    // Track customer name in state
    const [customerName, setCustomerName] = useState(order.customerDetails.name);

    const { mutate: updateMutate } = useMutation({
        mutationFn: (data) => updateOrder(order._id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(["orders"]);
            enqueueSnackbar("Order updated successfully!", { variant: "success" });
            onClose();
        }
    });

    const { mutate: deleteMutate } = useMutation({
        mutationFn: () => deleteOrder(order._id),
        onSuccess: () => {
            queryClient.invalidateQueries(["orders"]);
            enqueueSnackbar("Order deleted successfully!", { variant: "success" });
            onClose();
        }
    });

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-[#2a2a2a] rounded-lg p-6 w-full max-w-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-white">Order Details</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <FaTimes size={24} />
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="flex gap-4">
                        <input
                            type="text"
                            value={customerName}
                            onChange={e => setCustomerName(e.target.value)}
                            className="bg-[#333] text-white p-2 rounded flex-1"
                        />
                        <input
                            type="text"
                            defaultValue={order.table?.tableNo}
                            className="bg-[#333] text-white p-2 rounded w-24"
                            disabled
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => updateMutate({
                                orderStatus: "Completed",
                                customerDetails: {
                                    ...order.customerDetails,
                                    name: customerName
                                }
                            })}
                            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                        >
                            Mark as Completed
                        </button>
                        <button
                            onClick={deleteMutate}
                            className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
                        >
                            Delete Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsModal;
