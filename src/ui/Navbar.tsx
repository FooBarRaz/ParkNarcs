import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav>
      <header className="p-4 dark:dark:bg-gray-800 dark:dark:text-gray-100">
        <div className="container flex justify-between h-16 mx-auto">
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/">My Logo</Link>
          </div>
          <div className="flex items-center">
            {/* Links */}
            <div className="flex space-x-4">
              <Link href="/posts">View</Link>
              <Link href="/posts/create">Post</Link>
              <Link href="/contact">Contact</Link>
            </div>
            {/* User Avatar */}
            <img
              src="/avatar.png"
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>
      </header>
    </nav>
  );
};

export default Navbar;
