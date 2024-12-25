import React from "react";
import { Button, TextInput, Label } from "flowbite-react";

export default function Register() {
  return (
    <div className="h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
      <div className="flex flex-col lg:flex-row items-center lg:items-start w-full lg:w-3/4">
        {/* Left Section: Registration Form */}
        <div className="flex flex-col items-center lg:items-start w-full lg:w-1/2 -mt-10 ">
          {/* Title */}
          <h1 className="text-4xl font-bold mb-8 text-center lg:text-left">
            ToolShare
          </h1>

          <div className="flex flex-col items-center lg:items-start w-full lg:w-3/4">
            {/* Email Input */}
            <div className="mb-6 w-full">
              <TextInput
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                className="text-lg"
              />
            </div>

            {/* Register Button */}
            <div className="mb-6 w-full">
              <Button type="submit" size="lg" className="w-full">
                Register
              </Button>
            </div>

            {/* Google Register Button */}
            <div className="w-full">
              <Button
                color="gray"
                size="lg"
                className="w-full"
                onClick={() => alert("Google Register Coming Soon!")}
              >
                Register with Google
              </Button>
            </div>
          </div>
        </div>

        {/* Right Section: Image Placeholder */}
        <div className="w-full lg:w-3/4 h-50 flex justify-center items-center -mt-20">
          <div className="w-full lg:w-2/3 h-50 lg:h-[24rem] bg-gray-300 rounded-lg flex items-center justify-center">
            <span className="text-xl text-gray-500">Image</span>
          </div>
        </div>
      </div>
    </div>
  );
}
