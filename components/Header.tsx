"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Form from "next/form";
import { TrolleyIcon, PackageIcon } from "@sanity/icons";
import { ClerkLoaded } from "@clerk/nextjs";
import { UserButton, SignInButton } from "@clerk/nextjs";

function Header() {
  const { user } = useUser();

  const createClerkPasskey = async () => {
    try {
      const response = await user?.createPasskey();
      console.log(response);
    } catch (err) {
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  };

  return (
    <header className="flex flex-wrap items-center justify-between gap-x-3 px-6 py-3 bg-white">
      <div>
        <Link
          href="/"
          className="text-[#f6573b] text-2xl font-bold hover:opacity-75"
        >
          Sherrrr!
        </Link>
      </div>

      <Form 
        action="/search"
        className="w-full order-1 mt-4 sm:order-none sm:mt-0 sm:flex-1 sm:max-w-3xl"
      >
        <input 
          type="text"
          name="query"
          placeholder="Search for products"
          className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-[#3B82F6]"
        />
      </Form>

      <div className="flex items-center space-x-4 flex-1 justify-end sm:flex-none">
        <Link
          href="/basket"
          className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-[#e39a35] hover:bg-[#2563EB] text-white font-bold py-2 px-4 rounded"
        >
          <TrolleyIcon className="w-6 h-6" />
          <span className="hidden sm:inline">My Basket</span>
          <span className="absolute -top-1 -right-1 bg-white text-[#3B82F6] text-xs font-bold px-2 py-0.5 rounded-full">
            0
          </span>
        </Link>

        <ClerkLoaded>
          {user && (
            <Link
              href="/orders"
              className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-[#c62828] hover:bg-[#cb913f] text-white font-bold py-2 px-4 rounded"
            >
              <PackageIcon className="w-6 h-6" />
              <span className="hidden sm:inline">My Orders</span>
            </Link>
          )}

          {user ? (
            <div className="flex items-center gap-x-2">
              <UserButton />
              <div className="hidden sm:block">
                <p className="text-xs text-gray-500">Welcome Back</p>
                <p className="text-sm font-medium">{user.fullName}</p>
              </div>
            </div>
          ) : (
            <SignInButton mode="modal" />
          )}

          {user?.passkeys.length === 0 && (
            <button
              onClick={createClerkPasskey}
              className="hidden sm:block rounded-md border border-[#3B82F6] px-4 py-2 text-sm font-medium text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white"
            >
              Create passkey 
            </button>
          )}
        </ClerkLoaded>
      </div>
    </header>
  );
}

export default Header;