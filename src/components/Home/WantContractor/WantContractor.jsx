import WANT_CONTRACTOR_IMG from "@/assets/home/WantContractor/want_contractor_img.png";
import Image from "next/image";
import Link from "next/link";
import { FaArrowTrendUp } from "react-icons/fa6";

export default function WantContractor() {
  return (
    <>
      <div
        className="container w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-0 justify-center
       items-center py-4"
      >
        <div className=" md:space-y-12 lg:pl-4">
          <h3 className="text-2xl md:text-4xl lg:text-5xl text-primary font-bold">
            {" "}
            Want to be a contractor?{" "}
          </h3>
          <p className="text-black">
            Peared allows you to easily find work in your field and only accept
            jobs that you want, for a mutually agreed upon price. 
            <br />
            <br />
            Bid on projects in any pricing format, whether it be a flat rate, by
            the hour, or by the task, it is up to you.
            <Link href="/about-us" className="text-primary font-bold">
               See More....
            </Link>
          </p>
          <div>
            <Link href={`/join-contractor`}>
              <button className="text-lg text-white font-semibold px-4 py-2 rounded-lg bg-primary flex justify-center items-center gap-2">
                Join as a Contractor
                <FaArrowTrendUp />
              </button>
            </Link>
          </div>
        </div>
        <div className="lg:pl-40">
          <Image src={WANT_CONTRACTOR_IMG} alt="WANT_CONTRACTOR_IMG" />
        </div>
      </div>
    </>
  );
}
