"use client";

import CustomHeading from "@/components/utils/CustomHeading";
import { useAllProjectsQuery } from "@/redux/features/projects/projectApi";
import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

const { Option } = Select;
const { Search, TextArea } = Input;

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

const categories = [
  "Residential Cleaning",
  "Commercial Cleaning",
  "Painting",
  "Landscaping",
  "Carpentry",
];

export default function Projects() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchText, setSearchText] = useState("");

  const { data } = useAllProjectsQuery();

  // Update body overflow when modals are open
  useEffect(() => {
    if (isModalOpen || isBidModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen, isBidModalOpen]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        handleCloseModal();
        handleCloseBidModal();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleClickProjectDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    setIsImageLoaded(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleOpenBidModal = (project) => {
    setSelectedProject(project);
    setIsBidModalOpen(true);
  };

  const handleCloseBidModal = () => {
    setIsBidModalOpen(false);
  };

  const onFinish = (values) => {
    console.log("Bid form values:", values);
    setIsBidModalOpen(false);
  };

  // Filtering projects based on selected category and search text.
  // We assume each project has keys: projectName and projectCategory.
  const filteredProjects = data?.data?.filter((proj) => {
    if (selectedCategory && proj.projectCategory !== selectedCategory) {
      return false;
    }
    if (
      searchText &&
      !proj.projectName.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleSelectCategory = (value) => {
    setSelectedCategory(value);
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleClearFilters = () => {
    setSelectedCategory("");
    setSearchText("");
  };

  return (
    <>
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <CustomHeading>Project List</CustomHeading>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
            <Select
              placeholder="Select Category"
              style={{ width: 200 }}
              value={selectedCategory || undefined}
              onChange={handleSelectCategory}
              allowClear
            >
              {categories.map((cat) => (
                <Option key={cat} value={cat}>
                  {cat}
                </Option>
              ))}
            </Select>
            <Search
              placeholder="Search by project name"
              allowClear
              onSearch={handleSearch}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 300 }}
            />
            <Button onClick={handleClearFilters}>Clear All</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects?.map((project) => (
              <div
                key={project._id}
                className="bg-secondary p-4 rounded-lg overflow-hidden shadow-md flex flex-col hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative w-full h-48 mb-4 rounded-t-lg overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.projectName}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-2">
                    {project.projectName}
                  </h3>
                  <p className="text-gray-500 mb-1">
                    <span className="font-medium">Post Code:</span>{" "}
                    {project.postCode}
                  </p>
                  <p className="text-gray-500 mb-4">
                    <span className="font-medium">Time:</span> {project.time}
                  </p>
                  <p className="text-gray-700 mb-6 flex-grow">
                    {project.workDetails}
                  </p>
                  <div className="flex justify-between">
                    <button
                      onClick={() => handleClickProjectDetails(project)}
                      className="bg-primary/80 text-white px-4 py-2 rounded hover:bg-primary transition-colors duration-300"
                    >
                      Learn More
                    </button>
                    <button
                      onClick={() => handleOpenBidModal(project)}
                      className="bg-primary/80 text-white px-4 py-2 rounded hover:bg-primary transition-colors duration-300"
                    >
                      Bid
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
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
              className="bg-white border-2 border-primary rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3 relative overflow-auto max-h-full"
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
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors duration-200"
                aria-label="Close Modal"
              >
                <FaTimes size={24} />
              </button>
              <div className="p-6">
                <h2
                  id="modal-title"
                  className="text-2xl font-semibold mb-6 text-center text-primary"
                >
                  Project Details
                </h2>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">
                    <ul className="space-y-2">
                      <li className="font-bold">
                        {selectedProject.projectName}
                      </li>
                      <li>
                        <span className="font-medium">Category:</span>{" "}
                        {selectedProject.projectCategory}
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
                        <span className="font-medium">Price Range:</span>{" "}
                        {selectedProject.priceRange}
                      </li>
                      <li>
                        <span className="font-medium">Time:</span>{" "}
                        {selectedProject.time}
                      </li>
                    </ul>
                  </div>
                  <div className="md:w-1/2">
                    <div
                      className={`relative w-full h-40 mb-4 ${
                        isImageLoaded ? "block" : "hidden"
                      }`}
                    >
                      <Image
                        src={selectedProject.image}
                        alt={selectedProject.projectName}
                        layout="fill"
                        objectFit="cover"
                        className="rounded"
                        onLoadingComplete={() => setIsImageLoaded(true)}
                      />
                    </div>
                    <p className="text-gray-700">
                      {selectedProject.workDetails}
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={handleCloseModal}
                    className="bg-white text-primary border border-primary px-6 py-2 rounded hover:bg-primary hover:text-white transition-colors duration-300"
                  >
                    Back
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Modal
        open={isBidModalOpen}
        onCancel={handleCloseBidModal}
        footer={null}
        destroyOnClose
        title={<h2 className="text-xl font-bold text-primary">Bid</h2>}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <div>
            <Form.Item
              label="Price (Fixed)"
              name="price"
              rules={[{ required: true, message: "Please enter a price" }]}
            >
              <Input type="number" placeholder="Price" />
            </Form.Item>
            <Form.Item
              label="Service Time (days)"
              name="serviceTime"
              rules={[
                { required: true, message: "Please enter the service time" },
              ]}
            >
              <Input type="number" placeholder="4 days" />
            </Form.Item>
            <Form.Item
              label="Starting Date"
              name="startingDate"
              rules={[
                { required: true, message: "Please pick a starting date" },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                disabledDate={(current) =>
                  current && current < dayjs().startOf("day")
                }
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="Work Details"
              name="workDetails"
              rules={[
                {
                  required: true,
                  message: "Please write something about your work process",
                },
              ]}
            >
              <TextArea
                rows={6}
                maxLength={200}
                placeholder="Write something about your work process"
              />
            </Form.Item>
          </div>
          <div className="text-center mt-4">
            <Button onClick={handleCloseBidModal}>Back</Button>
            <Button type="primary" htmlType="submit">
              Send
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
