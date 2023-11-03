import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import AuthContextProvider from "../../Contexts/AuthContext";
import { Offline } from "react-detect-offline";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import CartContextProvider from "../../Contexts/CartContextProvider";
import WishListContextProvider from "../../Contexts/WishListContextProvider";
import ForgetPasswordProvider from "../../Contexts/ForgetPasswordProvider/ForgetPasswordProvider";

export default function Layout() {
  let queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <CartContextProvider>
            <WishListContextProvider>
              <ForgetPasswordProvider>
            <Navbar />
            <div className="container pt-5 mt-5">
              <Outlet />
            </div>
            <Footer />
            <div>
              <Offline>
                <div className="offline-toast">You are Offline(surprise)</div>
              </Offline>
            </div>
            <Toaster />
             </ForgetPasswordProvider>
            </WishListContextProvider>
          </CartContextProvider>
        </AuthContextProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}
