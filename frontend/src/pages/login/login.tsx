import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons";
import axios, { AxiosError } from "axios";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../hooks/use-global-state/use-global-state";
import { resetTokens } from "../../util/jwt";
import { UserWithTokens } from "./types";

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
      const result = await axios.post<UserWithTokens>(
        "http://localhost:5000/api/v1/auth/login/",
        {
          email,
          password,
        }
      );

      resetTokens();
      localStorage.setItem("userTokens", JSON.stringify(result.data.token));
      // TODO: decode user and pass it to dispatch
      dispatch({
        type: "AUTH_ADD_USER",
        payload: result.data.user,
      });
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        showNotification({
          title: "Something went wrong!",
          message: error.response?.data.message,
          color: "red",
          icon: <IconX />,
        });
      }
    }
  };

  return (
    <Container size={420} my={40}>
      <Title align="center">Famly Release Manager</Title>

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
