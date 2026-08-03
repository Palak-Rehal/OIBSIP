import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
} from "lucide-react";

const Contact = () => {
  return (
    <div className="bg-[#FAF7F2] pt-32 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <h1 className="text-5xl font-extrabold text-[#2E2B27]">
            Contact <span className="text-[#BD6A3C]">Us</span>
          </h1>

          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
            We'd love to hear from you. Whether you have a question,
            feedback or just want pizza recommendations, our team is here
            to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Left */}
          <div className="space-y-6">

            <div className="bg-white rounded-3xl shadow-md p-6 flex gap-5">
              <MapPin className="text-[#BD6A3C]" size={30} />

              <div>
                <h3 className="font-bold text-xl mb-2">
                  Visit Us
                </h3>

                <p className="text-gray-600">
                  PizzaHub Restaurant
                </p>

                <p className="text-gray-600">
                  Sector 34, Chandigarh, India
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-md p-6 flex gap-5">
              <Phone className="text-[#BD6A3C]" size={30} />

              <div>
                <h3 className="font-bold text-xl mb-2">
                  Phone
                </h3>

                <p className="text-gray-600">
                  +91 98765 43210
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-md p-6 flex gap-5">
              <Mail className="text-[#BD6A3C]" size={30} />

              <div>
                <h3 className="font-bold text-xl mb-2">
                  Email
                </h3>

                <p className="text-gray-600">
                  support@pizzahub.com
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-md p-6 flex gap-5">
              <Clock className="text-[#BD6A3C]" size={30} />

              <div>
                <h3 className="font-bold text-xl mb-2">
                  Opening Hours
                </h3>

                <p className="text-gray-600">
                  Monday - Sunday
                </p>

                <p className="text-gray-600">
                  10:00 AM - 11:00 PM
                </p>
              </div>
            </div>

          </div>

          {/* Right */}
          <div className="bg-white rounded-3xl shadow-lg p-8">

            <h2 className="text-3xl font-bold text-[#2E2B27] mb-6">
              Send us a Message
            </h2>

            <form className="space-y-5">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full border rounded-xl p-4 outline-none focus:border-[#BD6A3C]"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full border rounded-xl p-4 outline-none focus:border-[#BD6A3C]"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full border rounded-xl p-4 outline-none focus:border-[#BD6A3C]"
              />

              <textarea
                rows={6}
                placeholder="Write your message..."
                className="w-full border rounded-xl p-4 outline-none focus:border-[#BD6A3C]"
              />

              <button
                className="flex items-center justify-center gap-2 w-full bg-[#BD6A3C] text-white py-4 rounded-xl font-bold hover:bg-[#a85d34] transition"
              >
                <Send size={18} />
                Send Message
              </button>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;