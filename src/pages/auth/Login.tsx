import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../component/common/Input";
import { useAuth } from "../../hooks/useAuth";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { authAction, isLoading, isError, error } = useAuth();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    authAction({
      data: { email, password },
      path: "login",
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
              Enter your username and password to login.
            </p>
          </header>

          <Input
            label="Email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
          />

          <Input
            label="Password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          {isError && <p>{ error?.message }</p> }
          <button
            type="submit"
            className="w-full mt-3 bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            {!isLoading ? "Sign In" : "loading..."}
          </button>

          <div className="flex justify-center mt-8">
            <p className="text-gray-600 text-center">Don't have an account? </p>
            <Link
              to="/register"
              className="ml-5 font-bold text-blue-500 hover:text-blue-700"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
