// "use client";
// import React from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
// import Image from "next/image";

// import Diamond0 from "../../../public/Landing/aiaLast.png";
// import Diamond1 from "../../../public/Landing/market.png";
// import Diamond2 from "../../../public/Landing/leads.png";
// import Diamond3 from "../../../public/Landing/campaign.png";
// import Diamond4 from "../../../public/Landing/outreach.png";
// import Diamond5 from "../../../public/Landing/aia.png";

// const MarketResearch = () => {
//   const { scrollYProgress } = useScroll();

//   const containerHeight = "700vh";

//   const boxes = [
//     {
//       y: useTransform(scrollYProgress, [0, 0.133], [-100, 0]),
//       opacity: useTransform(scrollYProgress, [0, 0.067], [0, 1]),
//       zIndex: 1,
//       scale: useTransform(scrollYProgress, [0, 0.133], [0.9, 1]),
//       textPosition: "none",
//     },
//     {
//       y: useTransform(scrollYProgress, [0.133, 0.267], [-100, 0]),
//       opacity: useTransform(scrollYProgress, [0.133, 0.2], [0, 1]),
//       textOpacity: useTransform(scrollYProgress, [0.133, 0.2, 0.267, 0.333], [0, 1, 1, 0]),
//       textX: useTransform(scrollYProgress, [0.133, 0.2], [100, 0]), // Slide from right
//       zIndex: 2,
//       scale: useTransform(scrollYProgress, [0.133, 0.267], [0.9, 1]),
//       textPosition: "right",
//       title: "Market Research",
//       content:
//         "Our AI analyzes industry trends, competitors, and customer behavior to identify the most promising opportunities for your business.",
//     },
//     {
//       y: useTransform(scrollYProgress, [0.267, 0.4], [-100, 0]),
//       opacity: useTransform(scrollYProgress, [0.267, 0.333], [0, 1]),
//       textOpacity: useTransform(scrollYProgress, [0.267, 0.333, 0.4, 0.467], [0, 1, 1, 0]),
//       textX: useTransform(scrollYProgress, [0.267, 0.333], [-100, 0]), // Slide from left
//       zIndex: 3,
//       scale: useTransform(scrollYProgress, [0.267, 0.4], [0.9, 1]),
//       textPosition: "left",
//       title: "Lead Generation",
//       content:
//         "Automatically identifies and qualifies high-potential leads based on your ideal customer profile and market conditions.",
//     },
//     {
//       y: useTransform(scrollYProgress, [0.4, 0.533], [-100, 0]),
//       opacity: useTransform(scrollYProgress, [0.4, 0.467], [0, 1]),
//       textOpacity: useTransform(scrollYProgress, [0.4, 0.467, 0.533, 0.6], [0, 1, 1, 0]),
//       textX: useTransform(scrollYProgress, [0.4, 0.467], [100, 0]), // Slide from right
//       zIndex: 4,
//       scale: useTransform(scrollYProgress, [0.4, 0.533], [0.9, 1]),
//       textPosition: "right",
//       title: "Campaign Strategy",
//       content:
//         "Creates personalized multi-channel campaigns with optimal timing, messaging, and sequencing for maximum conversion.",
//     },
//     {
//       y: useTransform(scrollYProgress, [0.533, 0.667], [-100, 0]),
//       opacity: useTransform(scrollYProgress, [0.533, 0.6], [0, 1]),
//       textOpacity: useTransform(scrollYProgress, [0.533, 0.6, 0.667, 0.733], [0, 1, 1, 0]),
//       textX: useTransform(scrollYProgress, [0.533, 0.6], [-100, 0]),
//       zIndex: 5,
//       scale: useTransform(scrollYProgress, [0.533, 0.667], [0.9, 1]),
//       textPosition: "left",
//       title: "Automated Outreach",
//       content:
//         "Executes personalized communications across email, social media, and other channels with human-like precision.",
//     },
//     {
//       y: useTransform(scrollYProgress, [0.7, 0.85], [-100, 0]),
//       opacity: useTransform(scrollYProgress, [0.7, 0.78], [0, 1]),
//       zIndex: 6,
//       scale: useTransform(scrollYProgress, [0.7, 0.85], [0.9, 1]),
//       textPosition: "none",
//     },
//   ];

//   const DiamondBox = ({ index }) => {
//     const diamonds = [
//       <Image src={Diamond0} alt={"svg"} height={200} width={350} />,
//       <Image src={Diamond1} alt={"svg"} height={200} width={350} />,
//       <Image src={Diamond2} alt={"svg"} height={200} width={350} />,
//       <Image src={Diamond3} alt={"svg"} height={200} width={347} className="ml-1" />,
//       <Image src={Diamond4} alt={"svg"} height={200} width={350} />,
//       <Image src={Diamond5} alt={"svg"} height={200} width={350} />,
//     ];
//     return <div className="relative">{diamonds[index]}</div>;
//   };

