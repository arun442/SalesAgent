"use client"; 

import { motion } from "framer-motion";
import FeatureCard from "../../components/Landing/FeaturedCard";
import {
  AcademicCapIcon,
  UserGroupIcon,
  PencilIcon,
  ChartBarIcon,
  SpeakerWaveIcon,
  AdjustmentsHorizontalIcon,
  ArrowPathIcon,
  CpuChipIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import Header from '../../components/Landing/Navbar'
import Footer from "../../components/Landing/Footer";
import { useRouter } from "next/navigation";



const features = [
  {
    icon: <AcademicCapIcon className="w-12 h-12 mx-auto text-blue-600" />,
    title: "Market Research Agent",
    description:
      "Generates detailed market reports tailored to your product and sector, empowering you with actionable business intelligence.",
  },
  {
    icon: <UserGroupIcon className="w-12 h-12 mx-auto text-blue-600" />,
    title: "Leads Agent",
    description:
      "Identifies high-potential leads based on market analytics, helping focus your sales efforts efficiently.",
  },
  {
    icon: <PencilIcon className="w-12 h-12 mx-auto text-blue-600" />,
    title: "Content Agent",
    description:
      "Crafts compelling marketing content customized for email, SMS, WhatsApp, Instagram, and more.",
  },
  {
    icon: <ChartBarIcon className="w-12 h-12 mx-auto text-blue-600" />,
    title: "Campaign Strategy Agent",
    description:
      "Designs effective multi-phase campaigns with communication rules and dynamic lead ranking.",
  },
  {
    icon: <SpeakerWaveIcon className="w-12 h-12 mx-auto text-blue-600" />,
    title: "Outreach Agent",
    description:
      "Executes personalized communications to leads, ensuring timely and impactful contact.",
  },
  {
    icon: <AdjustmentsHorizontalIcon className="w-12 h-12 mx-auto text-blue-600" />,
    title: "Tracking & Follow-up Agent",
    description:
      "Analyzes lead behavior to prioritize outreach and maximize conversion rates.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Features() {

  const router= useRouter();
  return (
    <>
    <Header/>
        <section className="max-w-7xl mx-auto px-6 py-20 bg-white text-black">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="inline-block bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
          AI-Powered Solutions
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-poppins">
          Our Intelligent <span className="text-blue-600">Agents</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Autonomous AI agents working together to streamline your marketing and sales processes.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {features.map(({ icon, title, description }, index) => (
          <motion.div key={title} variants={itemVariants}>
            <FeatureCard
              icon={icon}
              title={title}
              description={description}
              delay={index * 0.1}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-24 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <CpuChipIcon className="w-16 h-16 text-blue-600" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-poppins">
                How Our AI Agents Work Together
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <SparklesIcon className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">1. Connect Your Business</h3>
                    <p className="text-gray-600">
                      Provide basic information about your product and target market.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <ArrowPathIcon className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">2. Autonomous Execution</h3>
                    <p className="text-gray-600">
                      Our AI agents collaborate to research, strategize, and execute your campaign.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <ChartBarIcon className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">3. Optimize & Scale</h3>
                    <p className="text-gray-600">
                      Review real-time insights and refine strategies for maximum impact.
                    </p>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
               onClick={()=>router.push('/About')}
                className="inline-block mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
              >
                Request a Demo →
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mt-24 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 font-poppins">
          Why Choose Our AI Agents?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm"
          >
            <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6">
              <SparklesIcon className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">24/7 Automation</h3>
            <p className="text-gray-600">
              Our agents work around the clock to research, analyze, and execute your campaigns.
            </p>
          </motion.div>
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm"
          >
            <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6">
              <ArrowPathIcon className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Continuous Learning</h3>
            <p className="text-gray-600">
              AI models improve with each interaction, delivering better results over time.
            </p>
          </motion.div>
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm"
          >
            <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6">
              <AdjustmentsHorizontalIcon className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Seamless Integration</h3>
            <p className="text-gray-600">
              Works with your existing tools and platforms for a smooth workflow.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
    <Footer/>
    </>

  );
}