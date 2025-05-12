import React, { useEffect, useState } from "react";
import { useWishlist } from "../hooks/useWishlist";
import { IoMdClose } from "react-icons/io";
import { FiMinus, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { IoWarningOutline } from "react-icons/io5";
import CheckourModal from "../ui/checkoutModal";

const CartPage = () => {
  const { wishlist, deleteWishlist, updateWishlistQuantity } = useWishlist();

  const [totalPrice, setTotalPrice] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState();

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  useEffect(() => {
    const total = wishlist.reduce(
      (sum, item) => sum + item?.price * item?.quantity,
      0
    );

    setTotalPrice(total);
  }, [wishlist]);

  return (
    <main className="w-full grow pt-18">
      <section className="max-w-[1400px] mx-auto px-4 mt-4 py-8">
        <h1 className="text-4xl text-center font-normal mb-8">Your Cart</h1>
        {wishlist.length >= 1 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <CheckourModal isOpen={isOpenModal} onClose={closeModal} />
            <div className="lg:col-span-2 space-y-6">
              {wishlist?.map((item) => (
                <div
                  key={item?.id}
                  className="flex gap-4 border border-border rounded-lg p-4 animate-fade-in"
                >
                  <div className="w-26 h-32  bg-secondary/20 rounded-md overflow-hidden">
                    <img
                      src={`https://testaoron.limsa.uz/${item?.images[0]}`}
                      alt={item?.title_en}
                    />
                  </div>
                  <div className="grow sm:ml-4">
                    <div className="flex justify-between items-center">
                      <div className="">
                        <h3 className="font-medium">{item?.title_en}</h3>
                        <div className="">
                          <p className="text-muted-foreground text-sm">
                            Sizes: {item?.activeSize}
                          </p>
                          <p className="text-muted-foreground text-sm">
                            Colors: {item?.activeColor}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteWishlist(item)}
                        className="cursor-pointer"
                      >
                        <IoMdClose />
                      </button>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center border border-input rounded-md w-32">
                        <button
                          onClick={() => {
                            if (item.quantity > 1) {
                              updateWishlistQuantity(
                                item?.id,
                                item.quantity - 1
                              );
                            }
                          }}
                          className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-50"
                        >
                          <FiMinus />
                        </button>
                        <input
                          type="number"
                          className="w-12 h-10 text-center border-none focus:outline-none"
                          min={1}
                          value={item?.quantity}
                          onChange={(e) => {
                            const value = Math.max(
                              1,
                              parseInt(e.target.value) || 1
                            );
                            updateWishlistQuantity(item?.id, value);
                          }}
                        />
                        <button
                          onClick={() => {
                            updateWishlistQuantity(item?.id, item.quantity + 1);
                          }}
                          className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground"
                        >
                          <FiPlus />
                        </button>
                      </div>
                      <p className="font-medium">
                        ${item?.price * item?.quantity}.00
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="max-h-[350px] bg-secondary p-6 rounded-lg">
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${totalPrice}.00</span>
                </div>
                <div className="pt-3 border-t border-border flex justify-between font-medium">
                  <span>Total</span>
                  <span>${totalPrice}.00</span>
                </div>
                <button
                  onClick={openModal}
                  className="w-full btn-secondary bg-accent-foreground! cursor-pointer hover:opacity-80 transition-colors text-white mb-4"
                >
                  Checkout
                </button>
                <Link
                  to="/catalog"
                  className="block w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Continue Shopping
                </Link>
                <div className="flex items-center gap-2 mt-8">
                  <IoWarningOutline />
                  <p className="text-xs text-muted-foreground">
                    Delivery service is paid separately..
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-shopping-bag cursor-pointer"
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                  <path d="M3 6h18"></path>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-medium">Your cart is empty</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Looks like you haven't added anything to your cart yet.
            </p>
            <button className="btn-secondary bg-accent-foreground! text-white hover:opacity-80 transition-colors cursor-pointer mt-4 inline-block">
              <Link to="/catalog">Continue Shopping</Link>
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default CartPage;
