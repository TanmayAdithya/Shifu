// "use server";

// import { google } from "@/lib/oauth";
// import { generateCodeVerifier, generateState } from "arctic";
// import { cookies } from "next/headers";

// export const createGoogleAuthorizationURL = async () => {
//   try {
//     const state = generateState();
//     const codeVerifier = generateCodeVerifier();

//     cookies().set("codeVerifier", codeVerifier, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//     });

//     cookies().set("state", state, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//     });

//     const authorizationURL = await google.createAuthorizationURL(
//       state,
//       "user:email",
//     );

//     // const tokens = await google.validateAuthorizationCode(code);

//     return {
//       success: true,
//       data: authorizationURL,
//     };
//   } catch (error: any) {
//     return {
//       error: error.message,
//     };
//   }
// };
