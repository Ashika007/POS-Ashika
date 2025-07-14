import React from "react";
import { useNavigate } from "react-router-dom";
import { getAvatarName, getBgColor } from "../../utils"
import { useDispatch } from "react-redux";
import { updateTable } from "../../redux/slices/customerSlices";
import { FaLongArrowAltRight } from "react-icons/fa";
import { updateTable as updateTableApi } from '../../https';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';

const TableCard = ({ id, name, status, initials, seats, orderStatus }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: clearTable } = useMutation({
        mutationFn: () => updateTableApi({ tableId: id, status: 'Available', currentOrder: null }),
        onSuccess: () => {
            enqueueSnackbar('Table cleared!', { variant: 'success' });
            queryClient.invalidateQueries(['tables']);
            queryClient.invalidateQueries(['orders']);
        },
        onError: () => {
            enqueueSnackbar('Failed to clear table', { variant: 'error' });
        }
    });

    const handleClick = (name) => {
        if (status === "Booked") return;
        const table = { tableId: id, tableNo: name }
        dispatch(updateTable({ table }))
        navigate(`/menu`);
    };

    return (
        <div onClick={() => handleClick(name)} key={id} className="w-full sm:w-[300px] hover:bg-[#2c2c2c] bg-[#262626] p-4 rounded-lg cursor-pointer">
            <div className="flex items-center justify-between px-1">
                <h1 className="text-[#f5f5f5] text-xl font-semibold">Table <FaLongArrowAltRight className="text-[#ababab] ml-2 inline" /> {name}</h1>
                <p className={`${status === "Booked" ? "text-green-600 bg-[#2e4a40]" : "bg-[#664a04] text-white"} px-2 py-1 rounded-lg`}>
                    {status}
                </p>
            </div>
            <div className="flex items-center justify-center mt-5 mb-8">
                <h1 className={`text-white rounded-full p-5 text-xl`} style={{ backgroundColor: initials ? getBgColor() : "#1f1f1f" }} >{getAvatarName(initials) || "N/A"}</h1>
            </div>
            <p className="text-[#ababab] text-xs">Seats: <span className="text-[#f5f5f5]">{seats}</span></p>
            {status === 'Booked' && orderStatus === 'Ready' && (
                <button
                    className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                    onClick={e => { e.stopPropagation(); clearTable(); }}
                >
                    Clear Table
                </button>
            )}
        </div>
    );
};

export default TableCard;