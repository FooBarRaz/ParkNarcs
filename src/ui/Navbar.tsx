import Link from "next/link";
import { FC } from "react";
import Avatar from "./Avatar";

export const Navbar: FC = () => {
  return (
    <nav className="fixed inset-x-0 flex justify-between bg-primary text-white">
      <div className="px-5 xl:px-12 py-6 flex w-full items-center">
        <a className="text-3xl font-bold font-heading" href="#">
          NPA
        </a>
        <ul className="hidden flex px-4 mx-auto font-semibold font-heading space-x-12 justify-end">
          <Link href="/">Home</Link>
          <Link href="/posts">Posts</Link>
          <Link href="/insults">Insults</Link>
          <Avatar initials="AI" />
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
