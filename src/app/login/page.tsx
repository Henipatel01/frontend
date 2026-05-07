"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { TextField, Button, Container } from "@mui/material";
import useStore from "@/store/useStore";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isSubmitting = useRef(false);
  const router = useRouter();
  const setToken = useStore((state) => state.setToken);

  const handleLogin = async () => {
    if (isSubmitting.current) return;
    isSubmitting.current = true;

    try {
      setLoading(true);

      if (!username || !password) {
        alert("Please enter username and password");
        isSubmitting.current = false;
        return;
      }

      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 30,
        }),
      });

      const data = await res.json();
      console.log("Full response:", data)

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

   
      setToken(data.accessToken);

      router.push("/dashboard");

    } catch (err: any) {
      console.log("ERROR:", err.message);
      alert(err.message || "Login failed");
    } finally {
      setLoading(false);
      isSubmitting.current = false;
    }
  };

  return (
    <Container maxWidth="sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <h2>Login</h2>

        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Container>
  );
}