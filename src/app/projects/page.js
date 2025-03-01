"use client";

import { ErrorSwal, SuccessSwal } from "@/components/utils/allSwalFire";
import CustomHeading from "@/components/utils/CustomHeading";
import {
  useAllProjectsQuery,
  useCreateBidProjectMutation,
} from "@/redux/features/projects/projectApi";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
} from "antd";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  { _id: "1", name: "Residential Cleaning" },
  { _id: "2", name: "Commercial Cleaning" },
  { _id: "3", name: "Painting" },
  { _id: "4", name: "Landscaping" },
  { _id: "5", name: "Carpentry" },
];

export default function Projects() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchText, setSearchText] = useState("");

  const router = useRouter();

  const { data } = useAllProjectsQuery([
    {
      name: "",
      value: "",
    },
    {
      name: "",
      value: "",
    },
    {
      name: "",
      value: "",
    },
  ]);
  const [bidProject] = useCreateBidProjectMutation();
  console.log(data);

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

  const filteredProjects = data?.data?.project?.filter((proj) => {
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

  const onFinish = async (values) => {
    const projectId = selectedProject?._id;
    const allModalData = {
      ...values,
      projectId,
    };
    // console.log(allModalData);
    try {
      const response = await bidProject(allModalData).unwrap();
      SuccessSwal({
        title: "",
        text: response?.message || response?.data?.message,
      });
      router.push(`profile/my-bids`);
    } catch (error) {
      ErrorSwal({
        title: "",
        text: error?.message || error?.data?.message,
      });
    }

    setIsBidModalOpen(false);
  };

  return (
    <>
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <CustomHeading>Projects List </CustomHeading>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
            <Select
              placeholder="Select Category"
              style={{ width: 200 }}
              value={selectedCategory || undefined}
              onChange={handleSelectCategory}
              allowClear
            >
              {categories?.map((cat) => (
                <Option key={cat._id} value={cat.name}>
                  {cat.name}
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
            {filteredProjects?.length === 0 ? (
              <p className="text-red-500 min-h-screen text-center text-2xl font-semibold">
                {" "}
                No project found!
              </p>
            ) : (
              <>
                {filteredProjects?.map((project) => (
                  <div
                    key={project._id}
                    className="bg-secondary p-4 rounded-lg overflow-hidden shadow-md flex flex-col hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="relative w-full h-48 mb-4 rounded-t-lg overflow-hidden">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${project?.image}`}
                        alt={project.projectName}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-2xl font-semibold mb-2">
                        {project.projectCategory}
                      </h3>
                      <p className=" mb-1 text-primary font-semibold">
                        <span className="font-bold text-black">Price:</span> $
                        {project.priceRange}
                      </p>
                      <p className=" mb-4 text-primary font-semibold">
                        <span className="font-bold text-black">Time:</span>{" "}
                        {project.time}
                      </p>
                      <p className=" mb-1 text-primary font-semibold">
                        <span className="font-bold text-black">City:</span>{" "}
                        {project.city}
                      </p>
                      <p className=" mb-1 text-primary font-semibold">
                        <span className="font-bold text-black">Post Code:</span>{" "}
                        {project.postCode}
                      </p>
                      <p className=" mb-1 text-primary font-semibold">
                        <span className="font-bold text-black">Street:</span>{" "}
                        {project.street}
                      </p>
                      <p className=" mb-4 text-primary font-semibold">
                        <span className="font-bold text-black">
                          Location Type:
                        </span>{" "}
                        {project.locationType}
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
              </>
            )}
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
                      <li className="font-bold text-xl">
                        {selectedProject.projectName}
                      </li>
                      <li className="text-primary font-semibold">
                        <span className="font-bold text-black  ">
                          Category:
                        </span>{" "}
                        {selectedProject.projectCategory}
                      </li>
                      <li className="text-primary font-semibold">
                        <span className="font-bold text-black  ">
                          Price Range:
                        </span>{" "}
                        ${selectedProject.priceRange}
                      </li>
                      <li className="text-primary font-semibold">
                        <span className="font-bold text-black  ">Time:</span>{" "}
                        {selectedProject.time}
                      </li>

                      <li className="text-primary font-semibold">
                        <span className="font-bold text-black  ">City:</span>{" "}
                        {selectedProject.city}
                      </li>
                      <li className="text-primary font-semibold">
                        <span className="font-bold text-black  ">
                          Post Code:
                        </span>{" "}
                        {selectedProject.postCode}
                      </li>
                      <li className="text-primary font-semibold">
                        <span className="font-bold text-black  ">Street:</span>{" "}
                        {selectedProject.street}
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
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${selectedProject?.image}`}
                        alt={selectedProject.projectName}
                        layout="fill"
                        objectFit="cover"
                        className="rounded"
                        onLoadingComplete={() => setIsImageLoaded(true)}
                      />
                    </div>
                    <p className="text-black text-xs font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                      {selectedProject.workDetails}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* providers create-bit modal */}
      <Modal
        open={isBidModalOpen}
        onCancel={handleCloseBidModal}
        footer={null}
        destroyOnClose
        title={
          <h2 className="text-xl font-bold text-primary">Bid this project</h2>
        }
      >
        <Form layout="vertical" onFinish={onFinish}>
          <div>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please enter a price" }]}
            >
              <InputNumber placeholder="Price" style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="Service Time (days)"
              name="serviceTime"
              rules={[
                { required: true, message: "Please enter the service time" },
              ]}
            >
              <InputNumber placeholder="4 days" style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="Starting Date"
              name="startTime"
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
              name="Workdetails"
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
          <div className="text-center flex justify-center gap-8">
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
