import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStart, updateSuccess, updateFailure } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import {Button,TextInput,Textarea,FileInput} from "flowbite-react";

const AddTool = () => {
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

    const handleFileChange = (e) => {
        setToolData((prevData) => ({ ...prevData, image: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentUser) {
            alert("User not authenticated");
            return;
        }

        // Prepare form data to send to the server
        const formData = new FormData();
        formData.append("owner", toolData.owner);
        formData.append("flatNumber", toolData.flatNumber);
        formData.append("productName", toolData.productName);
        formData.append("description", toolData.description);
        formData.append("image", toolData.image);
        formData.append("max", toolData.max);
        formData.append("price", toolData.price);

        try {
            dispatch(updateStart());

            const response = await fetch("http://localhost:3000/api/tools/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                dispatch(updateSuccess(data.user)); // Assuming the response contains updated user data
                alert("Tool added successfully!");
                navigate("/profile"); // Redirect to profile or another page after adding
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
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300" htmlFor="owner">
                        Owner Name
                    </label>
                    <TextInput
                        id="owner"
                        name="owner"
                        value={toolData.owner}
                        onChange={handleChange}
                        required
                        className="dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                    />
                </div>

                {/* Flat Number */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300" htmlFor="flatNumber">
                        Flat Number
                    </label>
                    <TextInput
                        id="flatNumber"
                        name="flatNumber"
                        value={toolData.flatNumber}
                        onChange={handleChange}
                        required
                        className="dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                    />
                </div>

                {/* Product Name */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300" htmlFor="productName">
                        Product Name
                    </label>
                    <TextInput
                        id="productName"
                        name="productName"
                        value={toolData.productName}
                        onChange={handleChange}
                        required
                        className="dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                    />
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300" htmlFor="description">
                        Description
                    </label>
                    <Textarea
                        id="description"
                        name="description"
                        value={toolData.description}
                        onChange={handleChange}
                        rows="4"
                        required
                        className="dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                    />
                </div>

                {/* Product Image */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300" htmlFor="image">
                        Product Image
                    </label>
                    <FileInput
                        id="image"
                        name="image"
                        onChange={handleFileChange}
                        accept="image/png, image/jpeg"
                        required
                        className="dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                    />
                </div>

                {/* Max Rent Period */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300" htmlFor="max">
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
                        className="dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                    />
                </div>

                {/* Rent Price */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300" htmlFor="price">
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
                        className="dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                    />
                </div>

                {/* Submit Button */}
                <div className="mb-4">
                    <Button
                        type="submit"
                        className="w-full py-2 px-4 text-white font-semibold rounded-md hover:bg-blue-700 dark:bg-teal-700 dark:hover:bg-teal-800"
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddTool;
