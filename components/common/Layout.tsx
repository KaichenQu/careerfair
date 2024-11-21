import React from "react";
import Navbar from "./Navbar";
import BackToTop from "./BackToTop";
import ChatBox from "./ChatBox";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="w-full">{children}</main>
      <BackToTop />
      <ChatBox />
    </div>
  );
};

export default Layout;
