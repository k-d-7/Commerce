import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";
import { useEffect } from "react";
import supabase from "../../config/db";
import ProductCard from "@/components/product";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const getData = async () => {
        const { data: data, error } = await supabase.from("products").select("*");
        console.log(data, " ", error);
        if (error) {
            console.log("Fail to load data");
            console.log(error);
        } else {
            setData(data);
        }
        setLoading(false);
    };
    useEffect(() => {
        getData();
    }, []);
    console.log("loading: " + loading);
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
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <div className="z-10 w-full max-w-5xl items-center justify-between font-roboto text-sm lg:flex">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <h1 className="text-3xl font-bold mb-8">Products</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data.map((product: any) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        );
}
