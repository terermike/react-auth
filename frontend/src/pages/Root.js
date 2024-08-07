import { Outlet, useLoaderData, useSubmit } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";
import { useEffect } from "react";
import { getTokenDuration } from "../util/auth";

function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    console.log("useEffect triggered"); // Debug statement
    console.log("Token:", token); // Debug statement

    if (!token) {
      console.log("No token found"); // Debug statement
      return;
    }

    if (token === "EXPIRED") {
      console.log("Token expired, submitting logout"); // Debug statement
      submit(null, { action: "/logout", method: "post" });
      return;
    }

    const tokenDuration = getTokenDuration();
    console.log("Token duration:", tokenDuration); // Debug statement

    const timer = setTimeout(() => {
      console.log("Token expired due to timeout, submitting logout"); // Debug statement
      submit(null, { action: "/logout", method: "post" });
    }, tokenDuration);

    return () => {
      clearTimeout(timer); // Cleanup timeout on component unmount
      console.log("Cleanup timeout"); // Debug statement
    };
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
