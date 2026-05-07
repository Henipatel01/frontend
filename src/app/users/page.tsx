"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
   Container, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper,
  TextField, Pagination, CircularProgress,
  Chip, Avatar,
} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useStore from "@/store/useStore";
import { useAuthGuard } from "@/hook/useAuthGuard";

const LIMIT = 10;

export default function UsersPage() {
      const { ready} = useAuthGuard();
  if (!ready) return null;
  useAuthGuard();

  const { users, totalUsers, fetchUsers } = useStore();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const totalPages = Math.ceil(totalUsers / LIMIT);

  const loadUsers = async (currentPage: number, searchTerm: string) => {
    setLoading(true);
    const skip = (currentPage - 1) * LIMIT;
    await fetchUsers(LIMIT, skip, searchTerm);
    setLoading(false);
  };

  // fetch on page or search change
  useEffect(() => {
    const delay = setTimeout(() => {
      loadUsers(page, search);
    }, 400); // debounce search

    return () => clearTimeout(delay);
  }, [page, search]);

  // reset to page 1 when searching
  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
        Users
      </Typography>

      {/* Search */}
      <TextField
        label="Search users..."
        variant="outlined"
        fullWidth
        sx={{ mb: 3 }}
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />

      {/* Table */}
      {loading ? (
       <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead sx={{ bgcolor: "primary.main" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>User</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Gender</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Phone</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Company</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  hover
                  sx={{ cursor: "pointer" }}
                  onClick={() => router.push(`/users/${user.id}`)}
                >
                  <TableCell>
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                      <Avatar sx={{ bgcolor: "primary.light", width: 36, height: 36 }}>
                        {user.firstName[0]}
                      </Avatar>
                      {user.firstName} {user.lastName}
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.gender}
                      size="small"
                      color={user.gender === "male" ? "info" : "secondary"}
                    />
                  </TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.company?.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
}