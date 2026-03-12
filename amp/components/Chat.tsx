import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export function Chat() {
  const [chatMessages, setChatMessages] = useState([
    { sender: 'AI', message: 'Welcome to AMAPA.COM! How can I assist you today?' },
  ]);
  const [currentMessage, setCurrentMessage] = useState('');

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      setChatMessages([...chatMessages, { sender: 'Player', message: currentMessage }]);
      setCurrentMessage('');
      // Simulate AI response
      setTimeout(() => {
        setChatMessages(prev => [...prev, { sender: 'AI', message: 'I understand. How else can I help you?' }]);
      }, 1000);
    }
  };

  return (
    <Card className="p-6 bg-black/80 border-green-500/50 shadow-lg shadow-green-500/20 backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-green-400 mb-4">Chat</h2>
      <div className="h-[50vh] overflow-y-auto mb-4 p-4 bg-black/60 border border-green-500/30 rounded-md">
        {chatMessages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.sender === 'You' ? 'text-right' : ''}`}>
            <span className="font-bold text-green-300">{msg.sender}: </span>
            <span className="text-green-400">{msg.message}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Type your message..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          className="flex-grow bg-black/60 border-green-500/30 text-green-400"
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button onClick={handleSendMessage} className="bg-green-500/20 text-green-400 hover:bg-green-500/40">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}