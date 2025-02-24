"use client";

import { SuccessSwal } from "@/components/utils/allSwalFire";
import { useAllCategoryQuery } from "@/redux/features/projects/projectApi";
import { AutoComplete, Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdArrowDropDown } from "react-icons/md";

function ServiceAddBar({ user }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const { data } = useAllCategoryQuery();
  const suggestions = data?.data || [];

  const handleAdd = () => {
    const selectedCategory = suggestions.find(
      (item) => item.catagory === searchTerm
    );

    localStorage.setItem("selectedCategory", selectedCategory.catagory);

    if (user) {
      router.push(`/add-project`);
    } else {
      SuccessSwal({
        title: "",
        text: " Please login first! ",
      });
      router.push(`/login?redirect=/add-project`);
    }
  };

  const handleSelect = (value) => {
    setSearchTerm(value);
  };

  return (
    <div className="flex justify-center mt-6 sm:mt-10">
      <div className="flex w-full max-w-4xl sm:max-w-5xl lg:max-w-6xl p-4 h-auto">
        {/* Ant Design Form */}
        <Form
          layout="inline"
          className="flex w-full items-center justify-center flex-wrap gap-4"
          onFinish={handleAdd}
        >
          <Form.Item
            name="serviceSearch"
            rules={[
              { required: true, message: "Please select a service category!" },
            ]}
            className="w-full sm:w-2/3 lg:w-3/4 xl:w-1/2"
          >
            <AutoComplete
              options={suggestions?.map((suggestion) => ({
                value: suggestion.catagory, // Corrected field
              }))}
              onSelect={handleSelect}
              onSearch={setSearchTerm}
              style={{ width: "100%" }}
            >
              <Input
                placeholder="What type of services are you looking for?"
                value={searchTerm}
                style={{ width: "100%" }}
                className="border border-primary px-4 py-2 focus:outline-none"
                suffix={<MdArrowDropDown />}
              />
            </AutoComplete>
          </Form.Item>

          {/* Add Button */}
          <Form.Item className="w-full sm:w-auto sm:ml-4 mt-4 sm:mt-0">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-primary text-white hover:bg-white hover:text-primary hover:border hover:border-primary transition duration-300 w-full sm:w-auto"
            >
              Add
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default ServiceAddBar;
