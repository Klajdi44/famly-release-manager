import React from "react";

import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
} from "@mantine/core";
import { useState } from "react";

const Login = () => {
  // eslint-disable-next-line no-unused-vars
  const [email, setEmail] = useState<string | undefined>(undefined);
  // eslint-disable-next-line no-unused-vars
  const [password, setPassword] = useState<string | undefined>(undefined);

  // eslint-disable-next-line no-unused-vars
  const test = "1234";

  const handleLogin = () => {};

  return (
    <Container size={420} my={40}>
      <Title align="center">Famly RM</Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="Enter your email" required />
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          required
          mt="md"
          value={password}
        />

        <Button fullWidth mt="xl" onClick={handleLogin}>
          Log in
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
