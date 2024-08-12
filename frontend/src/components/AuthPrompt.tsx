import Link from "next/link";
import { Button } from "./ui/button";
export default function AuthPrompt() {
    return (
        <div className="bg-transparent p-6 ">
          <h2 className="text-2xl font-bold mb-4 text-lime-600">Welcome to Our App!</h2>
          <p className="mb-4 text-base text-white">
            Join our community to access amazing features and connect with others.
            Our app helps you [insert compelling reasons to use your app].
          </p>
          <div className="space-x-4">
            <Link href="/signup"><Button className="bg-lime-500 text-white px-4 py-2 rounded hover:bg-limme-600">
              Sign Up
            </Button></Link>
            <p className="mb-4 text-base text-white">or login if you already have an account</p>
            <Link href="/login"><Button className="bg-lime-500 text-white px-4 py-2 rounded hover:bg-limme-600">
              Login
            </Button></Link>
          </div>
        </div>
      );
}