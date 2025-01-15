"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import image from "../../../assets/project/project_img_1.png";
import image2 from "../../../assets/project/project_img_2.png";

const myProject = [
  {
    _id: "1",
    image: image, // Imported static image
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
    image: image2, // Imported static image
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
    image: image, // Imported static image
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
    _id: "4",
    image: image2, // Imported static image
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
];

export default function CurrentProjects() {
  const router = useRouter();

  const handleOpenProject = (project) => {
    router.push(`/profile/project-details?projectid=${project._id}`);
  };

  // {
  //   pathname: "/profile/my-projects/bid-lists",
  //   query: { projectId: project._id },
  // }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {myProject.map((project) => (
        <div
          key={project._id}
          className="bg-secondary p-4 rounded-lg overflow-hidden shadow-md flex flex-col hover:shadow-xl transition-shadow duration-300"
        >
          <div className="relative w-full h-48 mb-4 rounded-t-lg overflow-hidden">
            <Image
              src={project.image} // Use imported image directly
              alt={project.title}
              fill // For dynamic image dimensions
              className="rounded-t-lg object-cover"
            />
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-gray-500 mb-1">
              <span className="font-medium">Post Code:</span> {project.postCode}
            </p>
            <p className="text-gray-500 mb-4">
              <span className="font-medium">Time:</span> {project.time}
            </p>
            <p className="text-gray-700 mb-6 flex-grow">
              {project.description}
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => handleOpenProject(project)}
                className="bg-primary/80 text-white px-4 py-2 rounded hover:bg-primary transition-colors duration-300"
              >
                Open
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
