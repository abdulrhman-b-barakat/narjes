import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../component/common/Input";
import { useAuth } from "../../hooks/useAuth";

const Register = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPassTouched, setIsPassTouched] = useState(false);

  const { authAction, isLoading, isError, error } = useAuth();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) return;
    if (password.length < 8) return;
    authAction({
      data: { name, email, password },
      path: "register"
    });
  };

  return (
    <section className="flex">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-lg border border-gray-300 shadow-sm"
        >
          <header>
            <h2 className="text-2xl font-bold text-center mb-6">Hey there!</h2>
            <p className="text-center font-semibold mb-6">
              let's create a new account. enter your info
            </p>
          </header>

          <Input
            label="Full Name"
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />

          <Input
            label="Email"
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Password"
            id="password"
            type="password"
            placeholder="create password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setIsPassTouched(true);
            }}
            invalidMessage={
              isPassTouched && password.length < 8
                ? "Password must be at least 8 chars"
                : ""
            }
          />

          <Input
            label="Password again"
            id="confirmPassword"
            type="password"
            placeholder="Enter password again"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            invalidMessage={
              confirmPassword && confirmPassword !== password
                ? "Passwords do not match"
                : ""
            }
          />

          {isError && <div className="text-red-600 p-3">{error?.message}</div>}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-3 w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            {!isLoading ? "Sign up" : "creating an account... "}
          </button>

          <div className="flex justify-center mt-8">
            <p className="text-gray-600 text-center">I have an account </p>
            <Link
              to="/login"
              className="ml-5 font-bold text-blue-500 hover:text-blue-700"
            >
              login
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
