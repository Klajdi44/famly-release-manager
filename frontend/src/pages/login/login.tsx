import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
} from "@mantine/core";
import axios from "axios";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../hooks/use-global-state/use-global-state";
import { resetTokens } from "../../util/jwt";
import { User } from "./types";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [, dispatch] = useGlobalState();

  const navigate = useNavigate();

  const isLoginButtonDisabled = useMemo(
    () => email === "" || password === "",
    [email, password]
  );

  const handleLogin = async () => {
    try {
      const result = await axios.post<{ user: User }>(
        "http://localhost:5000/api/v1/auth/login/",
        {
          email,
          password,
        }
      );
      // TODO: do we need to check for status with axios?
      if (result.status === 200) {
        resetTokens();
        localStorage.setItem("user", JSON.stringify(result.data.user));
        dispatch({
          type: "AUTH_ADD_USER",
          payload: result.data.user,
        });
        navigate("/");
      }
    } catch (error) {
      console.log("Something went wrong while loging in");
    }
  };

  return (
    <Container size={420} my={40}>
      <Title align="center">Famly RM</Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Email"
          name="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <PasswordInput
          label="Password"
          name="password"
          placeholder="Enter your password"
          required
          mt="md"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          mt="xl"
          onClick={handleLogin}
          disabled={isLoginButtonDisabled}
        >
          Log in
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
