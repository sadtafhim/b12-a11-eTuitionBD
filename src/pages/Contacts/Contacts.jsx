import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contacts = () => {
  return (
    <section className="bg-[--color-base-100] py-20 lg:py-28 font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold uppercase text-accent tracking-wider font-heading">
            Get in Touch
          </h2>
          <h1 className="text-4xl lg:text-5xl font-extrabold mt-2 text-base-content font-heading">
            We're Ready to Help
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 bg-base-200 rounded-xl shadow-2xl overflow-hidden">
          <div className="lg:col-span-2 p-8 md:p-12">
            <h3 className="text-3xl font-heading font-bold text-base-content mb-6">
              Send Us a Message
            </h3>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Full Name"
                  className="input input-bordered w-full bg-base-100 text-base-content"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="input input-bordered w-full bg-base-100 text-base-content"
                  required
                />
              </div>

              <input
                type="text"
                placeholder="Subject"
                className="input input-bordered w-full bg-color-base-100 text-base-content"
                required
              />

              <textarea
                placeholder="Your Message..."
                className="textarea textarea-bordered h-40 w-full bg-base-100 text-base-content"
                required
              ></textarea>

              <button
                type="submit"
                className="btn btn-primary font-heading text-primary-content rounded-lg shadow-md transition-transform hover:scale-[1.02]"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="p-8 md:p-12 bg-primary text-primary-content flex flex-col justify-center">
            <h3 className="text-3xl font-heading font-bold mb-8">
              Contact Information
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <FaPhoneAlt className="text-xl mt-1 text-accent" />
                <div>
                  <h4 className="font-semibold text-lg">Call Us</h4>
                  <p className="opacity-90">+880 1XXXXXXXXX</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <FaEnvelope className="text-xl mt-1 text-accent" />
                <div>
                  <h4 className="font-semibold text-lg">Email Us</h4>
                  <p className="opacity-90">support@etuitionbd.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FaMapMarkerAlt className="text-xl mt-1 text-accent " />
                <div>
                  <h4 className="font-semibold text-lg">Our Office</h4>
                  <p className="opacity-90">
                    123, Tutor Lane, Dhaka, Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
