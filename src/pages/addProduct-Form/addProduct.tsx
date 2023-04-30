import React, { useState } from "react";
import supabase from "../../../config/db";
import router from "next/router";

export default function addProduct() {
    const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());
        const error = await insertData(data);
        if (error) {
            console.log("Fail to insert data");
            console.log(error);
        } else {
            router.push("/");
        }
    };

    const insertData = async (data: any) => {
        const { error } = await supabase.from("products").insert({
            name: data.name,
            desc: data.desc,
            price: data.price,
            sale_price: data.sale_price,
            thumbnail: data.thumbnail,
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
                            htmlFor="desc"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            Description
                        </label>
                        <input
                            required
                            type="text"
                            name="desc"
                            id="desc"
                            placeholder="Description"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="price"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            Price
                        </label>
                        <input
                            required
                            type="number"
                            name="price"
                            id="price"
                            placeholder="Price"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="sale_price"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            Sale Price
                        </label>
                        <input
                            type="number"
                            name="sale_price"
                            id="sale_price"
                            placeholder="Sale Price"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="thumbnail"
                            className="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            Thumbnail
                        </label>
                        <input
                            type="text"
                            name="thumbnail"
                            id="thumbnail"
                            placeholder="URL"
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
