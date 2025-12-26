import { createSlice } from "@reduxjs/toolkit";
import api from "../../utils/axios";
import Swal from "sweetalert2";
import { api as rtkApi } from "../../services/Api";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  userDetails: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.loading = false;
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.userDetails = null;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setLoading, setError, setUser, clearUser, setUserDetails } = authSlice.actions;

// Thunk for signup (kept for backward compatibility, but can use RTK Query directly)
export const signup = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const result = await dispatch(
      rtkApi.endpoints.register.initiate({ data: userData })
    ).unwrap();

    if (result?.data) {
      return { success: true, user: result.data.user };
    }
    return { success: false, error: "Signup failed" };
  } catch (error) {
    const errorMessage = error?.data?.message || error?.message || "Signup failed";
    dispatch(setError(errorMessage));
    Swal.fire({
      title: "Signup Failed",
      text: errorMessage,
      icon: "error",
      confirmButtonColor: "#0370b1",
      customClass: {
        confirmButton: "my-swal-btn",
      },
    });

    return { success: false, error: errorMessage };
  } finally {
    dispatch(setLoading(false));
  }
};

// ✅ Thunk for login (kept for backward compatibility, but can use RTK Query directly)
export const login = (credentials) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const result = await dispatch(
      rtkApi.endpoints.login.initiate({ data: credentials })
    ).unwrap();

    if (result?.data) {
      const token = result.data.token;
      const user = result.data.user;

      dispatch(setUser({ ...user, token }));
      return { success: true, user };
    }
    return { success: false, error: "Login failed" };
  } catch (error) {
    const errorMessage = error?.data?.error || error?.data?.message || error?.message || "Login failed";
    console.log(error, 'data in error');
    dispatch(setError(errorMessage));
    return { success: false, error: errorMessage };
  } finally {
    dispatch(setLoading(false));
  }
};

// ✅ Thunk for logout (no localStorage)
export const logout = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    await new Promise((resolve) => setTimeout(resolve, 500));

    dispatch(clearUser());

    return { success: true };
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message || "Logout failed"));
    return { success: false, error: error.message };
  } finally {
    dispatch(setLoading(false));
  }
};

// Thunk for getting user by ID
export const getUserById = (userId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockUserDetails = {
      id: userId,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      address: "123 Main St, Anytown, USA",
      profilePicture: "https://example.com/profile.jpg",
    };

    dispatch(setUserDetails(mockUserDetails));

    return { success: true, userDetails: mockUserDetails };
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message || "Failed to fetch user data"));
    return { success: false, error: error.message };
  }
};

// Thunk for updating user profile
export const updateUser = (userData) => async (dispatch, getState) => {
  const formData = new FormData();

  // Append all user data fields to FormData
  Object.keys(userData).forEach(key => {
    if (key === 'profileImage' && userData[key]) {
      formData.append('profileImage', userData[key]);
    } else if (userData[key] !== undefined && userData[key] !== null) {
      formData.append(key, userData[key]);
    }
  });

  try {
    dispatch(setLoading(true));

    const result = await dispatch(
      rtkApi.endpoints.editUser.initiate({ data: formData })
    ).unwrap();

    if (result?.data) {
      // Update both user and userDetails in the state
      dispatch(setUser({ ...result.data, token: getState().auth?.user?.token }));
      dispatch(setUserDetails(result.data));

      Swal.fire({
        title: "Success",
        text: "Profile updated successfully",
        icon: "success",
        confirmButtonColor: "#0370b1",
        customClass: {
          confirmButton: "my-swal-btn",
        },
      });

      return { success: true, user: result.data };
    }
    return { success: false, error: "Update failed" };
  } catch (error) {
    const errorMessage = error?.data?.message || error?.message || "Failed to update profile";
    Swal.fire({
      title: "Update Failed",
      text: errorMessage,
      icon: "error",
      confirmButtonColor: "#0370b1",
      customClass: {
        confirmButton: "my-swal-btn",
      },
    });
    dispatch(setError(errorMessage));
    return { success: false, error: errorMessage };
  } finally {
    dispatch(setLoading(false));
  }
};

export default authSlice.reducer;
