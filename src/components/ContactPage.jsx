import axios from "axios";
import { CgMail } from "react-icons/cg";
import { FiPhone } from "react-icons/fi";
import { MdOutlineLocationOn } from "react-icons/md";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const ContactPage = () => {
  const handleubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const message = e.target.message.value;
    const textMessage = `Ism: ${name} \nEmail: ${email} \nPhone: ${phone} \nMessage: ${message}`;

    const token = import.meta.env.VITE_BOT_TOKEN;
    const chat_id = import.meta.env.VITE_CHAT_ID;
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    axios
      .post(url, {
        data: {
          chat_id: chat_id,
          text: textMessage,
        },
      })
      .then((result) => {
        console.log("Send Message successfully");
        e.target.reset();
      })
      .catch((err) => {
        console.log("Send Message Failure");
      });
  };
  return (
    <main className="w-full grow pt-18">
      <section className="py-10 mt-3 md:py-16 bg-secondary">
        <div className="max-w-[1400px] mx-auto px-4 text-center">
          <h1 className="text-4xl font-medium mb-4">Contact Us</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Get in touch with us for any questions about our products or
            services.
          </p>
        </div>
      </section>
      <section className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="flex md:flex-row flex-col md:w-[80%] mx-auto p-10 gap-6 md:gap-0">
          <div className="md:w-[34%] w-full h-full order-2 md:order-0">
            <h1 className="font-medium text-lg mb-4">Contact information</h1>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-black/20 size-8 flex justify-center items-center">
                  <CgMail className="size-6" />
                </div>
                <div className="text-sm">
                  <p className="">Email</p>
                  <span className="text-black/60">msmukhlisss@gmail.com</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-black/20 size-8 flex justify-center items-center">
                  <FiPhone />
                </div>
                <div className="text-sm">
                  <p className="">Phone</p>
                  <span className="text-black/60 block">+998887666051</span>
                  <span className="text-black/60">Mon-Fri, 9am-6pm</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-black/20 size-8 flex justify-center items-center">
                  <MdOutlineLocationOn className="size-6" />
                </div>
                <div className="text-sm">
                  <p className="">Address</p>
                  <span className="text-black/60">Toshkent,Yunusobot</span>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-[66%] w-full">
            <h1 className="font-medium text-lg mb-4">Contact Form</h1>
            <form
              className="flex gap-4 flex-col justify-start"
              onSubmit={handleubmit}
            >
              <div className="flex md:flex-row flex-col justify-between md:gap-6 gap-4">
                <label className="md:w-1/2 w-full ">
                  <span className="font-medium block mb-2">Name</span>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="border border-black/30 rounded-md py-1 px-2 w-full "
                    required
                  />
                </label>
                <label className="md:w-1/2 w-full">
                  <span className="font-medium block mb-2">Email</span>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="border border-black/30 rounded-md py-1 px-2 w-full "
                    required
                  />
                </label>
              </div>
              <label className="w-full">
                <span className="font-medium block mb-2">Phone</span>
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
              </label>
              <label>
                <span className="font-medium block mb-2">Message</span>
                <textarea
                  name="message"
                  id="message"
                  className="border border-black/30 rounded-md py-1 px-2 w-full"
                  rows="5"
                  required
                ></textarea>
              </label>
              <button
                type="submit"
                className="w-fit py-2 px-4 rounded-md font-medium text-white bg-black hover:bg-black/80 transition-all"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
      <div className=" bg-[#F4F4F5] flex flex-col justify-center pb-10 pt-6">
        <div className="w-[42%] mx-auto">
          <h1 className="text-2xl font-light text-center my-8">
            Frequently Asked Questions
          </h1>
          <div className="flex flex-row gap-10">
            <div className="flex flex-col bg-white p-6 rounded-md w-1/2">
              <h1 className="font-medium mb-2">How do I find my size?</h1>
              <p className="text-black/50 text-sm">
                You can refer to our size guide which is available on each
                product page. If you're still unsure, feel free to contact our
                customer support team for assistance
              </p>
            </div>
            <div className="flex flex-col bg-white p-6 rounded-md w-1/2">
              <h1 className="font-medium mb-2">What is your return policy?</h1>
              <p className="text-black/50 text-sm">
                We offer a 30 day return policy for unworn items in their
                original packaging. Please visit our Returns & Exchanges page
                for more details .
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
