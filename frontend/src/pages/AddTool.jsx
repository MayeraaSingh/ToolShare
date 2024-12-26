import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStart, updateSuccess, updateFailure } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { Button, TextInput, Textarea, FileInput } from "flowbite-react";
import imageCompression from "browser-image-compression";

export default function AddTool(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector((state) => state.user.currentUser);
    const [toolData, setToolData] = useState({
        owner: currentUser ? currentUser.name : "",
        flatNumber: "",
        productName: "",
        description: "",
        image: null,
        max: 0,
        price: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setToolData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const maxSize = 5 * 1024 * 1024; // 5 MB

        if (file.size > maxSize) {
            alert("File size exceeds the 5 MB limit. Please choose a smaller file.");
            return;
        }

        // Optional: Compress the image
        try {
            const compressedFile = await imageCompression(file, {
                maxSizeMB: 1,
                maxWidthOrHeight: 1024,
                useWebWorker: true,
            });
            setToolData((prevData) => ({ ...prevData, image: compressedFile }));
        } catch (error) {
            console.error("Image compression failed:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentUser) {
            alert("User not authenticated");
            return;
        }

        const formData = new FormData();
        Object.keys(toolData).forEach((key) => {
            formData.append(key, toolData[key]);
        });

        try {
            dispatch(updateStart());

            const response = await fetch("http://localhost:3000/api/tools/add", {
                method: "POST",
                body: formData, // No 'Content-Type', as FormData sets it automatically
            });

            const data = await response.json();

            if (response.ok) {
                dispatch(updateSuccess(data.user)); // Assuming the response contains updated user data
                alert("Tool added successfully!");
                navigate("/");
            } else {
                dispatch(updateFailure(data.message));
                alert("Failed to add tool.");
            }
        } catch (error) {
            dispatch(updateFailure(error.message));
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto p-6 bg-white dark:bg-gray-800">
            <h1 className="text-2xl font-semibold text-center mb-6 text-teal-600 dark:text-teal-400">
                Register a New Tool
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
            {/* Owner Name */}
            <div>
                <label htmlFor="owner" className="block text-sm dark:text-gray-300 font-medium text-gray-700">
                Owner Name
                </label>
                <TextInput
                id="owner"
                name="owner"
                value={toolData.owner}
                onChange={handleChange}
                required
                />
            </div>
            {/* Flat Number */}
            <div>
                <label htmlFor="flatNumber" className="block text-sm dark:text-gray-300 font-medium text-gray-700">
                Flat Number
                </label>
                <TextInput
                id="flatNumber"
                name="flatNumber"
                value={toolData.flatNumber}
                onChange={handleChange}
                required
                />
            </div>
            {/* Product Name */}
            <div>
                <label htmlFor="productName" className="block text-sm dark:text-gray-300 font-medium text-gray-700">
                Product Name
                </label>
                <TextInput
                id="productName"
                name="productName"
                value={toolData.productName}
                onChange={handleChange}
                required
                />
            </div>
            {/* Description */}
            <div>
                <label htmlFor="description" className="block text-sm dark:text-gray-300 font-medium text-gray-700">
                Description
                </label>
                <Textarea
                id="description"
                name="description"
                value={toolData.description}
                onChange={handleChange}
                rows="4"
                required
                />
            </div>
            {/* Product Image */}
            <div>
                <label htmlFor="image" className="block text-sm dark:text-gray-300 font-medium text-gray-700">
                Product Image
                </label>
                <FileInput
                id="image"
                name="image"
                onChange={handleFileChange}
                accept="image/png, image/jpeg"
                required
                />
            </div>
            {/* Max Rent Period */}
            <div>
                <label htmlFor="max" className="block text-sm dark:text-gray-300 font-medium text-gray-700">
                Maximum Rental Period (in days)
                </label>
                <TextInput
                type="number"
                id="max"
                name="max"
                value={toolData.max}
                onChange={handleChange}
                min="1"
                required
                />
            </div>
            {/* Rent Price */}
            <div>
                <label htmlFor="price" className="block text-sm dark:text-gray-300 font-medium text-gray-700">
                Rent Price (in INR)
                </label>
                <TextInput
                type="number"
                id="price"
                name="price"
                value={toolData.price}
                onChange={handleChange}
                min="0"
                required
                />
            </div>
            {/* Submit Button */}
            <Button type="submit">Submit</Button>
        </form>
        </div>
    );
};
