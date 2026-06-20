import { useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div
      style={{
        width: "350px",
        margin: "80px auto",
      }}
    >
      <h2>StudentHub Login</h2>

      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <Input
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <Button
        text="Login"
        type="submit"
      />
    </div>
  );
}

export default Login;