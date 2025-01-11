"use client";

import Image from "next/image";

const handleClickProjectDetails = () => {
  console.log("Project Details clicked");
};

export default function ProjectDetailsCard({ project }) {
  const { image, title, postCode, time, description } = project;
  return (
    <>
      <div className="bg-secondary p-4 rounded-lg overflow-hidden shadow-md flex flex-col">
        {/* Image */}
        <div className="relative w-full h-48">
          <Image
            src={image}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="w-full h-48 object-cover rounded-t-lg"
          />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-500 mb-1">
            <span className="font-medium">Post Code:</span> {postCode}
          </p>
          <p className="text-gray-500 mb-4">
            <span className="font-medium">Time:</span> {time}
          </p>
          <p className="text-gray-700 mb-6 flex-grow">{description}</p>
          {/* Button */}
          <div className="flex justify-center">
            <button
              onClick={() => handleClickProjectDetails()}
              className="bg-primary/80 text-white px-4 py-2 rounded hover:bg-primary transition-colors duration-300"
            >
              {"Learn More"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
