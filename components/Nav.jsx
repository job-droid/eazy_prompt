"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const isUserLogin = true;
  const [provider, setProviders] = useState(null);
  const [toggleDropDown, settoggleDropDown] = useState(false);

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setProviders();
  });
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Eazy Prompt</p>
      </Link>

      {/* Desktop navigation */}
      <div className="sm:flex hidden">
        {isUserLogin ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src="/assets/images/logo.svg"
                width="37"
                height="37"
                alt="profile"
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {provider &&
              Object.values(provider).map((provider) => (
                <button
                  type="button"
                  key={provider}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile navigation */}
      <div className="sm:hidden flex relative">
        {isUserLogin ? (
          <div className="flex">
            <Image
              src="/assets/images/logo.svg"
              width="37"
              height="37"
              alt="profile"
              className="rounded-full"
              onClick={() => {
                settoggleDropDown((prev) => !prev);
              }}
            />
            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href="profile"
                  className="dropdown_link"
                  onClick={() => settoggleDropDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="create-prompt"
                  className="dropdown_link"
                  onClick={() => settoggleDropDown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    settoggleDropDown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >Sign Out</button>
              </div>
            )}
          </div>
        ) : (
          <>
            {provider &&
              Object.values(provider).map((provider) => (
                <button
                  type="button"
                  key={provider}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
