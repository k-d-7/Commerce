import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IProduct } from "../interfaces/product.interface";
import { addToCart } from "@/redux/cartSlice";

type ProductProps = {
    product: IProduct;
};

const ProductCard: React.FC<ProductProps> = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddItem = (product: IProduct) => {
        dispatch(
            addToCart({
                id: product.id,
                name: product.name,
                desc: product.desc,
                price: product.price,
                sale_price: product.sale_price,
                quantity: 1,
                thumbnail: product.thumbnail,
            })
        );
    };

    let sale = ((product.price - product.sale_price) / product.price) * 100;
    return (
        <div className="py-1">
            <div className="flex max-w-md h-60 bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                    className="w-1/3 bg-cover"
                    src={product.thumbnail}
                    alt="Thumbnail"
                />
                <div className="w-2/3 p-4">
                    <h1 className="text-gray-900 font-bold text-2xl">
                        {product.name}
                    </h1>
                    <p className="mt-2 text-gray-600 text-sm">{product.desc}</p>
                    <p className="mt-2 text-gray-600 text-sm">
                        Sale off {sale} &#37;
                    </p>
                    <div className="flex item-center justify-between mt-3">
                        <h1 className="text-gray-700 font-bold text-xl">
                            {
                                (product.sale_price = 0
                                    ? product.price
                                    : product.sale_price)
                            }
                        </h1>
                        <button
                            className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded"
                            onClick={() =>
                                handleAddItem({
                                    id: product.id,
                                    name: product.name,
                                    desc: product.desc,
                                    price: product.price,
                                    sale_price: product.sale_price,
                                    thumbnail: product.thumbnail,
                                })
                            }
                        >
                            Add to Card
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
