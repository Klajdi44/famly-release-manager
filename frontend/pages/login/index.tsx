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
  const [email, setEmail] = useState<string | undefined>(undefined);

  const [password, setPassword] = useState<string | undefined>(undefined);

  const handleLogin = () => {
    // make call to api
  };

  return (
    <Container size={420} my={40}>
      <Title align="center">Famly RM</Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          required
          mt="md"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <Button fullWidth mt="xl" onClick={handleLogin}>
          Log in
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
