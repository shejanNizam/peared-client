"use client";

import { useAllNotificationsQuery } from "@/redux/features/notifications/notificationsApi";
import { useEffect } from "react";
import { initSocket } from "./socket";
import { useNotificationPermission } from "./useNotificationPermission";

export default function NotificationListener() {
  useNotificationPermission();

  const { data, isLoading, error } = useAllNotificationsQuery();

  useEffect(() => {
    const socket = initSocket();
    const handleSocketNotification = (data) => {
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
  }, []);

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
