"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAuthGuard } from "@/hook/useAuthGuard";


interface UserDetail {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  age: number;
  birthDate: string;
  address: { city: string; state: string; country: string };
  company: { name: string; department: string; title: string };
  image: string;
  username: string;
}

export default function UserDetailPage() {

    const { ready } = useAuthGuard();
  if (!ready) return null;
  useAuthGuard();

  const params = useParams();
  const router = useRouter();

  // safe id handling
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);

  //fetch user with error handling
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);

        const res = await fetch(`https://dummyjson.com/users/${id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await res.json();
        setUser(data);

      } catch (error) {
        console.error("Fetch error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUser();
  }, [id]);

  //loading UI
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  //not found UI
  if (!user) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h6">User not found.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.back()}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        {/*  Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            mb: 3,
          }}
        >
          <Avatar
            src={user.image}
            sx={{ width: 80, height: 80 }}
          >
            {user.firstName[0]}
          </Avatar>

          <Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold" }}
            >
              {user.firstName} {user.lastName}
            </Typography>

            <Typography color="text.secondary">
              @{user.username}
            </Typography>

            <Chip
              label={user.gender}
              size="small"
              color={user.gender === "male" ? "info" : "secondary"}
              sx={{ mt: 0.5 }}
            />
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Details */}
        <Grid container spacing={2}>
           <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Email
            </Typography>
            <Typography>{user.email}</Typography>
          </Grid>

           <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Phone
            </Typography>
            <Typography>{user.phone}</Typography>
          </Grid>

           <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Age
            </Typography>
            <Typography>{user.age}</Typography>
          </Grid>

           <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Birth Date
            </Typography>
            <Typography>{user.birthDate}</Typography>
          </Grid>

           <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Address
            </Typography>
            <Typography>
              {user.address?.city}, {user.address?.state}, {user.address?.country}
            </Typography>
          </Grid>

           <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Company
            </Typography>
            <Typography>{user.company?.name}</Typography>
          </Grid>

           <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Department
            </Typography>
            <Typography>{user.company?.department}</Typography>
          </Grid>

           <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Job Title
            </Typography>
            <Typography>{user.company?.title}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}