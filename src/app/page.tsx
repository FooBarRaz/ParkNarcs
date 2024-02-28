import { Amplify } from "aws-amplify";
import awsmobile from "../aws-exports";
import Link from "next/link";

Amplify.configure(awsmobile, { ssr: true });
console.log("aws configured");

export default function Home() {
  const title = 'Nice Parking, Asshole!';
  const main = 'Where\'d you learn to park?';
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      </div>
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <Link href="/posts">View Posts</Link>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <Link href="/posts/create">Create a Post</Link>
      </div>
    </main>
  );
}
