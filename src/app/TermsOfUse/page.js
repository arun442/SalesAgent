"use client";
import { motion } from "framer-motion";
import {
  Shield,
  User,
  Globe,
  Database,
  Mail,
  Lock,
  FileText,
  ArrowLeft,
  ShieldAlert,
  Scale,
} from "lucide-react";
import Navbar from "../../components/Landing/Navbar";
import Footer from "../../components/Landing/Footer";

export default function TermsOfUse() {
  const description =
    "Please read these Terms of Use (“Terms”) carefully before accessing or using the AIA website or product (“Service”) provided by Global Knowledge Technologies. ";
  const sections = [
    {
      icon: <User className="w-8 h-8 text-blue-500" />,
      id: "1",
      title: "Acceptance of Terms ",
      content: (
        <>
          <p>
            By using this Service, you agree to these Terms. If you do not
            agree, do not use the Service.
          </p>
        </>
      ),
    },
    {
      icon: <FileText className="w-8 h-8 text-green-500" />,
      id: "2",

      title: "Use of the Service",
      content: (
        <ul className="list-disc ml-6 space-y-2">
          <li>
            You must be at least 18 years old and have the authority to enter
            into these Terms.{" "}
          </li>
          <li>
            You agree to use the Service only for lawful purposes and as
            permitted by these Terms and any applicable laws.
          </li>
        </ul>
      ),
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-500" />,
      id: "3",

      title: "User Accounts",
      content: (
        <ul className="list-disc ml-6 space-y-2">
          <li>
            You are responsible for maintaining the confidentiality of your
            login credentials.
          </li>
          <li>
            You must promptly notify us of unauthorized use or suspected
            security breach.
          </li>
        </ul>
      ),
    },
    {
      icon: <Database className="w-8 h-8 text-yellow-500" />,
      id: "4",

      title: "Prohibited Conduct ",
      content: (
        <>
          <p>You agree not to:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Violate any laws or regulations. </li>
            <li>
              Infringe on our or third party intellectual property rights.{" "}
            </li>
            <li>
              Attempt to gain unauthorized access, disrupt, or compromise
              Service security.{" "}
            </li>
            <li>
              Use the Service to transmit spam, malware, or harmful content.{" "}
            </li>
          </ul>
        </>
      ),
    },
    {
      icon: <Globe className="w-8 h-8 text-teal-500" />,
      id: "5",

      title: "Intellectual Property",
      content: (
        <div className="list-disc ml-6 space-y-2">
          <p>
            All content, trademarks, and technology on the website (except
            user-submitted content or clearly marked third-party content) are
            owned by Global Knowledge Technologies or its licensors.
          </p>
        </div>
      ),
    },
    {
      icon: <Globe className="w-8 h-8 text-teal-500" />,
      id: "6",

      title: "Disclaimer of Warranties ",
      content: (
        <div className="list-disc ml-6 space-y-2">
          <p>
            The Service is provided “as is” and “as available.” We make no
            warranties about accuracy, reliability, or suitability for any
            purpose.
          </p>
        </div>
      ),
    },
    {
      icon: <Globe className="w-8 h-8 text-teal-500" />,
      id: "7",

      title: "Limitation of Liability",
      content: (
        <div className="list-disc ml-6 space-y-2">
          <p>
            To the maximum extent permitted by law, Global Knowledge
            Technologies is not liable for any indirect, incidental, punitive,
            or consequential damages arising from your use of the Service.
          </p>
        </div>
      ),
    },
    {
      icon: <Globe className="w-8 h-8 text-teal-500" />,
      id: "8",

      title: "Termination",
      content: (
        <div className="list-disc ml-6 space-y-2">
          <p>
            We reserve the right to suspend or terminate your access to the
            Service at any time for violation of these Terms or abuse of the
            Service.
          </p>
        </div>
      ),
    },
    {
      icon: <Globe className="w-8 h-8 text-teal-500" />,
      id: "9",

      title: "Governing Law",
      content: (
        <div className="list-disc ml-6 space-y-2">
          <p>
            These Terms are governed by the laws of India. You agree to submit
            to the exclusive jurisdiction of courts in [your jurisdiction, e.g.,
            Bangalore, India].
          </p>
        </div>
      ),
    },
    {
      icon: <Mail className="w-8 h-8 text-pink-500" />,
      id: "10",
      title: " Updates to Terms",
      content: (
        <p>
          We may revise these Terms at our discretion at any time. Continued use
          of the Service after changes constitutes your acceptance of the new
          Terms.
        </p>
      ),
    },
    {
      icon: <Mail className="w-8 h-8 text-pink-500" />,
      id: "11",
      title: "Contact",
      content: (
        <p>
          For questions about these Terms, contact us at{" "}
          <a
            href="mailto:genquiry@globalknowledgetech.com"
            className="text-blue-600 underline"
          >
            [genquiry@globalknowledgetech.com]
          </a>
          .
        </p>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#f2fdfb] mx-auto">
      <Navbar />
      <div className="ml-10 pt-32">
        <div className="flex gap-3 items-center">
          <Scale
            color="blue"
            size={40}
            opacity={70}
            className="bg-blue-100 rounded-sm p-2"
          />
          <div>
            <h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-gray-800"
            >
              Terms of Use
            </h1>
          </div>
        </div>

        <p className="max-w-6xl mt-6 mx-auto text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-6 mt-10 px-6 mb-4">
        {sections.map((section, index) => (
          <div
            key={index}
            className="rounded-2xl p-2 md:p-2 flex flex-col gap-4 items-start"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="flex items-center justify-center w-10 h-10 text-blue-600 font-bold bg-blue-100 rounded-md">
                {section.id}
              </span>
              <h2 className="text-xl font-semibold text-gray-700">
                {section.title}
              </h2>
            </div>

            <div className="text-gray-600 space-y-2">{section.content}</div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
