import React, { useState } from "react";
import { Button, TextInput } from "flowbite-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerStart, registerSuccess, registerFailure } from "../redux/userSlice"; // Correct path to your userSlice actions
import OAuth from "../components/OAuth";

export default function Register() {
  const [email, setEmail] = useState(""); // State to hold user input
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Navigation hook for routing
  const [loading, setLoading] = useState(false); // Optional, to handle loading state
  const [error, setError] = useState(""); // To handle any errors from the API

  // Handle input change
  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(registerStart()); // Start loading
    setLoading(true); // Set loading state to true
    setError(""); // Reset error state

    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        // Check if the response is not OK (e.g., 400 or 500)
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();
      dispatch(registerSuccess(data.user)); // Dispatch success action with user data
      navigate("/"); // Redirect to home page after successful registration
    } catch (error) {
      // Dispatch failure if the registration fails
      dispatch(registerFailure(error.message));
      setError(error.message); // Display error to user
    } finally {
      setLoading(false); // Set loading state to false after request completes
    }
  };


  return (
    <div className="h-screen flex flex-col justify-center items-center px-4">
      <div className="flex flex-col lg:flex-row items-center lg:items-start w-full lg:w-3/4">
        <div className="flex flex-col items-center lg:items-start w-full lg:w-1/2 -mt-10">
          <h1 className="text-4xl font-bold mb-8 text-center lg:text-left">ToolShare</h1>

          <div className="flex flex-col items-center lg:items-start w-full lg:w-3/4">
            {/* Email Input */}
            <div className="mb-6 w-full">
              <TextInput
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleInputChange} // Track the email input
                required
                className="text-lg"
              />
            </div>

            {/* Register Button */}
            <div className="mb-6 w-full">
              <Button 
                type="button"
                size="lg"
                className="w-full"
                onClick={handleRegister} // Handle the button click
                disabled={loading} // Optionally disable during loading
              >
                {loading ? "Registering..." : "Register"}
              </Button>
            </div>

            {/* Display error message if any */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Google Register Button */}
            <div className="w-full">
              <OAuth />
            </div>
          </div>
        </div>

        {/* Right Section: Image Placeholder */}
        <div className="w-full lg:w-3/4 h-50 flex justify-center items-center" >

        </div>
    </div>
    </div>
  );
}