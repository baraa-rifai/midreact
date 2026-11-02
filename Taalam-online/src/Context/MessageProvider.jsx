import { useState } from "react";
import toast from "react-hot-toast";
import { MessageContext } from "./MessageContext";

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState(
    JSON.parse(localStorage.getItem("messages")) || []
  );

  const [announcements, setAnnouncements] = useState(
    JSON.parse(localStorage.getItem("announcements")) || [
      {
        id: 1,
        title: "Welcome to React.js Course!",
        content: "We will start our first live session this Thursday at 5 PM.",
        instructorName: "Baraa Al-Rifai",
        instructorEmail: "baraa@taalam.com",
        date: "2026-11-02",
      },
    ]
  );

  const sendMessage = async (messageData) => {
    try {
      if (!messageData.subject || !messageData.content) {
        toast.error("Please fill all fields!");
        return;
      }

      const newMessage = {
        id: Date.now(),
        senderEmail: messageData.senderEmail || "student@taalam.com",
        senderName: messageData.senderName || "Student",
        senderRole: messageData.senderRole || "student",
        receiverRole: messageData.receiverRole || "instructor",
        receiverEmail: messageData.receiverEmail || "",
        receiverName: messageData.receiverName || "Instructor",
        subject: messageData.subject,
        content: messageData.content,
        reply: "",
        date: new Date().toISOString().split("T")[0],
      };

      const updatedMessages = [newMessage, ...messages];
      setMessages(updatedMessages);
      localStorage.setItem("messages", JSON.stringify(updatedMessages));
      toast.success("Message sent successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to send message");
    }
  };

  const replyToMessage = async (messageId, replyContent) => {
    try {
      if (!replyContent) {
        toast.error("Reply content cannot be empty!");
        return;
      }

      const updatedMessages = messages.map((msg) =>
        msg.id === messageId ? { ...msg, reply: replyContent } : msg
      );

      setMessages(updatedMessages);
      localStorage.setItem("messages", JSON.stringify(updatedMessages));
      toast.success("Reply saved successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to save reply");
    }
  };

  const deleteMessage = (messageId) => {
    const updatedMessages = messages.filter((msg) => msg.id !== messageId);
    setMessages(updatedMessages);
    localStorage.setItem("messages", JSON.stringify(updatedMessages));
    toast.success("Message deleted successfully!");
  };

  const addAnnouncement = (announcementData) => {
    const newAnn = {
      id: Date.now(),
      title: announcementData.title,
      content: announcementData.content,
      instructorName: announcementData.instructorName,
      instructorEmail: announcementData.instructorEmail,
      date: new Date().toISOString().split("T")[0],
    };

    const updatedAnn = [newAnn, ...announcements];
    setAnnouncements(updatedAnn);
    localStorage.setItem("announcements", JSON.stringify(updatedAnn));
    toast.success("Announcement published successfully!");
  };

  const deleteAnnouncement = (id) => {
    const updatedAnn = announcements.filter((a) => a.id !== id);
    setAnnouncements(updatedAnn);
    localStorage.setItem("announcements", JSON.stringify(updatedAnn));
    toast.success("Announcement deleted!");
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        sendMessage,
        replyToMessage,
        deleteMessage,
        announcements,
        addAnnouncement,
        deleteAnnouncement,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};