// pages/index.js
import Head from 'next/head'
// If you use framer-motion, import it: import { motion } from "framer-motion"

export default function Home() {
  return (
    <>
      <Head>
        <title>SalesAI – Autonomous Pipeline Generation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="min-h-screen flex flex-col bg-[var(--background)]">
        {/* Navigation */}
        <nav className="flex justify-between items-center py-6 px-4 md:px-20 bg-white shadow">
          <span className="text-2xl font-bold text-[var(--primary)]">SalesAI</span>
          <ul className="flex gap-8 text-[var(--secondary)] font-semibold">
            <li><a href="#use-cases" className="hover:text-[var(--accent)] transition">Use Cases</a></li>
            <li><a href="#features" className="hover:text-[var(--accent)] transition">Features</a></li>
            <li><a href="#results" className="hover:text-[var(--accent)] transition">Results</a></li>
            <li><a href="#contact" className="hover:text-[var(--accent)] transition">Contact</a></li>
            <li><a href="/Login" className="hover:text-[var(--accent)] transition">Login</a></li>
          </ul>
        </nav>
        
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center py-20 px-4 bg-gradient-to-b from-[var(--primary)] to-[var(--secondary)] text-white relative overflow-hidden">
          {/* Animated background component goes here */}
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Autonomous AI for Outbound Sales</h1>
          <p className="max-w-xl mb-8 text-lg md:text-xl text-[var(--accent)]">Put your entire pipeline on autopilot. Identify, engage and convert your perfect-fit prospects 24/7, powered by intelligent AI agents.</p>
          <a href="#demo" className="px-8 py-3 bg-[var(--accent)] text-[var(--secondary)] rounded-lg font-bold text-lg shadow-lg hover:scale-105 transition">Get Started</a>
          {/* Add animated decorative elements using framer-motion or TailwindCSS */}
        </section>
        
        {/* Use Cases */}
        <section id="use-cases" className="py-16 bg-[var(--background)] px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-[var(--primary)]">Use Cases</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card
              title="Real-Time Market Tracking"
              description="Monitor every lead, produce deep research, detect buying signals, and uncover new ideal customers instantly."
            />
            <Card
              title="Account-Based Engagement"
              description="Engage decision-makers at scale with tailored, multi-channel messaging and dynamic value propositions."
            />
            <Card
              title="Demand Generation"
              description="Drive registrations, share case studies, and nurture leads across all stakeholders to create interest and urgency."
            />
            <Card
              title="High-Intent Activation"
              description="Respond immediately to high-intent website visitors or ICP job changers, turning them into opportunities."
            />
            <Card
              title="Lead Revival"
              description="Breathe new life into old leads, reigniting conversations and uncovering missed revenue hidden in your CRM."
            />
            <Card
              title="International Expansion"
              description="Enter any market at warp speed with 105+ languages, localizing and adapting your outreach at scale."
            />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-[var(--surface)] px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-[var(--secondary)]">How SalesAI Delivers Pipeline On Autopilot</h2>
          <div className="max-w-4xl mx-auto flex flex-col gap-14">
            <Feature
              title="Intelligent Buyer Targeting"
              description="Go beyond static data — SalesAI autonomously discovers and books meetings with buyers most likely to convert."
            />
            <Feature
              title="Adaptive Personalization"
              description="No more templates. Each message is crafted with real prospect research and self-improving outreach logic."
            />
            <Feature
              title="Relentless Execution"
              description="24/7 prospecting, learning on every action to fill your calendar with qualified meetings."
            />
            <Feature
              title="Precision Conversation"
              description="Dynamically adapts tone, content and timing for every prospect, maximizing response and conversion rates."
            />
            <Feature
              title="Multi-Channel Engagement"
              description="Reaches buyers across all channels—from emails to calls—in perfectly sequenced campaigns."
            />
            <Feature
              title="Seamless CRM Sync"
              description="Effortlessly enriches, deduplicates, and auto-qualifies leads across your revenue stack."
            />
          </div>
        </section>
        
        {/* Results Section */}
        <section id="results" className="py-16 bg-[var(--background)] px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-[var(--primary)]">Alice's Average Results</h2>
          <div className="flex flex-wrap gap-8 justify-center">
            <Stat amount="11x" label="More Pipeline" />
            <Stat amount="24/7" label="Prospecting" />
            <Stat amount="$500k+" label="Annual Hiring Savings" />
            <Stat amount="10x" label="Lead Personalization" />
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 bg-[var(--surface)] px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-[var(--secondary)]">Customer Love</h2>
          <div className="max-w-3xl mx-auto flex flex-col gap-10">
            <Testimonial
              name="Johan De Picker"
              company="KMS Healthcare"
              text="I was a skeptic, but SalesAI blew me away by booking meetings that beat our best SDRs—at 11x the scale!"
            />
            <Testimonial
              name="Anjali S."
              company="FinServe Corp"
              text="Onboarding was smooth and intuitive. We saw pipeline grow week-over-week, all on autopilot."
            />
            <Testimonial
              name="Derek S."
              company="CloudStart"
              text="Efficient, always-on workflows that seamlessly align with business goals. Highly recommended!"
            />
          </div>
        </section>

        {/* Contact/CTA */}
        <section id="contact" className="flex flex-col items-center justify-center py-20 px-4 bg-[var(--primary)] text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Autopilot Sales?</h2>
          <p className="text-lg mb-8 text-[var(--accent)] max-w-md text-center">
            Experience the next generation of outbound. Book a demo or get started today.
          </p>
          <a href="#demo" className="px-8 py-3 bg-[var(--accent)] text-[var(--secondary)] rounded-lg font-bold text-lg shadow-lg hover:scale-105 transition">Book Demo</a>
        </section>

        {/* Footer */}
        <footer className="text-center py-6 bg-[var(--secondary)] text-[var(--accent)] mt-auto">
          &copy; {new Date().getFullYear()} SalesAI. All rights reserved.
        </footer>
      </main>
    </>
  );
}

// Helper Components
function Card({ title, description }) {
  return (
    <div className="bg-white/90 rounded-xl shadow-lg p-8 min-h-[190px] flex flex-col gap-3 hover:scale-105 transition">
      <h3 className="font-bold text-xl mb-2 text-[var(--primary)]">{title}</h3>
      <p className="text-[var(--secondary)]">{description}</p>
    </div>
  );
}

function Feature({ title, description }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow flex flex-col gap-2 hover:bg-[var(--background)] transition">
      <h4 className="font-semibold text-lg text-[var(--secondary)]">{title}</h4>
      <p className="text-[var(--primary)] text-base">{description}</p>
    </div>
  );
}

function Stat({ amount, label }) {
  return (
    <div className="bg-[var(--surface)] rounded-xl px-8 py-6 text-center shadow ">
      <span className="text-3xl font-bold text-[var(--primary)]">{amount}</span>
      <div className="text-[var(--secondary)] mt-1">{label}</div>
    </div>
  );
}

function Testimonial({ name, company, text }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 text-[var(--secondary)]">
      <p className="italic mb-3">"{text}"</p>
      <div className="text-[var(--primary)] font-bold">{name}</div>
      <div className="text-[var(--accent)] font-medium">{company}</div>
    </div>
  );
}
