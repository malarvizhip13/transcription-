function Login({ onLogin }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email && password) {
      onLogin(email);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-2xl w-90"
      >
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Sign In
        </h1>

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 ffocus:ring-blue-500"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border  p-3 mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          className="w-full  bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;