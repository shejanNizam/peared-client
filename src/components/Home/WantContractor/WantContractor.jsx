import WANT_CONTRACTOR_IMG from "@/assets/home/WantContractor/want_contractor_img.png";
import CustomButton from "@/components/utils/CustomButton";
import Image from "next/image";
import Link from "next/link";

export default function WantContractor() {
  return (
    <>
      <div
        className="container w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-0 justify-center
       items-center py-4"
      >
        <div className=" space-y-12 lg:pl-4">
          <h3 className="text-3xl md:text-4xl lg:text-5xl text-primary font-bold">
            {" "}
            Want to be a Peared contractor?{" "}
          </h3>
          <p>
            Peared allows you to easily find work in your field and only accept
            jobs that you want, for a mutually agreed upon price. 
            <br />
            <br />
            Bid on projects in any pricing format, whether it be a flat rate, by
            the hour, or by the task, it is up to you.
            <Link href="/" className="text-primary">
               See More....
            </Link>
          </p>
          <div>
            <Link href={`/join-contractor`}>
              <CustomButton>Join as a Contactor</CustomButton>
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
