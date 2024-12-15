import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Encryptor } from "../util/encryptor";
import { Password } from "primereact/password";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(Boolean);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(Boolean);

  const navigate = useNavigate();

  const handleLogin = () => {
    setEmailError(email.length === 0);
    setPasswordError(password.length === 0);
    if (!emailError && !passwordError) {
      localStorage.setItem("email", Encryptor.encrypt(email));
      localStorage.setItem("password", Encryptor.encrypt(password));
      navigate("/courses");
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-column align-items-center justify-content-center">
        <div className="flex flex-wrap align-items-center mb-3 gap-2">
          <label htmlFor="email" className="p-sr-only">
            Email
          </label>
          <InputText
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            id="email"
            placeholder="Email"
            className={"w-18rem mr-2 " + (emailError ? "p-invalid" : "")}
          />
        </div>
        <div className="flex flex-wrap align-items-center mb-3 gap-2">
          <label htmlFor="password" className="p-sr-only">
            Password
          </label>
          <Password
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            feedback={false}
            toggleMask
            id="password"
            placeholder="Password"
            inputClassName={"w-18rem mr-2 " + (passwordError ? "p-invalid" : "")}
          />
        </div>
        <Button label="Login" onClick={handleLogin} />
      </div>
    </>
  );
};

export default Login;
