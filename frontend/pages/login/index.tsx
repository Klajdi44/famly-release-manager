import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
} from "@mantine/core";

const Login = () => {
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

        <Button fullWidth mt="xl">
          Log in
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
