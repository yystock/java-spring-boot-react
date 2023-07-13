import { Button, Input } from "@nextui-org/react";
import { useState } from "react";

import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { Link } from "@nextui-org/react";
import { useAuth } from "../providers/AuthProvider";

export default function AuthForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmitLogin = () => {
    setLoading(true);
    login(email, password);
    setPassword("");
    setEmail("");
    setLoading(false);
  };
  return (
    <>
      <div className="flex flex-col gap-4">
        <h2>Log in</h2>
        <Input type="email" label="Email" className="max-w-sm" value={email} onValueChange={setEmail} />
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
        <Button onClick={() => onSubmitLogin()} isLoading={loading}>
          submit
        </Button>
        <div>
          Do not have an account? <Link href="/sign-up">Sign Up</Link>
        </div>
      </div>
    </>
  );
}
