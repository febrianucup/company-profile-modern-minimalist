import React from "react";
import { useState } from "react";

export const TeamCard = ({ 
  img, 
  name, 
  role 
}) => {
  const [imageError, serImageError] = useState(false)
  return (
    <div className="group flex w-64 shrink-0 flex-col">
      <div className="relative h-96 w-full overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800">
        {imageError ? (
          <div className="flex h-full w-full flex-col items-center justify-center bg-neutral-200 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-500">
            <svg
              className="h-16 w-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="mt-2 text-xs">No Image</span>
          </div>
        ):(
          <img
            src={img}
            alt={name}
            className="h-full w-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
          />
        )}
        <div className="absolute bottom-0 w-full rounded-b-2xl bg-neutral-100/85 p-3 backdrop-blur-sm dark:bg-neutral-800/80">
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
            {name}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;