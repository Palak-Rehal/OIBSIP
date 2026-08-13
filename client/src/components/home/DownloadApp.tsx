import { Apple, PlayCircle, Star } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

// Replace this with your real app download link later
const APP_DOWNLOAD_URL = "#";

const DownloadApp = () => {
  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-6 py-16 sm:py-20">

      <div className="bg-[#F3E4D6] rounded-[2rem] px-6 sm:px-14 py-12 sm:py-16 grid md:grid-cols-2 gap-10 items-center overflow-hidden relative">

        {/* Background glow */}
        <div className="absolute -bottom-20 -right-16 w-64 h-64 bg-[#BD6A3C]/15 blur-[100px] rounded-full" />

        {/* ================= LEFT ================= */}

        <div className="relative z-10">

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


          {/* App buttons */}

          <div className="flex flex-col sm:flex-row gap-3">

            <a
              href="#"
              className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#2E2B27] text-white hover:bg-[#1F1C18] transition-colors"
            >
              <Apple size={20} />

              <span className="text-left leading-tight">
                <span className="block text-[10px] text-[#C9C4BA]">
                  Download on the
                </span>

                <span className="block text-[14px] font-bold">
                  App Store
                </span>
              </span>
            </a>


            <a
              href="#"
              className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#2E2B27] text-white hover:bg-[#1F1C18] transition-colors"
            >
              <PlayCircle size={20} />

              <span className="text-left leading-tight">
                <span className="block text-[10px] text-[#C9C4BA]">
                  Get it on
                </span>

                <span className="block text-[14px] font-bold">
                  Google Play
                </span>
              </span>
            </a>

          </div>


          {/* Rating */}

          <div className="flex items-center gap-2 mt-6">

            <div className="flex items-center gap-1">

              <Star
                size={14}
                className="text-[#E3A857] fill-[#E3A857]"
              />

              <span className="text-[13px] font-bold text-[#2E2B27]">
                4.8
              </span>

            </div>

            <span className="text-[12px] text-[#8A8477]">
              · 10k+ downloads
            </span>

          </div>


          {/* QR Code */}

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


        {/* ================= PHONE PREVIEW ================= */}

        <div className="relative flex justify-center lg:justify-end lg:pr-12 z-10">

          {/* Phone frame */}
          <div className="relative w-[270px] h-[540px] rounded-[46px] bg-[#292622] p-[10px] shadow-[0_25px_60px_rgba(46,43,39,0.30)]">

            {/* Screen */}
            <div className="relative w-full h-full overflow-hidden rounded-[37px] bg-[#FAF7F2]">

              {/* Dynamic Island */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[82px] h-[22px] bg-[#292622] rounded-full z-30" />

              {/* ================= HOME PAGE ================= */}

              <div className="h-full flex flex-col">

                {/* HEADER */}
                <div className="px-4 pt-11 flex-shrink-0">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-[7px] text-[#8A8477]">
                        Good afternoon 👋
                      </p>

                      <h3 className="text-[15px] font-black text-[#2E2B27]">
                        PizzaHub
                      </h3>

                    </div>

                    <div className="w-8 h-8 rounded-full bg-[#BD6A3C] flex items-center justify-center text-white font-black text-xs">
                      P
                    </div>

                  </div>

                  {/* Search */}
                  <div className="mt-3 bg-white rounded-xl h-9 px-3 flex items-center gap-2 shadow-sm">

                    <span className="text-[#9B9489] text-[11px]">
                      ⌕
                    </span>

                    <span className="text-[8px] text-[#A69D8C]">
                      Search your favorite pizza
                    </span>

                  </div>

                </div>


                {/* HERO */}
                <div className="px-4 mt-4 flex-shrink-0">

                  <p className="text-[7px] uppercase tracking-[0.18em] font-bold text-[#BD6A3C]">
                    Freshly baked
                  </p>

                  <h2 className="text-[20px] leading-[1.05] font-black text-[#2E2B27] mt-1">

                    Delicious pizza

                    <br />

                    <span className="text-[#BD6A3C]">
                      delivered hot.
                    </span>

                  </h2>

                  <p className="text-[8px] text-[#777067] mt-2 leading-3">
                    Handmade with fresh ingredients,
                    <br />
                    loaded with flavor.
                  </p>

                  <button className="mt-3 bg-[#292622] text-white text-[9px] font-bold px-5 py-2 rounded-full shadow-md">
                    Order Now
                  </button>

                </div>


                {/* PIZZA FEATURE */}
                <div className="px-4 mt-4 flex-shrink-0">

                  <div className="relative h-[125px] rounded-[22px] bg-[#F3E0CF] overflow-hidden flex items-center justify-center">

                    {/* Decorative glow */}
                    <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full bg-white/30 blur-xl" />

                    <div className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full bg-[#BD6A3C]/10 blur-xl" />

                    {/* Pizza */}
                    <div className="text-[78px] drop-shadow-[0_10px_10px_rgba(46,43,39,0.18)]">
                      🍕
                    </div>

                  </div>

                </div>


                {/* FEATURES */}
                <div className="px-4 mt-3 flex-shrink-0">

                  <div className="grid grid-cols-3 gap-2">

                    <div className="bg-white rounded-xl py-2 text-center shadow-sm">

                      <div className="text-[13px]">
                        🔥
                      </div>

                      <p className="text-[6px] font-bold text-[#2E2B27]">
                        Fresh
                      </p>

                    </div>


                    <div className="bg-white rounded-xl py-2 text-center shadow-sm">

                      <div className="text-[13px]">
                        ⚡
                      </div>

                      <p className="text-[6px] font-bold text-[#2E2B27]">
                        Fast
                      </p>

                    </div>


                    <div className="bg-white rounded-xl py-2 text-center shadow-sm">

                      <div className="text-[13px]">
                        ⭐
                      </div>

                      <p className="text-[6px] font-bold text-[#2E2B27]">
                        4.9 Rated
                      </p>

                    </div>

                  </div>

                </div>


                {/* POPULAR PIZZA */}
                <div className="px-4 mt-3 flex-shrink-0">

                  <div className="flex items-center justify-between">

                    <h3 className="text-[10px] font-black text-[#2E2B27]">
                      Popular Pizzas
                    </h3>

                    <span className="text-[7px] font-bold text-[#BD6A3C]">
                      See all
                    </span>

                  </div>


                  <div className="flex gap-2 mt-2">

                    <div className="flex-1 bg-white rounded-xl p-1.5 shadow-sm">

                      <div className="h-[45px] rounded-lg bg-[#F3E0CF] flex items-center justify-center">

                        <span className="text-[32px]">
                          🍕
                        </span>

                      </div>

                      <div className="flex items-center justify-between mt-1">

                        <p className="text-[7px] font-black text-[#2E2B27]">
                          Margherita
                        </p>

                        <p className="text-[7px] font-bold text-[#BD6A3C]">
                          ₹199
                        </p>

                      </div>

                    </div>


                    <div className="flex-1 bg-white rounded-xl p-1.5 shadow-sm">

                      <div className="h-[45px] rounded-lg bg-[#F3E0CF] flex items-center justify-center">

                        <span className="text-[32px]">
                          🍕
                        </span>

                      </div>

                      <div className="flex items-center justify-between mt-1">

                        <p className="text-[7px] font-black text-[#2E2B27]">
                          Farmhouse
                        </p>

                        <p className="text-[7px] font-bold text-[#BD6A3C]">
                          ₹249
                        </p>

                      </div>

                    </div>

                  </div>

                </div>


                {/* BOTTOM NAV */}
                <div className="absolute bottom-0 left-0 right-0 h-[58px] bg-white border-t border-[#E9E1D7] px-5 flex items-center">

                  <div className="w-full flex items-center justify-between">

                    <div className="text-center">

                      <div className="text-[12px]">
                        🏠
                      </div>

                      <p className="text-[6px] font-bold text-[#BD6A3C]">
                        Home
                      </p>

                    </div>


                    <div className="text-center">

                      <div className="text-[12px]">
                        🍕
                      </div>

                      <p className="text-[6px] text-[#8A8477]">
                        Menu
                      </p>

                    </div>


                    <div className="text-center">

                      <div className="text-[12px]">
                        🛒
                      </div>

                      <p className="text-[6px] text-[#8A8477]">
                        Cart
                      </p>

                    </div>


                    <div className="text-center">

                      <div className="text-[12px]">
                        👤
                      </div>

                      <p className="text-[6px] text-[#8A8477]">
                        Profile
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>
      </div>

    </section>
  );
};

export default DownloadApp;