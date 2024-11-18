import React from "react";

const BusinessCategories = () => {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          <div className="relative flex h-[324px] items-center justify-center">
            {/* Blue glow */}
            <div className="absolute -z-10 w-[432px] h-[160px] opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={432}
                height={160}
                viewBox="0 0 432 160"
                fill="none"
              >
                <g opacity="0.6" filter="url(#filter0_f_2044_9)">
                  <path
                    fill="#3B82F6"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M80 112C62.3269 112 48 97.6731 48 80C48 62.3269 62.3269 48 80 48C97.6731 48 171 62.3269 171 80C171 97.6731 97.6731 112 80 112ZM352 112C369.673 112 384 97.6731 384 80C384 62.3269 369.673 48 352 48C334.327 48 261 62.3269 261 80C261 97.6731 334.327 112 352 112Z"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_f_2044_9"
                    x={0}
                    y={0}
                    width={432}
                    height={160}
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    />
                    <feGaussianBlur
                      stdDeviation={32}
                      result="effect1_foregroundBlur_2044_9"
                    />
                  </filter>
                </defs>
              </svg>
            </div>

            {/* Center logo with animation */}
            <div className="absolute before:absolute before:-inset-3 before:animate-[spin_3s_linear_infinite] before:rounded-full before:border before:border-transparent before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] before:[background:conic-gradient(from_180deg,transparent,theme(colors.blue.500))_border-box]">
              <div className="animate-[breath_8s_ease-in-out_infinite_both]">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-lg shadow-black/[0.03] before:absolute before:inset-0 before:m-[8.334%] before:rounded-[inherit] before:border before:border-gray-700/5 before:bg-gray-200/60 before:[mask-image:linear-gradient(to_bottom,black,transparent)]">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/6427/6427283.png"
                    alt="Career Fair Logo"
                    className="h-12 w-12"
                  />
                </div>
              </div>
            </div>

            {/* Surrounding logos */}
            <div className="relative flex flex-col">
              <article className="flex h-full w-full items-center justify-center">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className={`absolute ${getPosition(index)}`}>
                    <div
                      className={`animate-[breath_${6 + index}s_ease-in-out_${
                        index / 2
                      }s_infinite_both]`}
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg shadow-black/[0.03] before:absolute before:inset-0 before:m-[8.334%] before:rounded-[inherit] before:border before:border-gray-700/5 before:bg-gray-200/60 before:[mask-image:linear-gradient(to_bottom,black,transparent)]">
                        <div className="text-3xl text-blue-500">
                          {getIcon(index)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper function to get positions for the surrounding logos
const getPosition = (index: number) => {
  const positions = [
    "-translate-x-[136px]",
    "translate-x-[136px]",
    "-translate-x-[216px] -translate-y-[82px]",
    "-translate-y-[82px] translate-x-[216px]",
    "translate-x-[216px] translate-y-[82px]",
    "-translate-x-[216px] translate-y-[82px]",
    "-translate-x-[292px]",
    "translate-x-[292px]",
  ];
  return positions[index];
};

// Helper function to get icons for surrounding positions
const getIcon = (index: number) => {
  const icons = ["💼", "🎓", "💡", "🌟", "📊", "🤝", "📈", "🎯"];
  return icons[index];
};

export default BusinessCategories;
