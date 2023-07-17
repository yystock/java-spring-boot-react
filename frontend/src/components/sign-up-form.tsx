import { Button, Input, Link } from "@nextui-org/react";
import { useState } from "react";

import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { api } from "../api/axiosConfig";
import toast from "react-hot-toast";
import { useAuth } from "../providers/AuthProvider";

export default function SignUpForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmitRegister = () => {
    setLoading(true);
    api({
      method: "POST",
      url: "/register",
      data: {
        email: email,
        userName: userName,
        password: password,
      },
    })
      .then((response) => {
        toast.success("Sign up Succesfully!");
        login(email, password);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Sign up failed!");
      })
      .finally(() => {
        setPassword("");
        setEmail("");
        setUserName("");
        setLoading(false);
      });
  };
  return (
    <>
      <div className="flex flex-col gap-4">
        <h2>Sign Up</h2>
        <Input type="email" label="Email" className="max-w-sm" value={email} onValueChange={setEmail} />
        <Input type="text" label="userName" className="max-w-sm" value={userName} onValueChange={setUserName} />
        <Input
          label="Password"
          variant="bordered"
          value={password}
          onValueChange={setPassword}
          placeholder="Enter your password"
          endContent={
            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
              {isVisible ? (
                <BsFillEyeSlashFill className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <BsFillEyeFill className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className="max-w-sm"
        />
        <Button onClick={() => onSubmitRegister()} isLoading={loading}>
          submit
        </Button>
        <div>
          Already have an account? <Link href="/login">Login</Link>
        </div>
      </div>
    </>
  );
}
