import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const BusinessCategories = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setIsOpen(true);
    setTimeout(() => {
      router.push("/careerFair");
    }, 500);
  };

  return (
    <section className="py-12 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative">
          {/* Background gradient circles */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {/* Primary large gradient */}
              <div className="w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,theme(colors.blue.400/0.05)_0%,theme(colors.purple.400/0.05)_25%,theme(colors.pink.400/0.05)_50%,theme(colors.indigo.400/0.05)_75%,transparent_100%)] rounded-full blur-3xl animate-pulse" />

              {/* Secondary overlapping gradients */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[conic-gradient(from_0deg,theme(colors.blue.500/0.1),theme(colors.purple.500/0.1),theme(colors.fuchsia.500/0.1),theme(colors.violet.500/0.1),theme(colors.blue.500/0.1))] rounded-full blur-2xl animate-pulse" />

              {/* Accent gradient */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-br from-blue-400/10 via-indigo-400/10 to-purple-400/10 rounded-full blur-xl" />
            </div>
          </div>

          {/* Main content */}
          <div className="relative flex h-[400px] items-center justify-center">
            {/* Center logo */}
            <div className="relative">
              <motion.div
                className="absolute inset-0"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-28 h-28 rounded-full border-2 border-indigo-500/30" />
              </motion.div>
              <motion.div
                className="absolute inset-0"
                animate={{
                  scale: [1.1, 1, 1.1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3,
                }}
              >
                <div className="w-28 h-28 rounded-full border-2 border-violet-500/20" />
              </motion.div>

              {/* Center logo */}
              <div
                className="relative w-28 h-28 rounded-full bg-gradient-to-br from-white to-gray-50 shadow-xl flex items-center justify-center overflow-hidden group cursor-pointer"
                onClick={handleClick}
              >
                {/* Blue background overlay */}
                <motion.div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <motion.div
                  className="relative z-10 flex items-center justify-center w-full h-full"
                  initial={false}
                  animate={{
                    rotateY: isOpen ? 720 : 0,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.3, 0, 0.2, 1],
                  }}
                >
                  {/* Front side */}
                  <motion.img
                    src="https://cdn-icons-png.flaticon.com/512/6427/6427283.png"
                    alt="Career Fair Logo"
                    className="h-14 w-14 absolute group-hover:opacity-0 transition-opacity duration-300"
                    style={{
                      backfaceVisibility: "hidden",
                    }}
                  />

                  {/* Back side */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <span className="text-white font-bold text-2xl">GO</span>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Surrounding icons */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, index) => (
                <motion.div
                  key={index}
                  className={`absolute ${getPosition(index)}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: [0, -8, 0],
                  }}
                  transition={{
                    opacity: { duration: 0.5, delay: index * 0.1 },
                    y: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.15,
                    },
                  }}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 p-2">
                    <img
                      src={getIcon(index)}
                      alt="Company Logo"
                      className="w-full h-full object-contain filter drop-shadow-md"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/150x50/ffffff/000000?text=Company+Logo";
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const getPosition = (index: number) => {
  const positions = [
    // Left side (4 positions) - Top row
    "top-[25%] left-[15%] -translate-y-1/2",
    "top-[25%] left-[30%] -translate-y-1/2",
    // Left side (4 positions) - Bottom row
    "top-[75%] left-[15%] -translate-y-1/2",
    "top-[75%] left-[30%] -translate-y-1/2",
    // Right side (4 positions) - Top row
    "top-[25%] right-[15%] -translate-y-1/2",
    "top-[25%] right-[30%] -translate-y-1/2",
    // Right side (4 positions) - Bottom row
    "top-[75%] right-[15%] -translate-y-1/2",
    "top-[75%] right-[30%] -translate-y-1/2",
  ];
  return positions[index];
};

const getIcon = (index: number) => {
  const companyLogos = [
    // Left side (4 companies)
    "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/1000px-IBM_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1000px-Microsoft_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1000px-Amazon_logo.svg.png",
    // Right side (4 companies)
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/1200px-Meta_Platforms_Inc._logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1000px-Apple_logo_black.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1000px-Netflix_2015_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Adobe_Corporate_logo.svg/2560px-Adobe_Corporate_logo.svg.png",
  ];
  return companyLogos[index];
};

export default BusinessCategories;
