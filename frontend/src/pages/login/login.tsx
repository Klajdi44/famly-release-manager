import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
} from "@mantine/core";
import { useMemo, useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const isLoginButtonDisabled = useMemo(
    () => email === "" || password === "",
    [email, password]
  );

  const handleLogin = () => {
    // make call to api
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
