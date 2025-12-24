// Dummy user data for authentication
export const dummyUsers = [
  {
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
    name: "Admin User",
    route: "admin",
  },
];

// Function to authenticate user
export const authenticateUser = (email, password) => {
  const user = dummyUsers.find(
    (user) => user.email === email && user.password === password
  );
  return user || null;
};
