import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from 'react-hot-toast';
import { updateStart, updateSuccess, updateFailure } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { Button, TextInput, Textarea, FileInput } from "flowbite-react";
import imageCompression from "browser-image-compression";

export default function AddTool(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector((state) => state.user.currentUser);
    const [toolData, setToolData] = useState({
        name: "",
        description: "",
        image: null,
        max: 1,
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
            toast.error("File size exceeds the 5 MB limit. Please choose a smaller file.");
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
            toast.success("Image compressed successfully!");
        } catch (error) {
            toast.error("Image compression failed. Please try another image.");
            console.error("Image compression failed:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentUser || !currentUser.id) {
            toast.error("User not authenticated. Please log in.");
            return;
        }

        const formData = new FormData();
        formData.append('name', toolData.name);
        formData.append('description', toolData.description);
        formData.append('owner', currentUser.id);
        formData.append('max', toolData.max);
        formData.append('price', toolData.price);
        if (toolData.image) {
            formData.append('image', toolData.image);
        }

        try {
            dispatch(updateStart());

            const response = await fetch("/api/tools/add", {
                method: "POST",
                body: formData,
                credentials: 'include'
            });

            const data = await response.json();

            if (response.ok) {
                dispatch(updateSuccess(currentUser));
                toast.success("Tool added successfully!");
                navigate("/explore");
            } else {
                dispatch(updateFailure(data.message));
                toast.error(data.message || "Failed to add tool.");
            }
        } catch (error) {
            dispatch(updateFailure(error.message));
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto p-6 bg-white dark:bg-gray-800">
            <h1 className="text-2xl font-semibold text-center mb-6 text-teal-600 dark:text-teal-400">
                Register a New Tool
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
                <label htmlFor="name" className="block text-sm dark:text-gray-300 font-medium text-gray-700">
                Tool Name
                </label>
                <TextInput
                id="name"
                name="name"
                value={toolData.name}
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
                />
            </div>
            {/* Max Rent Period */}
            <div>
                <label htmlFor="max" className="block text-sm dark:text-gray-300 font-medium text-gray-700">
                Maximum Quantity Available
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
            <Button type="submit" className="w-full">Add Tool</Button>
        </form>
        </div>
    );
};
