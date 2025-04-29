import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        // Store user data in Firestore
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          name,
          institute,
          state,
          city,
          createdAt: new Date(),
        });
        toast.success("User registered successfully!", { position: "top-center" });

        // Redirect to Login Page
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup Error:", error.message);
      toast.error(error.message, { position: "bottom-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('https://pngmagic.com/product_images/dark-yellow-background.jpg')" }}
    >
      <div
        style={{
          boxShadow: "0 20px 50px -10px rgba(0, 0, 0, 0.9), 0 20px 20px -10px rgba(0, 0, 0, 0.3)",
          animation: "moveIn 1s ease-out",
        }}
        className="bg-white rounded-lg shadow-xl overflow-hidden max-w-[85vh] w-full max-h-[80vh] h-auto"
      >
        <div className="p-6">
          <h2 className="text-center text-2xl font-extrabold text-gray-900">Create Account</h2>
          <form onSubmit={handleSignup} className="mt-6 space-y-4">
            <input
              placeholder="Name"
              className="block w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-md"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              placeholder="Institute Email"
              type="email"
              className="block w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-md"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <select
              className="block w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-md"
              required
              value={institute}
              onChange={(e) => setInstitute(e.target.value)}
            >
              <option value="">Select Institute</option>
              <option value="Birla Insstitute of Applied Sciences">Birla Institute of Applied Sciences</option>
              <optgroup label="IITs">
                <option value="IIT Bombay">IIT Bombay</option>
                <option value="IIT Delhi">IIT Delhi</option>
                <option value="IIT Kanpur">IIT Kanpuria</option>
              </optgroup>
              <optgroup label="NITs">
                <option value="NIT Trichy">NIT Trichy</option>
                <option value="NIT Surathkal">NIT Surathkal</option>
                <option value="NIT Warangal">NIT Warangal</option>
              </optgroup>
            </select>

            <select
              className="block w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-md"
              required
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option value="">Select State</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="Delhi">Delhi</option>
              <option value="Maharashtra">Maharashtra</option>
            </select>

            <input
              placeholder="City"
              className="block w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-md"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <input
              placeholder="Password"
              type="password"
              className="block w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-md"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              placeholder="Confirm Password"
              type="password"
              className="block w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-md"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              type="submit"
              className={`w-full py-2 text-white bg-blue-600 rounded-md ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="bottom-center" />
    </div>
  );
}

export default SignupView;
