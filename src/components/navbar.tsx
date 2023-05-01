import { useEffect, useState } from "react";
import {
    useUser,
    useSupabaseClient,
    useSession,
} from "@supabase/auth-helpers-react";
import { useSelector } from "react-redux";
import Link from "next/link";
import supabase from "./../../config/db";
import { selectCartItems } from "@/redux/cartSlice";

const Navbar = () => {
    const session = useSession();
    const supabase = useSupabaseClient();
    const cart = useSelector(selectCartItems);
    const [haveCart, setCart] = useState(false);

    useEffect(() => {
        if (cart.length > 0) {
            setCart(true);
        } else {
            setCart(false);
        }
    }, [cart]);

    return (
        <nav className="flex justify-between bg-gray-900 text-white w-screen">
            <div className="px-5 xl:px-12 py-6 flex w-full items-center">
                <Link href="/" legacyBehavior>
                    <a className="text-3xl font-bold font-heading" href="#">
                        Kds ECommerce
                    </a>
                </Link>
                <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                    <li>
                        <a className="hover:text-gray-200" href="#"></a>
                    </li>
                    <li>
                        <a className="hover:text-gray-200" href="#"></a>
                    </li>
                    <li>
                        <a className="hover:text-gray-200" href="#"></a>
                    </li>
                
                </ul>
                <div className="hidden xl:flex items-center space-x-5 items-center">
                    <Link href="/cart/cart" legacyBehavior>
                        <a
                            className="flex items-center hover:text-gray-200"
                            href="#"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            <span className="flex absolute -mt-5 ml-4">
                                {
                                    haveCart ? 
                                    (
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                                    )
                                    : 
                                    null
                                }
                            </span>
                        </a>
                    </Link>
                    {!session ? (
                        <Link href="/auth/login" legacyBehavior>
                            <a
                                href="#"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Sign In
                            </a>
                        </Link>
                    ) : (
                        <div>
                            <Link href="/addProduct-Form/addProduct" legacyBehavior>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-1"
                                >
                                    Add Product
                                </button>
                            </Link>
                            <Link href="/orderTable/orderTable" legacyBehavior>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-1"
                                >
                                    View Orders
                                </button>
                            </Link>
                            <Link href="/" legacyBehavior>
                                <button
                                    className="bg-blue-500 item-end hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => {
                                        supabase.auth.signOut();
                                    }}
                                >
                                    Log Out
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
