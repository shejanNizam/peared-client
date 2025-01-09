import ServiceSearchBar from "@/components/Home/Banner/ServiceSearchBar";
import CustomHeading from "@/components/utils/CustomHeading";
import image from "../../assets/project/project_img_1.png";
import ProjectDetailsCard from "./ProjectDetailsCard";

const projects = [
  {
    _id: "1",
    image: image,
    title: "Modern Apartment",
    postCode: "12345",
    time: "2 weeks",
    description:
      "A beautiful modern apartment located in the heart of the city with all amenities.",
  },
  {
    _id: "2",
    image: image,
    title: "Luxury Villa",
    postCode: "67890",
    time: "1 month",
    description:
      "A stunning luxury villa with spacious rooms and a large garden.",
  },
  {
    _id: "3",
    image: image,
    title: "Cozy Cottage",
    postCode: "54321",
    time: "3 weeks",
    description:
      "A cozy cottage perfect for a family getaway with modern interiors.",
  },
  {
    _id: "4",
    image: image,
    title: "Urban Loft",
    postCode: "98765",
    time: "4 weeks",
    description:
      "An urban loft with an open floor plan and high ceilings, ideal for professionals.",
  },
  {
    _id: "5",
    image: image,
    title: "Beach House",
    postCode: "11223",
    time: "5 weeks",
    description:
      "A beautiful beach house with stunning sea views and direct beach access.",
  },
  {
    _id: "6",
    image: image,
    title: "Mountain Cabin",
    postCode: "44556",
    time: "3 months",
    description:
      "A serene mountain cabin surrounded by nature, perfect for relaxation.",
  },
];

export default function Project() {
  return (
    <>
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {/* Heading */}
          <div className=" mb-12">
            <div className="text-center">
              <CustomHeading> Project List </CustomHeading>
            </div>
            <ServiceSearchBar />
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectDetailsCard project={project} key={project._id} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
