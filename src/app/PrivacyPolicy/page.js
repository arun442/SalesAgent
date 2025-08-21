"use client";
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
} from "lucide-react";
import Navbar from "../../components/Landing/Navbar";
import Footer from "../../components/Landing/Footer";



export default function PrivacyPolicy() {
  const description =
    "Welcome to the AIA website operated by Global Knowledge Technologies (“we,” “us,” or “our”). We value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, store, and safeguard information when you interact with our website and services.";

  const sections = [
    {
      icon: <User className="w-8 h-8 text-blue-500" />,
      id: "1",
      title: "Information We Collect",
      content: (
        <>
          <p>
            <strong>"Personal Information"</strong> Information you provide, such
            as name, email, company details, phone, account, or billing info
            when you register, contact us, or purchase services.
          </p>
          <p>
            <strong>"Usage Data"</strong> Automatically collected info (IP
            address, device data, browser type, cookies, and usage statistics).
          </p>
          {/* <p>
            <strong>"Third-Party Integrations"</strong> Data from tools/websites
            you choose to connect with AIA, subject to your consent.
          </p> */}
        </>
      ),
    },
    {
      icon: <FileText className="w-8 h-8 text-green-500" />,
      id: "2",

      title: "How We Use Your Information",
      content: (
        <ul className="list-disc ml-6 space-y-2">
          <li>To provide and maintain our services.</li>
          <li>
            To communicate updates, support, offers, and security information.
          </li>
          <li>
            To analyze usage and improve product features and website
            functionality.
          </li>
          <li>To comply with legal requirements and enforce our terms.</li>
        </ul>
      ),
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-500" />,
      id: "3",

      title: "Information Sharing & Disclosure",
      content: (
        <ul className="list-disc ml-6 space-y-2">
          <li>We do not sell your personal data.</li>
          <li>
            We may share data with service providers and partners strictly for
            operations.
          </li>
          <li>
            Legal authorities, if required under law or to protect rights.
          </li>
          <li>
            Third parties if you explicitly authorize or link integrations.
          </li>
        </ul>
      ),
    },
    {
      icon: <Lock className="w-8 h-8 text-red-500" />,
      id: "4",

      title: "Data Security",
      content: (
        <p>
          We use industry-standard security measures (encryption, secured
          servers) to protect your data. However, internet transmission is never
          fully secure—use our services at your own risk.
        </p>
      ),
    },
    {
      icon: <Database className="w-8 h-8 text-yellow-500" />,
      id: "5",

      title: "Your Rights",
      content: (
        <>
          <p>Depending on your jurisdiction, you may have rights to:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Access, update, or delete your personal information.</li>
            <li>Object to or restrict certain data processing.</li>
            <li>Withdraw consent for non-essential processing.</li>
          </ul>
          <p className="mt-2">
            To exercise your rights, email us at{" "}
            <a
              href="mailto:genquiry@globalknowledgetech.com"
              className="text-blue-600 underline"
            >
              [genquiry@globalknowledgetech.com]
            </a>
            .
          </p>
        </>
      ),
    },
    {
      icon: <Globe className="w-8 h-8 text-teal-500" />,
      id: "6",

      title: "Data Retention",
      content: (
        <div className="list-disc ml-6 space-y-2">
          <p>
            We retain personal information as long as necessary for the purposes
            stated above or as required by law.
          </p>
        </div>
      ),
    },
    {
      icon: <Globe className="w-8 h-8 text-teal-500" />,
      id: "7",

      title: "International Users",
      content: (
        <div className="list-disc ml-6 space-y-2">
          <p>
            By using our services, you consent to your data being processed in
            India and/or other jurisdictions where we operate.
          </p>
        </div>
      ),
    },
    {
      icon: <Globe className="w-8 h-8 text-teal-500" />,
      id: "8",

      title: "Children’s Privacy",
      content: (
        <div className="list-disc ml-6 space-y-2">
          <p>
            Our website and product are not intended for children under 16. We
            do not knowingly collect data from children.{" "}
          </p>
        </div>
      ),
    },
    {
      icon: <Globe className="w-8 h-8 text-teal-500" />,
      id: "9",

      title: "Changes to This Policy ",
      content: (
        <div className="list-disc ml-6 space-y-2">
          <p>
            We may update our Privacy Policy from time to time. Changes will be
            posted on this page with the revised effective date.{" "}
          </p>
        </div>
      ),
    },
    {
      icon: <Mail className="w-8 h-8 text-pink-500" />,
      id: "10",
      title: "Contact Us",
      content: (
        <p>
          If you have questions or concerns, contact us at{" "}
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
          <ShieldAlert
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
              Privacy Policy
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
      <Footer/>
    </div>
  );
}
