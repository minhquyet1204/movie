import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputAuthen from "../../components/inputAuthen/InputAuthen";
import { UserContext } from "../../context/UserAuth";
const Login = () => {
  const [error, setError] = useState();
  const { signIn } = UserContext();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      await signIn(email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <InputAuthen
        onSubmit={onSubmit}
        title="Log in"
        subtitle="Sign up"
        path="/signup"
        para="Don't have an account"
        error={error}
      />
    </div>
  );
};

export default Login;
