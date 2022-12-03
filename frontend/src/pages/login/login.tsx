import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import axios from "axios";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // TODO: add token names in constants
  const [, setAccessToken] = useLocalStorage({
    key: "accessToken",
  });
  const [, setRefreshToken] = useLocalStorage({
    key: "refreshToken",
  });

  const navigate = useNavigate();

  const isLoginButtonDisabled = useMemo(
    () => email === "" || password === "",
    [email, password]
  );

  const handleLogin = async () => {
    try {
      const result = await axios.post(
        "http://localhost:5000/api/v1/auth/login/",
        {
          email,
          password,
        }
      );

      if (result.status === 200) {
        setAccessToken(result.data.token.access);
        setRefreshToken(result.data.token.refresh);
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
