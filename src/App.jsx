import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./contexts/AuthContext";
import { BotDataProvider } from "./contexts/BotDataContext";
import { DataTableProvider } from "./contexts/DataTableContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import PanelLayout from "./pages/PanelLayout";
import ProtectedRoute from "./pages/ProtectedRoute";
import Login from "./pages/Login";
import FunctionalitySegment from "./ui/FunctionalitySegment";
import RecordDetails from "./ui/tableUI/details/RecordDetails";
import DataTable from "./ui/tableUI/DataTable";
import PaginationPanel from "./ui/tableUI/pagination/PaginationPanel";
import Error from "./ui/Error";

const queryClient = new QueryClient();

function RedirectToPrimebot() {
  useEffect(() => {
    window.location.href = "https://www.primebot.pl";
  }, []);

  return null;
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RedirectToPrimebot />,
      errorElement: <Error />,
    },
    {
      path: "/:section/login",
      element: <Login />,
    },
    {
      path: "/:section/:botName",
      element: (
        <ProtectedRoute>
          <PanelLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "",
          element: (
            <>
              <FunctionalitySegment />
              <DataTable />
              <PaginationPanel />
            </>
          ),
        },
        {
          path: ":conversationId",
          element: <RecordDetails />,
        },
      ],
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <BotDataProvider>
            <DataTableProvider>
              <RouterProvider router={router} />
            </DataTableProvider>
          </BotDataProvider>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
