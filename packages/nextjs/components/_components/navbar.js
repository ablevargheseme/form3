
import Link from "next/link";
import Connect from "./connect";


export default function NavBar() {

    return (
        <div>
            <div className="bg-[#2c2438] flex justify-between">
                <div className="font-semibold text-lg m-4 md:ml-16 ml-5">Dashboard</div>
                <div className="mx-5"><Connect /></div>
            </div>

            <div className="bg-[#1d1029] drop-shadow-2xl h-fit">
                <div className="md:py-12 py-6">
                    <div className="md:pl-16 pl-9 hidden md:flex flex-col">
                        <div className="font-bold md:text-3xl text-xl">Welcome back!</div>
                        <div className="font-semibold md:text-lg text-sm">Nice to see you, USER</div>
                    </div>
                    <div className="main-head md:text-4xl text-3xl font-bold flex justify-center md:-mt-14">My Applets</div>
                </div>

            </div>
        </div>



    )
}
