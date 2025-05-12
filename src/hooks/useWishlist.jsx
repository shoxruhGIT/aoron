import { useEffect, useState } from "react";

const getWishlistFromStore = () => {
  const saved = localStorage.getItem("wishlist");
  return saved ? JSON.parse(saved) : [];
};

const saveWishlistToStorage = (wishlist) => {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  window.dispatchEvent(new Event("wishlistChanged"));
};

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState(getWishlistFromStore);

  useEffect(() => {
    const handleChange = () => {
      setWishlist(getWishlistFromStore);
    };

    window.addEventListener("wishlistChanged", handleChange);
    return () => window.removeEventListener("wishlistChanged", handleChange);
  }, []);

  const isInWishlist = (id) => {
    return wishlist.some((item) => item?.product?.id === id);
  };
  const toggleWishlist = (product) => {
    const exists = isInWishlist(product?.product?.id);

    setWishlist((prevWishlist) => {
      let updatedWishlist;

      if (exists) {
        updatedWishlist = prevWishlist.map((item) => {
          if (item?.product?.id === product?.product?.id) {
            return {
              ...item,
              quantity: item.quantity + 0.5,
            };
          }
          return item;
        });
      } else {
        updatedWishlist = [...prevWishlist, { ...product, quantity: 1 }];
      }

      saveWishlistToStorage(updatedWishlist);

      return updatedWishlist;
    });
  };

  const deleteWishlist = (product) => {
    const deletedProduct = wishlist.filter(
      (item) => item?.product?.id !== product?.product?.id
    );
    saveWishlistToStorage(deletedProduct);
    setWishlist(deletedProduct);
  };

  return {
    wishlist,
    toggleWishlist,
    deleteWishlist,
    isInWishlist,
    count: wishlist.length,
  };
};
