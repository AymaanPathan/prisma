export const RegisterPage = () => {
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("registered");
  };

  return (
    <div className="flex h-screen items-center justify-center ">
      <div className="border p-12">
        <form onSubmit={handleRegister} className="flex flex-col gap-6 ">
          <div className="flex gap-2">
            <label htmlFor="username">Username</label>
            <input id="username" type="text" placeholder="Enter username" />
          </div>
          <div className="flex gap-2">
            <label htmlFor="email">Email</label>
            <input id="email" type="text" placeholder="Enter email" />
          </div>
          <div className="flex gap-2">
            <label htmlFor="password">password</label>
            <input type="password" placeholder="Enter password" />
          </div>
          <button className="bg-blue-600 rounded-2xl p-3 text-white cursor-pointer active:scale-95">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
