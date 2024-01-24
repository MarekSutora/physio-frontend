// import { getSession } from "next-auth/react";

// const fetchClient = async (url: string, options) => {
//   const session = await getSession();

//   return fetch(url, {
//     ...options,
//     headers: {
//       ...options?.headers,
//       ...(session && { Authorization: `Bearer ${session.jwt}` }),
//     },
//   });
// };
