// components/Project.jsx

"use client";

import ServiceSearchBar from "@/components/Home/Banner/ServiceSearchBar";
import CustomHeading from "@/components/utils/CustomHeading";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

// Import all project images
import image from "../../assets/project/project_img_1.png";
import image2 from "../../assets/project/project_img_2.png";

const projects = [
  {
    _id: "1",
    image: image,
    title: "Modern Apartment",
    postCode: "12345",
    time: "2 weeks",
    description:
      "A beautiful modern apartment located in the heart of the city with all amenities.",
    category: "Plumber",
    street: "Baker Street",
    city: "London",
    price: "$50-$70",
    urgency: "Urgent (1 - 2 days)",
  },
  {
    _id: "2",
    image: image2,
    title: "Luxury Villa",
    postCode: "67890",
    time: "1 month",
    description:
      "A stunning luxury villa with spacious rooms and a large garden.",
    category: "Plumber",
    street: "Elm Street",
    city: "Manchester",
    price: "$80-$100",
    urgency: "Standard (3 - 5 days)",
  },
  {
    _id: "3",
    image: image,
    title: "Cozy Cottage",
    postCode: "54321",
    time: "3 weeks",
    description:
      "A cozy cottage perfect for a family getaway with modern interiors.",
    category: "Plumber",
    street: "Maple Avenue",
    city: "Birmingham",
    price: "$60-$80",
    urgency: "Urgent (1 - 2 days)",
  },
  {
    _id: "4",
    image: image,
    title: "Urban Loft",
    postCode: "98765",
    time: "4 weeks",
    description:
      "An urban loft with an open floor plan and high ceilings, ideal for professionals.",
    category: "Plumber",
    street: "Pine Street",
    city: "Leeds",
    price: "$70-$90",
    urgency: "Standard (3 - 5 days)",
  },
  {
    _id: "5",
    image: image,
    title: "Beach House",
    postCode: "11223",
    time: "5 weeks",
    description:
      "A beautiful beach house with stunning sea views and direct beach access.",
    category: "Plumber",
    street: "Ocean Drive",
    city: "Brighton",
    price: "$90-$120",
    urgency: "Non-Urgent (6+ days)",
  },
  {
    _id: "6",
    image: image,
    title: "Mountain Cabin",
    postCode: "44556",
    time: "3 months",
    description:
      "A serene mountain cabin surrounded by nature, perfect for relaxation.",
    category: "Plumber",
    street: "Mountain Road",
    city: "Edinburgh",
    price: "$100-$150",
    urgency: "Standard (3 - 5 days)",
  },
];

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
};

export default function Projects() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const handleClickProjectDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    setIsImageLoaded(false); // Reset image load state
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  // Close modal when pressing Escape key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {/* Heading */}
          <div className="mb-12">
            <div className="text-center">
              <CustomHeading>Project List</CustomHeading>
            </div>
            <ServiceSearchBar />
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-secondary p-4 rounded-lg overflow-hidden shadow-md flex flex-col hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image */}
                <div className="relative w-full h-48 mb-4 rounded-t-lg overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 mb-1">
                    <span className="font-medium">Post Code:</span>{" "}
                    {project.postCode}
                  </p>
                  <p className="text-gray-500 mb-4">
                    <span className="font-medium">Time:</span> {project.time}
                  </p>
                  <p className="text-gray-700 mb-6 flex-grow">
                    {project.description}
                  </p>
                  {/* Button */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleClickProjectDetails(project)}
                      className="bg-primary/80 text-white px-4 py-2 rounded hover:bg-primary transition-colors duration-300"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleCloseModal}
          >
            <motion.div
              className="bg-white border-2 border-primary  rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3 relative overflow-auto max-h-full"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors duration-200"
                aria-label="Close Modal"
              >
                <FaTimes size={24} />
              </button>

              {/* Modal Content */}
              <div className="p-6">
                <h2
                  id="modal-title"
                  className="text-2xl font-semibold mb-6 text-center text-primary"
                >
                  Project Details
                </h2>
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Left Side - Properties */}
                  <div className="md:w-1/2">
                    <ul className="space-y-2">
                      <li className="font-bold">{selectedProject.title}</li>
                      <li>
                        <span className="font-medium">Category:</span>{" "}
                        {selectedProject.category}
                      </li>
                      <li>
                        <span className="font-medium">Street:</span>{" "}
                        {selectedProject.street}
                      </li>
                      <li>
                        <span className="font-medium">City:</span>{" "}
                        {selectedProject.city}
                      </li>
                      <li>
                        <span className="font-medium">Post Code:</span>{" "}
                        {selectedProject.postCode}
                      </li>
                      <li>
                        <span className="font-medium">Price:</span>{" "}
                        {selectedProject.price}
                      </li>
                      <li>
                        <span className="font-medium">Time:</span>{" "}
                        {selectedProject.urgency}
                      </li>
                    </ul>
                  </div>

                  {/* Right Side - Image and Description */}
                  <div className="md:w-1/2">
                    <div
                      className={`relative w-full h-40 mb-4 ${
                        isImageLoaded ? "block" : "hidden"
                      }`}
                    >
                      <Image
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded"
                        onLoadingComplete={() => setIsImageLoaded(true)}
                      />
                    </div>
                    <p className="text-gray-700">
                      {selectedProject.description}
                    </p>
                  </div>
                </div>

                {/* Back Button */}
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={handleCloseModal}
                    className="bg-white text-primary border border-primary px-6 py-2 rounded hover:bg-primary hover:text-white
                     transition-colors duration-300"
                  >
                    Back
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
