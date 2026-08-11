import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
} from "lucide-react";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import toast from "react-hot-toast";
 
const contactDetails = [
  {
    icon: MapPin,
    label: "Visit Us",
    lines: ["PizzaHub Restaurant", "Sector 34, Chandigarh, India"],
  },
  {
    icon: Phone,
    label: "Phone",
    lines: ["+91 98765 43210"],
  },
  {
    icon: Mail,
    label: "Email",
    lines: ["support@pizzahub.com"],
  },
  {
    icon: Clock,
    label: "Hours",
    lines: ["Mon – Sun, 10:00 AM – 11:00 PM"],
  },
];
 
const initialForm = { name: "", email: "", subject: "", message: "" };
 
const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [sending, setSending] = useState(false);
 
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
 
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in your name, email and message.");
      return;
    }
 
    setSending(true);
 
    // No backend endpoint exists yet to receive this message —
    // wire this up to a real /api/contact route before relying on it.
    setTimeout(() => {
      setSending(false);
      setForm(initialForm);
      toast.success("Thanks! We'll get back to you soon.");
    }, 600);
  };
 
  return (
    <div className="bg-[#FAF7F2] pt-24 pb-16 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
 
        {/* Compact heading */}
        <div className="text-center mb-10">
          <span className="text-xs font-bold tracking-wider text-[#D8531F] uppercase">
            Get in touch
          </span>
 
          <h1 className="text-3xl md:text-4xl font-black text-[#22281F] mt-2">
            Contact Us
          </h1>
 
          <p className="mt-2 text-gray-500 text-sm max-w-md mx-auto">
            Questions, feedback, or pizza recommendations — we usually
            reply within a few hours.
          </p>
        </div>
 
        <div className="bg-white rounded-[28px] shadow-[0_2px_24px_rgba(34,40,31,0.06)] border border-[#E7DED3] overflow-hidden grid md:grid-cols-[1fr_1.3fr]">
 
          {/* Left: compact info panel */}
          <div className="bg-[#22281F] text-white p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold mb-6">Contact Details</h2>
 
              <div className="space-y-5">
                {contactDetails.map(({ icon: Icon, label, lines }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-[#E88854]" />
                    </div>
 
                    <div>
                      <p className="text-xs uppercase tracking-wide text-white/50">
                        {label}
                      </p>
                      {lines.map((line) => (
                        <p key={line} className="text-sm text-white/90">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
 
            <div className="flex gap-3 mt-10">
              {[FaInstagram, FaFacebook, FaTwitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D8531F] transition"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
 
          {/* Right: compact form */}
          <div className="p-8">
            <h2 className="text-lg font-bold text-[#22281F] mb-5">
              Send a Message
            </h2>
 
            <form onSubmit={handleSubmit} className="space-y-4">
 
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Full Name"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#D8531F] focus:ring-2 focus:ring-[#D8531F]/15 transition"
                />
 
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Email Address"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#D8531F] focus:ring-2 focus:ring-[#D8531F]/15 transition"
                />
              </div>
 
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                type="text"
                placeholder="Subject"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#D8531F] focus:ring-2 focus:ring-[#D8531F]/15 transition"
              />
 
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder="Write your message..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#D8531F] focus:ring-2 focus:ring-[#D8531F]/15 transition resize-none"
              />
 
              <button
                type="submit"
                disabled={sending}
                className="flex items-center justify-center gap-2 w-full bg-[#D8531F] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#B8431A] transition disabled:opacity-50"
              >
                <Send size={15} />
                {sending ? "Sending..." : "Send Message"}
              </button>
 
            </form>
          </div>
 
        </div>
 
      </div>
    </div>
  );
};
 
export default Contact;