//   return (
//     <div className="relative" style={{ height: containerHeight }}>
//       <div className="sticky top-0 h-screen flex items-center overflow-hidden">
//         <div className="relative w-full max-w-7xl mx-auto px-8">
//           {boxes.map((box, index) => (
//             <motion.div
//               key={index}
//               style={{
//                 y: box.y,
//                 opacity: box.opacity,
//                 zIndex: box.zIndex,
//                 scale: box.scale,
//                 position: "absolute",
//                 top: "50%",
//                 left: 0,
//                 right: 0,
//                 transform: "translateY(-10%)",
//                 marginTop: `${index * -30}px`,
//               }}
//               className="will-change-transform origin-center w-full"
//             >
//               <div className="grid grid-cols-3 gap-8 items-center w-full">
//                 <motion.div
//                   className="col-span-1 pl-20"
//                   style={{
//                     opacity: box.textPosition === "left" ? box.textOpacity : 0,
//                     x: box.textPosition === "left" ? box.textX : 0,
//                   }}
//                 >
//                   <div className="pr-8">
//                     <h3 className="text-2xl font-bold text-gray-800 mb-4">{box.title}</h3>
//                     <p className="text-gray-600">{box.content}</p>
//                   </div>
//                 </motion.div>

//                 <div className="col-span-1 flex justify-center">
//                   <DiamondBox index={index} />
//                 </div>

//                 <motion.div
//                   className="col-span-1 pr-10"
//                   style={{
//                     opacity: box.textPosition === "right" ? box.textOpacity : 0,
//                     x: box.textPosition === "right" ? box.textX : 0,
//                   }}
//                 >
//                   <div className="pl-8">
//                     <h3 className="text-2xl font-bold text-gray-800 mb-4">{box.title}</h3>
//                     <p className="text-gray-600">{box.content}</p>
//                   </div>
//                 </motion.div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MarketResearch;

"use client";
import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

import Diamond0 from "../../../public/Landing/aiaLast.png";
import Diamond1 from "../../../public/Landing/market.png";
import Diamond2 from "../../../public/Landing/leads.png";
import Diamond3 from "../../../public/Landing/campaign.png";
import Diamond4 from "../../../public/Landing/outreach.png";
import Diamond5 from "../../../public/Landing/aia.png";

