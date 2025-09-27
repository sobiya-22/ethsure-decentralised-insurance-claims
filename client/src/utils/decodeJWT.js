import {jwtDecode} from "jwt-decode";

export const getRoleFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token); // full token object
      console.log("Decoded token:", decoded);
      console.log('Decoded role: ', decoded?.sub.role);
    return decoded.sub?.role || null; // access role inside sub
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};

export function isLoggedIn() {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    // optional: check expiry
    if (decoded.exp && Date.now() >= decoded.exp * 1000) return false;
    return true;
  } catch {
    return false;
  }
}
