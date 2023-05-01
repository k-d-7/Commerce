import React, { useEffect, useState } from 'react'
import supabase from '../../../config/db';

export default function OrderTable() {

    //fetch data from join table
    const [data, setData] = useState<any>(null);
    //fetch data from order table
    const [order, setOrder] = useState<any>(null);
    //fetch data from product table
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const getData = async () => {
        const { data, error } = await supabase.from("orders_products").select("*");
        console.log(data, " ", error);
        if (error) {
            console.log("Fail to load data from join table");
            console.log(error);
        } else {
            setData(data);
            setLoading(false);
        }
    };

    const getOrder = async (id: number) => {
        const { data, error } = await supabase.from("orders").select("*").filter("id", "eq", id).single();
        console.log(id);
        // console.log(order, " ", error);
        if (error) {
            console.log("Fail to load data from order table");
            console.log(error);
        } else {
            setOrder(data);
        }
    };

    const getProduct = async (id: number) => {
        const { data, error } = await supabase.from("products").select("*").filter("id", "eq", id).single();
        console.log(id);
        // console.log(product, " ", error);
        if (error) {
            console.log("Fail to load data from product table");
            console.log(error);
        } else {
            setProduct(data);
        }
    };


    useEffect(() => {
        getData();
    }, []);
    
    if (loading) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <div className="h-screen bg-white">
                    <div className="flex justify-center items-center h-full">
                        <img
                            className="h-16 w-16"
                            src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
                            alt=""
                        />
                    </div>
                </div>
            </main>
        );
    } else
    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full">
                            <thead className="bg-white border-b">
                                <tr>
                                    <th
                                        scope="col"
                                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                    >
                                        #
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                    >
                                        Customer&#39;s Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                    >
                                        Phone
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                    >
                                        Email
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                    >
                                        Address
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                    >
                                        Product
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                    >
                                        Quantity
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((item: any) => {
                                        getOrder(item.order_id);
                                        getProduct(item.product_id);                                       
                                        return (
                                            <tr className="bg-gray-100 border-b" key={item.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {item.id}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {order.name}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {order.phone}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {order.email}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {order.address}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {product.name}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {item.quantity}
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}