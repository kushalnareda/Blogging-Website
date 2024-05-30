import { SignupSchema } from "@kushalsinghnareda/medium-common";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupSchema>({
    name: "",
    username: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const { name = "", username, password } = postInputs;
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        { name, username, password }
      );
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      localStorage.setItem("name", name);
      navigate("/blogs");
    } catch (e) {
      console.error("Error during request:", e);
      alert("An error occurred. Please try again.");
    }
  }

  return (
    <div className="bg-white h-screen flex flex-col justify-center items-center p-4">
      <div>
        <div className="text-center px-10">
          <div className="text-4xl font-extrabold mb-2">
            {type === "signin" ? "Log into Account" : "Create an Account"}
          </div>
          <div className="text-md text-slate-600 mb-8">
            {type === "signin" ? "Don't have an account?" : "Already have an account?"}
            <Link to={type === "signin" ? "/signup" : "/signin"} className="text-blue-500 underline ml-1">
              {type === "signin" ? "Sign up" : "Sign in"}
            </Link>
          </div>
        </div>
        <div>
          {type === "signup" ? (
            <LabelledInput
              label="Name"
              placeholder="Enter your name"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  name: e.target.value,
                });
              }}
            />
          ) : null}
          <LabelledInput
            label="Username"
            placeholder="Enter your Email"
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                username: e.target.value,
              });
            }}
          />
          <div className="mb-6">
            <LabelledInput
              label="Password"
              type={"password"}
              placeholder="Enter your Password"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />
          </div>

          <button
            type="button"
            onClick={sendRequest}
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full"
          >
            {type === "signup" ? "Signup" : "Signin"}
          </button>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
  return (
    <div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-semibold font-medium text-gray-900">
          {label}
        </label>
        <input
          onChange={onChange}
          type={type || "text"}
          className="bg-white border border-grey-500 text-black text-sm rounded-lg focus:ring-grey-500 focus:border-grey-500 block w-full p-2.5"
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
}
