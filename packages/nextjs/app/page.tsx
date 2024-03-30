"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, ForwardIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import FeatureSection from "~~/components/_components/featuresectn";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">FORM3</span>
          </h1>
          <p className="text-center text-lg">
            Unlock real-time updates: Receive notifications to your socials directly from your wallet address.
          </p>
          <div className="flex justify-center items-center space-x-2">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>

          <Link href="/newapplet" passHref className="">
            <div className="flex justify-center items-center gap-12 flex-col sm:flex-row mt-12">
              <div className="flex justify-center flex-col bg-base-100 px-4 py-2 text-center items-center max-w-xs rounded-3xl">
                <ForwardIcon className="h-6 w-6 fill-secondary" />
                <p>Launch FORM3</p>
              </div>
            </div>
          </Link>

          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row mt-12">
            <aside className="bg-black text-white p-6 mt-8 rounded-lg w-full max-w-lg font-mono">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2 text-red-500">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <p className="text-sm">bash</p>
              </div>
              <div className="mt-4">
                <p className="text-green-400">$ npm install next</p>
                <p className="text-white">+ next@10.2.3</p>
                <p className="text-white">added 1 package, and audited 2 packages in 3s</p>
                <p className="text-green-400">$</p>
              </div>
            </aside>
          </div>

          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row mt-12">
            <p className="block text-4xl font-bold">Get Started!</p>
          </div>
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row mt-12">
            <FeatureSection imageUrl="https://dummyimage.com/460x500" />
          </div>
          {/* <p className="text-center text-lg">
            Get started by editing{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/nextjs/app/page.tsx
            </code>
          </p> */}
          {/* <p className="text-center text-lg">
            Edit your smart contract{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              YourContract.sol
            </code>{" "}
            in{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/hardhat/contracts
            </code>
          </p> */}
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                Tinker with your smart contract using the{" "}
                <Link href="/debug" passHref className="link">
                  Debug Contracts
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>
                Explore your local transactions with the{" "}
                <Link href="/blockexplorer" passHref className="link">
                  Block Explorer
                </Link>{" "}
                tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
