import { useState } from "react";
import { registerApi } from "../lib/api";

export const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    await registerApi(name,email,password);
  };

  return (
    <div className="flex h-screen items-center justify-center ">
      <div className="border p-12">
        <form onSubmit={handleRegister} className="flex flex-col gap-6 ">
          <div className="flex gap-2">
            <label htmlFor="username">Username</label>
            <input
              onChange={(e) => setName(e.target.value)}
              id="username"
              type="text"
              placeholder="Enter username"
            />
          </div>
          <div className="flex gap-2">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="text"
              placeholder="Enter email"
            />
          </div>
          <div className="flex gap-2">
            <label htmlFor="password">password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter password"
            />
          </div>
          <button className="bg-blue-600 rounded-2xl p-3 text-white cursor-pointer active:scale-95">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
