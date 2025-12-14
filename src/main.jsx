import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router/Router.jsx";
import AuthProvider from "./Contexts/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";

// AOS Import + Global Init
import AOS from "aos";
import "aos/dist/aos.css";

// Initialize AOS once when app starts
AOS.init({
  duration: 800,
  easing: "ease-out-quart",
  delay: 100,
  once: true,
  offset: 80,
  anchorPlacement: "top-bottom",
});

// Create TanStack Query client 2* min
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 2,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <>
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </StrictMode>
    <Analytics />
  </>
);
