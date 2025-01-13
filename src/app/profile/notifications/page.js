import { IoIosArrowBack } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";

// Example data (ensure ids are unique)
const data = [
  {
    id: 1,
    text: "A beautician requested a money withdrawal",
    timestamp: "Fri, 12:00 pm",
  },
  {
    id: 2,
    text: "A salon owner has registered now",
    timestamp: "Fri, 1:30 pm",
  },
  { id: 3, text: "A client paid for confirmation", timestamp: "Fri, 2:00 pm" },
  { id: 4, text: "A user joined the web", timestamp: "Fri, 3:15 pm" },
  { id: 5, text: "A user joined the website", timestamp: "Fri, 4:00 pm" },
  {
    id: 6,
    text: "A beautician's account was approved",
    timestamp: "Fri, 5:45 pm",
  },
  {
    id: 7,
    text: "A salon owner updated their profile",
    timestamp: "Fri, 6:30 pm",
  },
  { id: 8, text: "A client canceled a booking", timestamp: "Fri, 7:00 pm" },
  {
    id: 9,
    text: "A user requested to reset their password",
    timestamp: "Fri, 8:15 pm",
  },
  {
    id: 10,
    text: "A new service was added by a beautician",
    timestamp: "Fri, 9:00 pm",
  },
  {
    id: 11,
    text: "A new promotional offer was added",
    timestamp: "Fri, 9:45 pm",
  },
  {
    id: 12,
    text: "A client confirmed an appointment",
    timestamp: "Fri, 10:30 pm",
  },
  {
    id: 11,
    text: "A new promotional offer was added",
    timestamp: "Fri, 9:45 pm",
  },
  {
    id: 12,
    text: "A client confirmed an appointment",
    timestamp: "Fri, 10:30 pm",
  },
  {
    id: 11,
    text: "A new promotional offer was added",
    timestamp: "Fri, 9:45 pm",
  },
  {
    id: 12,
    text: "A client confirmed an appointment",
    timestamp: "Fri, 10:30 pm",
  },
  {
    id: 11,
    text: "A new promotional offer was added",
    timestamp: "Fri, 9:45 pm",
  },
  {
    id: 12,
    text: "A client confirmed an appointment",
    timestamp: "Fri, 10:30 pm",
  },
];

export default function Notifications() {
  return (
    <div className="bg-white h-auto">
      <div className="sticky top-20 flex justify-start items-center gap-2 bg-primary rounded-t-md h-[80px] text-white text-[32px] font-bold ">
        <IoIosArrowBack />
        <h2>All Notifications</h2>
      </div>

      <div className="ml-6">
        {data.length === 0 ? (
          <div className="text-center text-gray-500 mt-4">
            No notifications available
          </div>
        ) : (
          data.map((d) => (
            <div
              key={d.id}
              className="flex justify-start items-center gap-4 m-4"
            >
              <IoNotificationsOutline className="bg-[#E8EAEF] w-[40px] h-[40px] rounded-sm text-primary p-2" />
              <div>
                <p className="text-xl">{d.text}</p>
                <p className="text-[#989898]">{d.timestamp}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
