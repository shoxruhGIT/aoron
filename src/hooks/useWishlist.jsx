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
    return wishlist.some((item) => item?.id === id);
  };
  const toggleWishlist = (product) => {
    const exists = isInWishlist(product?.id);

    setWishlist((prevWishlist) => {
      let updatedWishlist;

      if (exists) {
        updatedWishlist = prevWishlist.map((item) => {
          if (item?.id === product?.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });
      } else {
        updatedWishlist = [...prevWishlist, { ...product }];
      }

      saveWishlistToStorage(updatedWishlist);

      return updatedWishlist;
    });
  };
  const updateWishlistQuantity = (id, quantity) => {
    const updatedWishlist = wishlist.map((item) => {
      if (item?.id === id) {
        return { ...item, quantity };
      }
      return item;
    });

    saveWishlistToStorage(updatedWishlist);
    setWishlist(updatedWishlist);
  };

  const deleteWishlist = (product) => {
    const deletedProduct = wishlist.filter(
      (item) => item?.id !== product?.id
    );
    saveWishlistToStorage(deletedProduct);
    setWishlist(deletedProduct);
  };

  return {
    wishlist,
    updateWishlistQuantity,
    toggleWishlist,
    deleteWishlist,
    isInWishlist,
    count: wishlist.length,
  };
};
