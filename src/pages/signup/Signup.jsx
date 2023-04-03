import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputAuthen from "../../components/inputAuthen/InputAuthen";
import { UserContext } from "../../context/UserAuth";

const Signup = () => {
  const { createUser } = UserContext();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await createUser(email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div>
      <InputAuthen
        title="Sign up"
        onSubmit={onSubmit}
        subtitle="Log in"
        path="/login"
        para="Already have an account"
        getData={onSubmit}
        error={error}
      />
    </div>
  );
};

export default Signup;
