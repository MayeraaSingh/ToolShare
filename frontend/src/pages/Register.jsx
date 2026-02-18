import { useState } from "react";
import { Button, TextInput } from "flowbite-react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import toast from 'react-hot-toast';
import { registerStart, registerSuccess, registerFailure } from "../redux/userSlice";
import OAuth from "../components/OAuth";
import loginImage from './login.jpg';

export default function Register() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(registerStart());
    setLoading(true);

    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      dispatch(registerSuccess(data.user));
      toast.success('Account created! Please update your profile.');
      navigate("/manage-profile");
    } catch (error) {
      dispatch(registerFailure(error.message));
      toast.error(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center px-4">
      <div className="flex flex-col lg:flex-row items-center lg:items-start w-full lg:w-3/4">
        {/* Left Section */}
        <div className="flex flex-col items-center lg:items-start w-full lg:w-1/2 mt-10">
          <div className="flex flex-col items-center lg:items-start w-full lg:w-3/4">
            <h1 className="text-4xl font-bold mb-2 text-center">ToolShare</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-center w-full">Create a new account to start sharing tools.</p>

            <form onSubmit={handleRegister} className="w-full space-y-4">
              {/* Email Input */}
              <TextInput
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-lg"
              />

              {/* Register Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Register"}
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center w-full my-4">
              <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
              <span className="px-3 text-sm text-gray-500">or</span>
              <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
            </div>

            {/* Google Register Button */}
            <div className="w-full">
              <OAuth />
            </div>

            {/* Link to Login */}
            <p className="mt-4 text-sm text-center w-full text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-500 hover:underline font-semibold">
                Log in here
              </Link>
            </p>
          </div>
        </div>

        {/* Right Section: Image */}
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <div className="relative w-full lg:w-[70%]">
            <img
              src={loginImage}
              alt="Register"
              className="object-contain w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Register() {
  const [email, setEmail] = useState(""); // State to hold user input
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Navigation hook for routing
  const [loading, setLoading] = useState(false); // Optional, to handle loading state

  // Handle input change
  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(registerStart()); // Start loading
    setLoading(true); // Set loading state to true

    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        credentials: 'include'
      });

      if (!response.ok) {
        // Check if the response is not OK (e.g., 400 or 500)
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();
      dispatch(registerSuccess(data.user)); // Dispatch success action with user data
      toast.success('Registration successful!');
      navigate("/"); // Redirect to home page after successful registration
    } catch (error) {
      // Dispatch failure if the registration fails
      dispatch(registerFailure(error.message));
      toast.error(error.message || 'Registration failed');
    } finally {
      setLoading(false); // Set loading state to false after request completes
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center px-4">
      <div className="flex flex-col lg:flex-row items-center lg:items-start w-full lg:w-3/4">
        {/* Left Section */}
        <div className="flex flex-col items-center lg:items-start w-full lg:w-1/2 mt-10">
          <div className="flex flex-col items-center lg:items-start w-full lg:w-3/4">
            <h1 className="text-4xl font-bold mb-8 text-center">ToolShare</h1>

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

            {/* Google Register Button */}
            <div className="w-full">
              <OAuth />
            </div>
          </div>
        </div>

        {/* Right Section: Image Placeholder */}
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <div className="relative w-full lg:w-[70%]">
            <img
              src={loginImage}
              alt="Login Image"
              className="object-contain w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
