// import { redirect } from "react-router-dom";

export default function authToken() {
  const token = localStorage.getItem("userToken") || null;
  return token
}

// export function tokenLoder() {
//   return authToken();
// }
// export function checkTokenLoader() {
//   const token = authToken();

//   if (!token) {
//     return redirect("/auth");
//   }
// }
