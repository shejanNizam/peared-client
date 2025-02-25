"use client";

import { useEffect } from "react";

import { useAllNotificationsQuery } from "@/redux/features/notifications/notificationsApi";
import { initSocket } from "./socket";
import { useNotificationPermission } from "./useNotificationPermission";

export default function NotificationListener() {
  useNotificationPermission();

  const { data, isLoading, error } = useAllNotificationsQuery();

  useEffect(() => {
    const socket = initSocket();

    const handleSocketNotification = (data) => {
      if (
        document.visibilityState !== "visible" &&
        Notification.permission === "granted"
      ) {
        new Notification(data.title, {
          body: data.message,
          icon: "../../assets/user_img_default.png",
        });
      }
    };

    socket.on("receiveNotification", handleSocketNotification);

    return () => {
      socket.off("receiveNotification", handleSocketNotification);
    };
  }, []);

  useEffect(() => {
    if (data && data.data && data.data.notifications) {
      data.data.notifications.forEach((notif) => {
        if (
          document.visibilityState !== "visible" &&
          Notification.permission === "granted"
        ) {
          new Notification(notif.message, {
            body: notif.message,
            icon: "../../assets/user_img_default.png",
          });
        }
      });
    }
  }, [data]);

  if (isLoading) return <div>Loading notifications...</div>;
  if (error) return <div>Error fetching notifications</div>;

  return null;
}
