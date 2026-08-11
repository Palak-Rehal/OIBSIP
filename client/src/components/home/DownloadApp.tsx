import { Apple, PlayCircle, Star } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

// Replace with your real app download link (e.g. a smart link that
// detects iOS/Android and redirects to the right store).
const APP_DOWNLOAD_URL = "#";

const DownloadApp = () => {
  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-6 py-16 sm:py-20">
      <div className="bg-[#F3E4D6] rounded-[2rem] px-6 sm:px-14 py-12 sm:py-16 grid md:grid-cols-2 gap-10 items-center overflow-hidden relative">
        <div className="absolute -bottom-20 -right-16 w-64 h-64 bg-[#BD6A3C]/15 blur-[100px] rounded-full" />

        <div className="relative">
          <p className="text-[#A85A2F] text-[13px] tracking-[0.2em] uppercase font-bold mb-3">
            Get the app
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2E2B27] mb-3">
            Order faster from your phone
          </h2>
          <p className="text-[14px] text-[#4A463F] max-w-sm mb-7">
            Track deliveries live, save your favorite orders, and get
            app-only offers.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#"
              className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#2E2B27] text-white hover:bg-[#1F1C18] transition-colors"
            >
              <Apple size={20} />
              <span className="text-left leading-tight">
                <span className="block text-[10px] text-[#C9C4BA]">Download on the</span>
                <span className="block text-[14px] font-bold">App Store</span>
              </span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#2E2B27] text-white hover:bg-[#1F1C18] transition-colors"
            >
              <PlayCircle size={20} />
              <span className="text-left leading-tight">
                <span className="block text-[10px] text-[#C9C4BA]">Get it on</span>
                <span className="block text-[14px] font-bold">Google Play</span>
              </span>
            </a>
          </div>

          <div className="flex items-center gap-2 mt-6">
            <div className="flex items-center gap-1">
              <Star size={14} className="text-[#E3A857] fill-[#E3A857]" />
              <span className="text-[13px] font-bold text-[#2E2B27]">4.8</span>
            </div>
            <span className="text-[12px] text-[#8A8477]">· 10k+ downloads</span>
          </div>

          {/* QR code — scan to download */}
          <div className="flex items-center gap-4 mt-7 bg-white/70 rounded-2xl px-4 py-3 w-fit">
            <div className="bg-white p-1 rounded-lg">
              <QRCodeSVG
                value={APP_DOWNLOAD_URL}
                size={76}
                bgColor="#FFFFFF"
                fgColor="#2E2B27"
                level="M"
              />
            </div>
            <div>
              <p className="text-[13px] font-bold text-[#2E2B27]">
                Scan to download
              </p>
              <p className="text-[11px] text-[#8A8477] max-w-[150px] mt-0.5">
                Point your camera at the code to get the app.
              </p>
            </div>
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="w-56 h-[380px] rounded-[2.5rem] bg-[#2E2B27] p-3 shadow-2xl">
            <div className="w-full h-full rounded-[1.75rem] bg-[#FAF7F2] flex items-center justify-center">
              <span className="text-[13px] text-[#A69D8C]">App preview</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
