import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTotalPrice } from "../../redux/slices/cartSlice";
import { addOrder, updateOrder, updateTable } from "../../https/index";
import { enqueueSnackbar } from "notistack";
import { useMutation } from "@tanstack/react-query";
import { removeAllItems } from "../../redux/slices/cartSlice";
import { removeCustomer } from "../../redux/slices/customerSlices";
import Invoice from "../invoice/Invoice";
import paymentQR from "../../assets/images/paymentQR.jpg"; // Adjust the import path as necessary



const Bill = ({ isEditing, originalOrderId, previousOrder }) => {
    const dispatch = useDispatch();

    const customerData = useSelector((state) => state.customer);
    const cartData = useSelector((state) => state.cart);
    const total = useSelector(getTotalPrice);
    const taxRate = 5.25;
    const tax = (total * taxRate) / 100;
    const totalPriceWithTax = total + tax;

    const [showInvoice, setShowInvoice] = useState(false);
    const [orderInfo, setOrderInfo] = useState();
    const [paymentMethod, setPaymentMethod] = useState("Cash");
    const [showQRImage, setShowQRImage] = useState(false);
    const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);

    // Helper to get correct customer details
    const getCustomerDetails = () => {
        if (isEditing && previousOrder && previousOrder.customerDetails) {
            // If Redux state is empty, use previousOrder's details
            if (!customerData.customerName && !customerData.customerPhone && !customerData.guests) {
                return {
                    name: previousOrder.customerDetails.name,
                    phone: previousOrder.customerDetails.phone,
                    guests: previousOrder.customerDetails.guests,
                };
            }
        }
        // Otherwise, use Redux state
        return {
            name: customerData.customerName,
            phone: customerData.customerPhone,
            guests: customerData.guests,
        };
    };

    const handlePlaceOrder = async () => {
        if (!paymentMethod) {
            enqueueSnackbar("Please select a payment method!", {
                variant: "warning",
            });

            return;
        }

        if (paymentMethod === "Online") {
            // display QR code for online payment
            return;
        } else {
            // Place the order or update existing order
            const orderData = {
                customerDetails: getCustomerDetails(),
                orderStatus: "In Progress",
                bills: {
                    total: total,
                    tax: tax,
                    totalWithTax: totalPriceWithTax,
                },
                items: cartData,
                table: customerData.table.tableId,
                paymentMethod: paymentMethod,
            };

            if (isEditing) {
                orderUpdateMutation.mutate({ orderId: originalOrderId, data: orderData });
            } else {
                orderMutation.mutate(orderData);
            }
        }
    };

    const orderMutation = useMutation({
        mutationFn: (reqData) => addOrder(reqData),
        onSuccess: (resData) => {
            const { data } = resData.data;
            console.log(data)
            setOrderInfo(data);

            const tableData = {
                status: "Booked",
                orderId: data._id,
                tableId: data.table,
            };

            tableUpdateMutation.mutate(tableData);

            enqueueSnackbar("Order Placed!", {
                variant: "success",
            });

            setShowInvoice(true);
        },
        onError: (error) => {
            console.log(error);
            enqueueSnackbar("Failed to place order", {
                variant: "error",
            });
        },
    });

    const orderUpdateMutation = useMutation({
        mutationFn: ({ orderId, data }) => updateOrder(orderId, data),
        onSuccess: (resData) => {
            const { data } = resData.data;
            console.log(data)
            setOrderInfo(data);

            enqueueSnackbar("Order Updated!", {
                variant: "success",
            });

            setShowInvoice(true);
        },
        onError: (error) => {
            console.log(error);
            enqueueSnackbar("Failed to update order", {
                variant: "error",
            });
        },
    });

    const tableUpdateMutation = useMutation({
        mutationFn: (reqData) => updateTable(reqData),
        onSuccess: () => {
            if (!isEditing) {
                dispatch(removeCustomer());
            }
            dispatch(removeAllItems());
        },
        onError: (error) => {
            console.log(error);
        },
    });

    return (
        <>
            <div className="flex items-center justify-between px-5 mt-2">
                <p className="text-xs text-[#ababab] font-medium mt-2">
                    Items({cartData.length})
                </p>
                <h1 className="text-[#f5f5f5] text-md font-bold">
                    Rs.{total.toFixed(2)}
                </h1>
            </div>
            <div className="flex items-center justify-between px-5 mt-2">
                <p className="text-xs text-[#ababab] font-medium mt-2">Tax(5.25%)</p>
                <h1 className="text-[#f5f5f5] text-md font-bold">Rs.{tax.toFixed(2)}</h1>
            </div>
            <div className="flex items-center justify-between px-5 mt-2">
                <p className="text-xs text-[#ababab] font-medium mt-2">
                    Total With Tax
                </p>
                <h1 className="text-[#f5f5f5] text-md font-bold">
                    Rs.{totalPriceWithTax.toFixed(2)}
                </h1>
            </div>
            <div className="flex items-center gap-3 px-5 mt-4">
                <button
                    onClick={() => setPaymentMethod("Cash")}
                    className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold ${paymentMethod === "Cash" ? "bg-[#383737]" : ""
                        }`}
                >
                    Cash
                </button>
                <button
                    onClick={() => {
                        setPaymentMethod("Online");
                        setShowQRImage(true); // Show the image when Online is selected
                    }}

                    className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold ${paymentMethod === "Online" ? "bg-[#383737]" : ""
                        }`}
                >
                    Online
                </button>

                {showQRImage && (
                    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex flex-col justify-center items-center px-4">
                        <div className="bg-[#1f1f1f] p-6 rounded-lg shadow-xl text-center max-w-sm w-full">
                            <p className="text-white text-lg font-semibold mb-4">
                                Scan QR to pay Rs.{totalPriceWithTax.toFixed(2)}
                            </p>
                            <img
                                src={paymentQR}
                                alt="QR Code"
                                className="w-70 h-100 mx-auto rounded-lg mb-6 border-4 border-white"
                            />
                            <button
                                onClick={() => {
                                    setIsPaymentConfirmed(true);
                                    setShowQRImage(false); // Hide the modal
                                    handlePlaceOrder(); // Place order after confirming
                                }}
                                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg text-lg font-semibold transition-all"
                            >
                                ✅ Confirm Payment
                            </button>
                            <button
                                onClick={() => {
                                    setShowQRImage(false);
                                    setIsPaymentConfirmed(false);
                                }}
                                className="bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

            </div >

            <div className="flex items-center gap-3 px-5 mt-4">
                <button className="bg-[#025cca] px-4 py-3 w-full rounded-lg text-[#f5f5f5] font-semibold text-lg">
                    Print Receipt
                </button>
                <button
                    onClick={handlePlaceOrder}
                    className="bg-[#f6b100] px-4 py-3 w-full rounded-lg text-[#1f1f1f] font-semibold text-lg"
                >
                    {isEditing ? 'Update Order' : 'Place Order'}
                </button>



            </div>



            {
                showInvoice && (
                    <Invoice orderInfo={orderInfo} setShowInvoice={setShowInvoice} />
                )
            }
        </>
    );

    // return (
    //     <>
    //         <div className="flex items-center justify-between px-5 mt-2">
    //             <p className="text-xs text-[#ababab] font-medium mt-2">
    //                 Items({cartData.length})
    //             </p>
    //             <h1 className="text-[#f5f5f5] text-md font-bold">
    //                 Rs.{total.toFixed(2)}
    //             </h1>
    //         </div>
    //         <div className="flex items-center justify-between px-5 mt-2">
    //             <p className="text-xs text-[#ababab] font-medium mt-2">Tax(5.25%)</p>
    //             <h1 className="text-[#f5f5f5] text-md font-bold">Rs.{tax.toFixed(2)}</h1>
    //         </div>
    //         <div className="flex items-center justify-between px-5 mt-2">
    //             <p className="text-xs text-[#ababab] font-medium mt-2">
    //                 Total With Tax
    //             </p>
    //             <h1 className="text-[#f5f5f5] text-md font-bold">
    //                 Rs.{totalPriceWithTax.toFixed(2)}
    //             </h1>
    //         </div>

    //         <div className="flex items-center gap-3 px-5 mt-4">
    //             <button
    //                 onClick={handlePlaceOrder}
    //                 className="bg-[#025cca] px-4 py-3 w-full rounded-lg text-[#f5f5f5] font-semibold text-lg"
    //             >
    //                 Pay with Cash & Print Invoice
    //             </button>
    //         </div>

    //         {showInvoice && (
    //             <Invoice orderInfo={orderInfo} setShowInvoice={setShowInvoice} />
    //         )}
    //     </>
    // );
};

export default Bill;
