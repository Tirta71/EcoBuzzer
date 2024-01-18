import React, { useState } from "react";
import "./Chat.css"; // Import file CSS untuk styling

const Chat = () => {
  const initialChats = [
    {
      id: 1,
      sender: "User 1",
      receiver: "User 2",
      messages: ["Halo!", "Apa kabar?"],
    },
    {
      id: 2,
      sender: "User 2",
      receiver: "User 1",
      messages: ["Hai!", "Saya baik, terima kasih."],
    },
    // ... tambahkan chat lain sesuai kebutuhan
  ];

  const [chats, setChats] = useState(initialChats);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const handleChatSelect = (chatId) => {
    const selected = chats.find((chat) => chat.id === chatId);
    setSelectedChat(selected);
  };

  const handleSendMessage = () => {
    if (selectedChat && newMessage.trim() !== "") {
      const updatedChats = chats.map((chat) =>
        chat.id === selectedChat.id
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      );
      setChats(updatedChats);
      setNewMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-list">
        <h2>Daftar Chat</h2>
        <ul>
          {chats.map((chat) => (
            <li
              key={chat.id}
              className={selectedChat?.id === chat.id ? "active" : ""}
              onClick={() => handleChatSelect(chat.id)}
            >
              {chat.sender} - {chat.receiver}
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-content">
        {selectedChat ? (
          <>
            <div className="chat-info">
              <h2>
                {selectedChat.sender} - {selectedChat.receiver}
              </h2>
            </div>
            <div className="message-list">
              {selectedChat.messages.map((message, index) => (
                <div key={index} className="message">
                  {message}
                </div>
              ))}
            </div>
            <div className="message-input">
              <input
                type="text"
                placeholder="Ketik pesan..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button onClick={handleSendMessage}>Kirim</button>
            </div>
          </>
        ) : (
          <p>Pilih chat untuk memulai percakapan.</p>
        )}
      </div>
    </div>
  );
};

export default Chat;
