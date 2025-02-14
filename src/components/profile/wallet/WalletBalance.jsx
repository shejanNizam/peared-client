import Image from "next/image";
import wallet_img from "../../../assets/payment/wallet_img.png";

export default function WalletBalance({ balance }) {
  return (
    <div className="flex flex-col items-center justify-center  p-8 rounded-xl  w-full sm:w-80 md:w-96 lg:w-[400px] mx-auto">
      <div className="relative w-full flex justify-center">
        <Image
          src={wallet_img}
          alt="wallet"
          className="w-full object-contain"
        />
        <div className="absolute top-12 left-8 text-center">
          <p className="text-green-700 text-sm font-medium">
            Available balance
          </p>
          <h2 className="text-3xl font-bold text-gray-800">
            ${" "}
            {balance?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h2>
        </div>
      </div>
    </div>
  );
}
