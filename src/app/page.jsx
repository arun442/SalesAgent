import Hero from "../components/Landing/Hero";
import MarketResearch from "../components/Landing/MarketResearch";
import Footer from "../components/Landing/Footer";
export const metadata = {
  title: "Home | AIA - AI Agent",

  description:
    "Meet AIA — Your Intelligent Business Growth Partner. Empower your business with a collaborative AI Agent system designed to boost growth via market research, leads, and sales outreach.",
};

export default function Home() {  
  return (
    <div>
      <Hero />
      <div className="bg-white text-black">
        <section className="max-w-7xl mx-auto px-6 py-20 text-black">
          <h2 className="text-4xl font-extrabold text-center mb-4 font-poppins">
            Why Choose AIA?
          </h2>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition duration-300">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white text-2xl shadow-lg">
                📊
              </div>
              <h3 className="text-xl font-semibold mb-3 font-poppins">
                Comprehensive Market Insights
              </h3>
              <p className="text-gray-600 font-roboto">
                In-depth research tailored to your product and sector for
                strategic advantage.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition duration-300">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white text-2xl shadow-lg">
                🎯
              </div>
              <h3 className="text-xl font-semibold mb-3 font-poppins">
                Targeted Lead Generation
              </h3>
              <p className="text-gray-600 font-roboto">
                Find and prioritize your ideal prospects to maximize conversion
                potential.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition duration-300">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white text-2xl shadow-lg">
                🤖
              </div>
              <h3 className="text-xl font-semibold mb-3 font-poppins">
                Automated Sales Campaigns
              </h3>
              <p className="text-gray-600 font-roboto">
                End-to-end campaign execution from content creation to
                follow-ups, powered by AI.
              </p>
            </div>
          </div>
        </section>

        <MarketResearch />

        <section
          id="demo"
          className="relative overflow-hidden py-10 px-6 text-center font-roboto bg-white"
        >
          <svg
            className="absolute top-0 left-0 w-56 h-56 md:w-72 md:h-72 -translate-x-1/2 -translate-y-1/2 animate-pulse"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M200 100C200 155.228 155.228 200 100 200C44.7715 200 0 155.228 0 100C0 44.7715 44.7715 0 100 0C155.228 0 200 44.7715 200 100ZM30 100C30 138.66 61.3401 170 100 170C138.66 170 170 138.66 170 100C170 61.3401 138.66 30 100 30C61.3401 30 30 61.3401 30 100Z"
              fill="url(#grad1)"
            />
            <defs>
              <linearGradient
                id="grad1"
                x1="0"
                y1="0"
                x2="200"
                y2="200"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#A855F7" />
                <stop offset="1" stopColor="#6366F1" />
              </linearGradient>
            </defs>
          </svg>

          <svg
            className="absolute bottom-0 right-0 w-56 h-56 md:w-72 md:h-72 translate-x-1/2 translate-y-1/2 animate-pulse"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M200 100C200 155.228 155.228 200 100 200C44.7715 200 0 155.228 0 100C0 44.7715 44.7715 0 100 0C155.228 0 200 44.7715 200 100ZM30 100C30 138.66 61.3401 170 100 170C138.66 170 170 138.66 170 100C170 61.3401 138.66 30 100 30C61.3401 30 30 61.3401 30 100Z"
              fill="url(#grad2)"
            />
            <defs>
              <linearGradient
                id="grad2"
                x1="0"
                y1="0"
                x2="200"
                y2="200"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#A855F7" />
                <stop offset="1" stopColor="#6366F1" />
              </linearGradient>
            </defs>
          </svg>

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full mb-4"></span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-4 font-poppins">
              Interested in AIA?
            </h2>
            <p className="text-gray-700 mb-8 max-w-xl mx-auto">
              Request a personalized demo to see how AIA can grow your business.{" "}
            </p>
            <a
              href="/About"
              className="inline-block bg-gradient-to-r cursor-pointer from-purple-500 to-indigo-500 text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition"
            >
              Request Demo
            </a>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}
