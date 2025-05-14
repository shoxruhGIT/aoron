import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { useWishlist } from "../hooks/useWishlist";
import axios from "axios";
import { toast } from "sonner";

const CheckourModal = ({ isOpen, onClose }) => {
  const { wishlist } = useWishlist();
  const [wishlistData, setWishlistData] = useState({
    name: "",
    phoneNumber: 0,
    email: "",
    country: "",
    city: "",
    whatsappNumber: "",
  });

  const handleDetails = (e) => {
    const { name, value } = e.target;

    setWishlistData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = `7356453117:AAGCcU1rfib6FYCKoJlt8-77Dgq5RK8UgkE`;
    const chat_id = `5625872174`;
    const URL = `https://api.telegram.org/bot${token}/sendMessage`;
    const text = `Sizga Yangi Xabar:
      \n Ism: ${wishlistData.name}
      \n Telefon raqami: ${wishlistData.phoneNumber}
      \n Email manzili: ${wishlistData.email}
      \n Davlati: ${wishlistData.country}
      \n City: ${wishlistData.city}
      \n Whatsapp raqami: ${wishlistData.whatsappNumber}
      \n Whishlist: ${wishlist}
      `;

    try {
      await axios.post(URL, {
        chat_id,
        text,
      });
      toast.success("Send successfully!");
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const resetFrom = () => {
    setWishlistData({
      name: "",
      phoneNumber: "",
      email: "",
      country: "",
      city: "",
      whatsappNumber: "",
      wishlist: null,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-[90vh] relative">
        <button
          onClick={() => {
            resetFrom(), onClose();
          }}
          className="absolute top-4 right-4 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
        >
          X
        </button>

        <div className="p-6">
          <h2 className="text-xl font-bold mb-6">Contact Information</h2>

          {/* Name field */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={wishlistData?.name}
              onChange={handleDetails}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>

          {/* Phone field */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Phone</label>
            <PhoneInput
              country={"uz"}
              value={wishlistData?.phoneNumber}
              onChange={(value) =>
                setWishlistData((prev) => ({
                  ...prev,
                  phoneNumber: value,
                }))
              }
              inputProps={{
                name: "phone",
                required: true,
                autoFocus: true,
              }}
              inputStyle={{
                width: "100%",
              }}
              autoFormat={true}
            />
          </div>

          {/* Email field */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={wishlistData?.email}
              onChange={handleDetails}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>

          {/* Country field */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Country</label>
            <div className="relative">
              <select
                id="country"
                name="country"
                value={wishlistData?.country}
                onChange={handleDetails}
                className="w-full border border-gray-300 rounded p-2 appearance-none"
              >
                <option value="">Please select</option>
                <option value="us">United States</option>
                <option value="ca">Canada</option>
                <option value="uk">United Kingdom</option>
                <option value="au">Australia</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          {/* City field */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              id="city"
              name="city"
              type="text"
              value={wishlistData?.city}
              onChange={handleDetails}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>

          {/* WhatsApp Number field */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">
              WhatsApp Number
            </label>
            <PhoneInput
              country={"uz"}
              value={wishlistData?.whatsappNumber}
              onChange={(value) =>
                setWishlistData((prev) => ({
                  ...prev,
                  whatsappNumber: value,
                }))
              }
              inputProps={{
                name: "phone",
                required: true,
                autoFocus: true,
              }}
              inputStyle={{
                width: "100%",
              }}
              autoFormat={true}
            />
          </div>

          {/* Send Message button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-black text-white py-3 rounded font-medium cursor-pointer hover:opacity-80 transition-colors"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckourModal;