const MarketResearch = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll();

  const contentData = [
    {
      title: "Market Research",
      content:
        "Our AI analyzes industry trends, competitors, and customer behavior to identify the most promising opportunities for your business.",
    },
    {
      title: "Lead Generation",
      content:
        "Automatically identifies and qualifies high-potential leads based on your ideal customer profile and market conditions.",
    },
    {
      title: "Campaign Strategy",
      content:
        "Creates personalized multi-channel campaigns with optimal timing, messaging, and sequencing for maximum conversion.",
    },
    {
      title: "Automated Outreach",
      content:
        "Executes personalized communications across email, social media, and other channels with human-like precision.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(
        () => setCurrentIndex((prev) => (prev + 1) % contentData.length),
        3000
      );
      return () => clearInterval(interval);
    }
  }, [isMobile, contentData.length]);

  const containerHeight = "700vh";
  const boxes = [
    {
      y: useTransform(scrollYProgress, [0, 0.133], [-100, 0]),
      opacity: useTransform(scrollYProgress, [0, 0.067], [0, 1]),
      zIndex: 1,
      scale: useTransform(scrollYProgress, [0, 0.133], [0.9, 1]),
      textPosition: "none",
    },
    {
      y: useTransform(scrollYProgress, [0.133, 0.267], [-100, 0]),
      opacity: useTransform(scrollYProgress, [0.133, 0.2], [0, 1]),
      textOpacity: useTransform(
        scrollYProgress,
        [0.133, 0.2, 0.267, 0.333],
        [0, 1, 1, 0]
      ),
      textX: useTransform(scrollYProgress, [0.133, 0.2], [-20, 0]),
      zIndex: 2,
      scale: useTransform(scrollYProgress, [0.133, 0.267], [0.9, 1]),
      textPosition: "right",
      title: "Market Research",
      content:
        "Our AI analyzes industry trends, competitors, and customer behavior to identify the most promising opportunities for your business.",
    },
    {
      y: useTransform(scrollYProgress, [0.267, 0.4], [-100, 0]),
      opacity: useTransform(scrollYProgress, [0.267, 0.333], [0, 1]),
      textOpacity: useTransform(
        scrollYProgress,
        [0.267, 0.333, 0.4, 0.467],
        [0, 1, 1, 0]
      ),
      textX: useTransform(scrollYProgress, [0.267, 0.333], [20, 0]),
      zIndex: 3,
      scale: useTransform(scrollYProgress, [0.267, 0.4], [0.9, 1]),
      textPosition: "left",
      title: "Lead Generation",
      content:
        "Automatically identifies and qualifies high-potential leads based on your ideal customer profile and market conditions.",
    },
    {
      y: useTransform(scrollYProgress, [0.4, 0.533], [-100, 0]),
      opacity: useTransform(scrollYProgress, [0.4, 0.467], [0, 1]),
      textOpacity: useTransform(
        scrollYProgress,
        [0.4, 0.467, 0.533, 0.6],
        [0, 1, 1, 0]
      ),
      textX: useTransform(scrollYProgress, [0.4, 0.467], [-20, 0]),
      zIndex: 4,
      scale: useTransform(scrollYProgress, [0.4, 0.533], [0.9, 1]),
      textPosition: "right",
      title: "Campaign Strategy",
      content:
        "Creates personalized multi-channel campaigns with optimal timing, messaging, and sequencing for maximum conversion.",
    },
    {
      y: useTransform(scrollYProgress, [0.533, 0.667], [-100, 0]),
      opacity: useTransform(scrollYProgress, [0.533, 0.6], [0, 1]),
      textOpacity: useTransform(
        scrollYProgress,
        [0.533, 0.6, 0.667, 0.733],
        [0, 1, 1, 0]
      ),
      textX: useTransform(scrollYProgress, [0.533, 0.6], [20, 0]),
      zIndex: 5,
      scale: useTransform(scrollYProgress, [0.533, 0.667], [0.9, 1]),
      textPosition: "left",
      title: "Automated Outreach",
      content:
        "Executes personalized communications across email, social media, and other channels with human-like precision.",
    },
    {
      y: useTransform(scrollYProgress, [0.7, 0.85], [-100, 0]),
      opacity: useTransform(scrollYProgress, [0.7, 0.78], [0, 1]),
      zIndex: 6,
      scale: useTransform(scrollYProgress, [0.7, 0.85], [0.9, 1]),
      textPosition: "none",
    },
  ];

  const DiamondBox = ({ index }) => {
    const diamonds = [
      <Image src={Diamond0} alt={"svg"} height={200} width={350} />,
      <Image src={Diamond1} alt={"svg"} height={200} width={350} />,
      <Image src={Diamond2} alt={"svg"} height={200} width={350} />,
      <Image
        src={Diamond3}
        alt={"svg"}
        height={200}
        width={347}
        className="ml-1"
      />,
      <Image src={Diamond4} alt={"svg"} height={200} width={350} />,
      <Image src={Diamond5} alt={"svg"} height={200} width={350} />,
    ];
    return <div className="relative">{diamonds[index]}</div>;
  };

  if (isMobile) {
    return (
      <div className="relative h-auto flex flex-col">
        <div className="w-full flex flex-col justify-center items-center bg-white mb-10 z-10">
          <Image
            src={"/Landing/group.png"}
            alt="Diamond"
            height={200}
            width={350}
          />
        </div>
        <div className="flex items-end justify-center px-6 pb-1 pt-5 text-center mb-10">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {contentData[currentIndex].title}
            </h3>
            <p className="text-gray-600">{contentData[currentIndex].content}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative" style={{ height: containerHeight }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="relative w-full max-w-7xl mx-auto px-8">
          {boxes.map((box, index) => (
            <motion.div
              key={index}
              style={{
                // y: box.y,
                opacity: box.opacity,
                zIndex: box.zIndex,
                // scale: box.scale,
                position: "absolute",
                top: "50%",
                left: 0,
                right: 0,
                transform: "translateY(-10%)",
                marginTop: `${index * -30}px`,
              }}
              className="will-change-transform origin-center w-full"
            >
              <div className="grid grid-cols-3 gap-8 items-center w-full">
                <motion.div
                  className="col-span-1 pl-20"
                  style={{
                    opacity: box.textPosition === "left" ? box.textOpacity : 0,
                    x: box.textPosition === "left" ? box.textX : 0,
                  }}
                >
                  <div className="pr-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      {box.title}
                    </h3>
                    <p className="text-gray-600">{box.content}</p>
                  </div>
                </motion.div>

                <motion.div
                  className="col-span-1 flex justify-center"
                  style={{
                    y: box.y,
                    scale: box.scale,
                  }}
                >
                  <DiamondBox index={index} />
                </motion.div>

                <motion.div
                  className="col-span-1 pr-10"
                  style={{
                    opacity: box.textPosition === "right" ? box.textOpacity : 0,
                    x: box.textPosition === "right" ? box.textX : 0,
                  }}
                >
                  <div className="pl-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      {box.title}
                    </h3>
                    <p className="text-gray-600">{box.content}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketResearch;
