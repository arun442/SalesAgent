import ContactForm from "../../components/Landing/ContactForm";
import Footer from "../../components/Landing/Footer";
import Navbar from "../../components/Landing/Navbar";

export const metadata = {
  title: "About Us | AIA - AI Agent",
  description:
    "Learn about Global Knowledge Technologies, creators of AIA - an AI Agent platform designed to help SMBs achieve business success through intelligent automation.",
};

export default function About() {
  return (
    <>
    <Navbar/>
     <section className="max-w-7xl mx-auto px-6 py-20 space-y-12 bg-white text-black">
      <div className="max-w-4xl mx-auto text-center font-roboto">
        <h1 className="text-4xl font-extrabold mb-6 font-poppins text-blue-700">
          About Global Knowledge Technologies
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed">
          Global Knowledge Technologies is dedicated to empowering small and
          medium businesses with advanced AI solutions designed to simplify
          complex business processes and accelerate revenue growth. Our
          flagship product, AIA — AI Agent — embodies this mission by
          delivering intelligent automation tailored specifically to your
          unique needs and business goals.
        </p>
      </div>

      <div
        id="contact"
        className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 items-stretch"
      >
        <div className="bg-blue-600 text-white rounded-lg p-8 flex flex-col justify-between shadow-lg">
          <div>
            <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
            <p className="mb-6 text-blue-100">
              We’ll create high-quality linkable content and build at least 40
              high-authority.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <span className="text-lg">📞</span>
                <span>+919876543210</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-lg">📧</span>
                <span>Support@gkt.ai</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-lg">📍</span>
                <span>Bengaluru, Karnataka</span>
              </li>
            </ul>
          </div>
          <div className="mt-6 rounded-full bg-white/20 w-24 h-24 self-end"></div>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-extrabold mb-6 font-poppins text-center text-blue-700">
            Contact Us
          </h2>
          <ContactForm />
        </div>
      </div>
    </section>
    <Footer/>
    </>
   
  );
}
