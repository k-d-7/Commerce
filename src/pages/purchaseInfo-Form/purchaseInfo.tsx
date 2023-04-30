import React, { useState } from "react";
import supabase from "../../../config/db";
import router from "next/router";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/cartSlice";

export default function PurchaseInfo() {
    const dispatch = useDispatch();

    const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());
        const error = await insertData(data);
        if (error) {
            console.log("Fail to insert data");
            console.log(error);
        } else {
            dispatch(clearCart());
            alert("Thank you for your purchase!");
            router.push("/");
        }
    };

    const insertData = async (data: any) => {
        const { error } = await supabase.from("orders").insert({
            name: data.name,
            phone: data.phone,
            email: data.email,
            address: data.address,
        });
        return error;
    };

    return (
        <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px]">
                <form onSubmit={submitForm} method="POST">
                    <div className="mb-5">
                        <label
                            htmlFor="name"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            Name
                        </label>
                        <input
                            required
                            type="text"
                            name="name"
                            id="name"
                            placeholder="name"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="phone"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            Phone number
                        </label>
                        <input
                            required
                            type="number"
                            name="phone"
                            id="phone"
                            placeholder="phone number"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="email"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            Email
                        </label>
                        <input
                            required
                            type="email"
                            name="email"
                            id="email"
                            placeholder="email"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="address"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            Sale Price
                        </label>
                        <input
                            type="text"
                            name="address"
                            id="address"
                            placeholder="address"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
