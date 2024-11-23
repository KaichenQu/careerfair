import React from "react";
import Navbar from "./Navbar";
import BackToTop from "./BackToTop";
import ChatBox from "./ChatBox";
import Announcement from "./Announcement";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="w-full">{children}</main>
      <Announcement />
      <BackToTop />
      <ChatBox />
    </div>
  );
};

export default Layout;
