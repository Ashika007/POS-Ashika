import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import { MdRestaurantMenu } from "react-icons/md";
import MenuContainer from "../components/menu/MenuContainer";
import CustomerInfo from "../components/menu/CustomerInfo";
import CartInfo from "../components/menu/CartInfo";
import Bill from "../components/menu/Bill";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { removeAllItems, addItems } from "../redux/slices/cartSlice";

const Menu = () => {

    const customerData = useSelector(state => state.customer);
    const location = useLocation();
    const previousOrder = location.state?.order;
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [originalOrderId, setOriginalOrderId] = useState(null);

    // Initialize cart with previous order items if editing
    useEffect(() => {
        if (previousOrder) {
            setIsEditing(true);
            setOriginalOrderId(previousOrder._id);
            
            // Clear existing cart and add previous order items
            dispatch(removeAllItems());
            
            // Convert previous order items to cart format
            const cartItems = previousOrder.items.map(item => ({
                id: new Date().getTime() + Math.random(), // Generate unique ID
                name: item.name,
                pricePerQuantity: item.pricePerQuantity || item.price / item.quantity,
                quantity: item.quantity,
                price: item.price
            }));
            
            // Add items to cart
            cartItems.forEach(item => {
                dispatch(addItems(item));
            });
        }
    }, [previousOrder, dispatch]);

    return (
        <section className="bg-[#1f1f1f] overflow-hidden flex gap-3 overflow-y-scroll h-[680px] scrollbar-hide">
            {/* Left Div */}
            <div className="flex-[3]">
                <div className="flex items-center justify-between px-10 py-4">
                    <div className="flex items-center gap-4">
                        <BackButton />
                        <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">
                            {isEditing ? 'Edit Order' : 'Menu'}
                        </h1>
                    </div>
                    <div className="flex items-center justify-around gap-4">
                        <div className="flex items-center gap-3 cursor-pointer">
                            <MdRestaurantMenu className="text-[#f5f5f5] text-4xl" />
                            <div className="flex flex-col items-start">
                                <h1 className="text-md text-[#f5f5f5] font-semibold tracking-wide">
                                    {isEditing ? previousOrder?.customerDetails?.name : (customerData.customerName || "Customer Name")}
                                </h1>
                                <p className="text-xs text-[#ababab] font-medium">
                                    Table:{isEditing ? previousOrder?.table?.tableNo : (customerData.table?.tableNo || "N/A")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <MenuContainer />
            </div>
            {/* Right Div */}
            <div className="flex-[1] bg-[#1a1a1a] mt-4 mr-3 h-[780px] rounded-lg pt-2 ">
                {/* Customer Info */}
                <CustomerInfo isEditing={isEditing} previousOrder={previousOrder} />
                <hr className="border-[#2a2a2a] border-t-2" />
                {/* Cart Items */}
                <CartInfo />
                <hr className="border-[#2a2a2a] border-t-2" />
                {/* Bills */}
                <Bill isEditing={isEditing} originalOrderId={originalOrderId} previousOrder={previousOrder} />
            </div>

            <BottomNav />
        </section>
    )
}

export default Menu