import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingIndex, setUpdatingIndex] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem('cartItems');
        if (stored) {
            setCartItems(JSON.parse(stored));
        }
        setTimeout(() => setLoading(false), 700);
    }, []);

    const getTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleQuantityChange = (index, delta) => {
        setUpdatingIndex(index);

        setTimeout(() => {
            const updated = [...cartItems];
            updated[index].quantity += delta;
            if (updated[index].quantity <= 0) {
                updated.splice(index, 1);
                toast.info('🗑️ Item removed');
            } else {
                toast.success('Quantity updated');
            }
            setCartItems(updated);
            localStorage.setItem('cartItems', JSON.stringify(updated));
            setUpdatingIndex(null);
        }, 500);
    };

    return (
        <section className="max-w-4xl mx-auto px-4 py-10">
            <ToastContainer />
            <h1 className="text-2xl font-bold text-gray-800 mb-6">🛒 Your Shopping Cart</h1>

            {loading ? (
                <div className="space-y-5">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="p-4 rounded-xl bg-gray-100 animate-pulse h-24" />
                    ))}
                </div>
            ) : cartItems.length === 0 ? (
                <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>
            ) : (
                <div className="space-y-5">
                    {cartItems.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-16 w-16 object-contain rounded-md border"
                                />
                                <div className="space-y-1">
                                    <h2 className="font-semibold text-gray-800 text-sm md:text-base">{item.title}</h2>
                                    <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleQuantityChange(index, -1)}
                                    disabled={updatingIndex === index}
                                    className={`w-8 h-8 flex items-center justify-center text-lg rounded ${updatingIndex === index
                                        ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
                                        : 'bg-gray-200 hover:bg-gray-300'
                                        }`}
                                >
                                    −
                                </button>
                                <span className="px-2 font-medium">{item.quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange(index, 1)}
                                    disabled={updatingIndex === index}
                                    className={`w-8 h-8 flex items-center justify-center text-lg rounded ${updatingIndex === index
                                        ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
                                        : 'bg-gray-200 hover:bg-gray-300'
                                        }`}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="text-right mt-8">
                        <p className="text-lg font-semibold text-gray-700">
                            Total: <span className="text-blue-600">${getTotal().toFixed(2)}</span>
                        </p>
                        <button
                            onClick={() => toast.info('🛍️ Checkout coming soon!', {
                                position: 'top-center',
                                autoClose: 2000,
                            })}
                            className="mt-3 px-6 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                        >
                            Proceed to Checkout
                        </button>

                    </div>
                </div>
            )}
        </section>
    );
};

export default Cart;
