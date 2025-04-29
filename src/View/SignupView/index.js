import React, { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignupView() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [institute, setInstitute] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!", { position: "bottom-center" });
      return;
    }

    if (!validatePassword(password)) {
      toast.error(
        "Password must be at least 8 characters long, include a number and a special character.",
        { position: "bottom-center" }
      );
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          name,
          institute,
          state,
          city,
          createdAt: new Date(),
        });
        toast.success("User registered successfully!", { position: "top-center" });
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message, { position: "bottom-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://pngmagic.com/product_images/dark-yellow-background.jpg')" }}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-xl p-10 transform transition duration-500 hover:shadow-2xl hover:scale-105"
        style={{
          boxShadow: "0 15px 35px -10px rgba(0, 0, 0, 0.9), 0 15px 15px -10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-[#3A1E08]">Create Your Account</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:outline-none focus:ring-[#3A1E08] focus:border-[#3A1E08]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Institute Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:outline-none focus:ring-[#3A1E08] focus:border-[#3A1E08]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Institute</label>
            <select
              required
              value={institute}
              onChange={(e) => setInstitute(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:outline-none focus:ring-[#3A1E08] focus:border-[#3A1E08]"
            >
              <option value="">Select Institute</option>
              <optgroup label="IITs">
                <option>IIT Bombay</option>
                <option>IIT Delhi</option>
                <option>IIT Kanpur</option>
                <option>IIT Madras</option>
                <option>IIT Kharagpur</option>
                <option>IIT Roorkee</option>
                <option>IIT Guwahati</option>
                <option>IIT BHU</option>
                <option>IIT Hyderabad</option>
                <option>IIT Indore</option>
                <option>IIT Ropar</option>
                <option>IIT Mandi</option>
                <option>IIT Gandhinagar</option>
                <option>IIT Jodhpur</option>
                <option>IIT Patna</option>
                <option>IIT Palakkad</option>
                <option>IIT Tirupati</option>
                <option>IIT Bhilai</option>
                <option>IIT Goa</option>
                <option>IIT Jammu</option>
              </optgroup>
              <optgroup label="NITs">
                <option>NIT Trichy</option>
                <option>NIT Surathkal</option>
                <option>NIT Warangal</option>
              </optgroup>
              <option>Birla Institute of Applied Sciences</option>
            </select>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1 text-gray-700">State</label>
              <select
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:outline-none focus:ring-[#3A1E08] focus:border-[#3A1E08]"
              >
                <option value="">Select State</option>
                <option>Uttarakhand</option>
                <option>Delhi</option>
                <option>Maharashtra</option>
                <option>Andhra Pradesh</option>
    <option>Arunachal Pradesh</option>
    <option>Assam</option>
    <option>Bihar</option>
    <option>Chhattisgarh</option>
    <option>Goa</option>
    <option>Gujarat</option>
    <option>Haryana</option>
    <option>Himachal Pradesh</option>
    <option>Jharkhand</option>
    <option>Karnataka</option>
    <option>Kerala</option>
    <option>Madhya Pradesh</option>
    <option>Maharashtra</option>
    <option>Manipur</option>
    <option>Meghalaya</option>
    <option>Mizoram</option>
    <option>Nagaland</option>
    <option>Odisha</option>
    <option>Punjab</option>
    <option>Rajasthan</option>
    <option>Sikkim</option>
    <option>Tamil Nadu</option>
    <option>Telangana</option>
    <option>Tripura</option>
    <option>Uttarakhand</option>
    <option>Uttar Pradesh</option>
    <option>West Bengal</option>
    <option>Andaman and Nicobar Islands</option>
    <option>Chandigarh</option>
    <option>Dadra and Nagar Haveli and Daman and Diu</option>
    <option>Lakshadweep</option>
    <option>Delhi</option>
    <option>Puducherry</option>
              </select>
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1 text-gray-700">City</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:outline-none focus:ring-[#3A1E08] focus:border-[#3A1E08]"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1 text-gray-700">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:outline-none focus:ring-[#3A1E08] focus:border-[#3A1E08]"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1 text-gray-700">Confirm Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:outline-none focus:ring-[#3A1E08] focus:border-[#3A1E08]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#3A1E08] text-white py-2 px-4 rounded-md hover:bg-[#543014] transition"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

            <div className="px-7 py-8 bg-gray-100 text-center">
                      <span className="text-gray-600">Already have an account ?</span>
                      <Link className="font-medium text-[#3A1E08] hover:text-[#543014]" to="/login">
                        Sign in
                      </Link>
                    </div>
        </form>
        <ToastContainer position="bottom-center" />
      </div>
    </div>
  );
}

export default SignupView;
