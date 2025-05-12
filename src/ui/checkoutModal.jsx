import PhoneInput from "react-phone-input-2";

export default function CheckourModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-[90vh] relative">
        <button
          onClick={onClose}
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
              type="text"
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>

          {/* Phone field */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Phone</label>
            <PhoneInput
              country={"uz"}
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
              type="email"
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>

          {/* Country field */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Country</label>
            <div className="relative">
              <select className="w-full border border-gray-300 rounded p-2 appearance-none">
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
              type="text"
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
          <button className="w-full bg-black text-white py-3 rounded font-medium cursor-pointer hover:opacity-80 transition-colors">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}
