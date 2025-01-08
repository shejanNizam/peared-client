import BANNER_BG_IMAGE from "../../../assets/home/banner_bg_img.png";
import ServiceSearchBar from "./ServiceSearchBar";

export default function Banner() {
  return (
    <>
      <div
        className="h-auto lg:h-[520px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${BANNER_BG_IMAGE.src})`,
        }}
      >
        <div className="flex justify-start lg:items-center h-full p-4 lg:pl-64">
          <div className="w-full lg:w-[800px] border border-primary/30 bg-secondary/50 rounded-lg p-4 lg:p-6">
            <h1 className="text-2xl lg:text-4xl font-semibold text-primary mb-4 text-center ">
              Search for pros in your area
            </h1>
            <p className="lg:text-lg mb-6 text-center">
              Here you can instantly find Service Providers in your area.
            </p>
            {/* Search Bar */}
            <ServiceSearchBar />
          </div>
        </div>
      </div>
    </>
  );
}
