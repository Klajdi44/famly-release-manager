import React, { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
} from "@mantine/core";
import type { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/userSlice";

const Login = () => {
  const [userInfo] = useState({
    email: undefined,
    password: undefined,
  });

  // eslint-disable-next-line no-unused-vars
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const handleLogIn = () => {
    dispatch(login(userInfo));
  };

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
        />

        <Button fullWidth mt="xl" onClick={handleLogIn}>
          Log in
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
