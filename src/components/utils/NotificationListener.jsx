"use client";

import { useAllNotificationsQuery } from "@/redux/features/notifications/notificationsApi";
import { increaseNotification } from "@/redux/slices/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initSocket } from "./socket";
import { useNotificationPermission } from "./useNotificationPermission";

export default function NotificationListener() {
  useNotificationPermission();
  // const notification=useSelector(state=>state.auth)
  const dispatch = useDispatch();

  const { data, isLoading, error } = useAllNotificationsQuery();

  useEffect(() => {
    const socket = initSocket();
    const handleSocketNotification = (data) => {
      dispatch(increaseNotification());
      console.log("Loaaaaaaaaaaaaaaaa", Notification.permission, data);
      if (Notification.permission === "granted") {
        new Notification(data.title, {
          body: data.message,
          icon: `${process.env.NEXT_PUBLIC_IMAGE_URL}/${data?.image}`,
        });
      }
    };

    socket.on("receiveNotification", handleSocketNotification);

    return () => {
      socket.off("receiveNotification", handleSocketNotification);
      //   socket.disconnect();
    };
  }, [dispatch]);

  //   useEffect(() => {
  //     if (data && data.data && data.data.notifications) {
  //       data.data.notifications.forEach((notif) => {
  //         if (
  //           document.visibilityState !== "visible" &&
  //           Notification.permission === "granted"
  //         ) {
  //           console.log(notif);
  //           new Notification(notif.message, {
  //             body: notif.message,
  //             icon: `http://localhost:3000/_next/static/media/main_logo.0d791ce5.svg`,
  //           });
  //         }
  //       });
  //     }
  //   }, [data]);

  if (isLoading) return <div>Loading notifications...</div>;
  if (error) return <div>Error fetching notifications</div>;

  return null;
}
