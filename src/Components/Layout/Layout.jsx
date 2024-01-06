import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import AuthContextProvider from "../../Contexts/AuthContext";
import { Offline } from "react-detect-offline";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import CartContextProvider from "../../Contexts/CartContextProvider";
import WishListContextProvider from "../../Contexts/WishListContextProvider";
import ForgetPasswordProvider from "../../Contexts/ForgetPasswordProvider/ForgetPasswordProvider";
import ScrollToTop from "react-scroll-to-top";
import { Helmet } from "react-helmet";
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
            <div className="container pt-5 my-5 ">
              <Outlet />
              <ScrollToTop className="bg-main"/>
            </div>
            <Footer />
            <div>
              <Offline>
                <div className="offline-toast">You are Offline</div>
              </Offline>
            </div>
            <Toaster />
             </ForgetPasswordProvider>
            </WishListContextProvider>
          </CartContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}
