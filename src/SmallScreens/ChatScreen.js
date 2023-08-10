import { View, Text } from 'react-native';
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { GiftedChat } from 'react-native-gifted-chat';

const ChatScreen = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const organization= "org-z7zYvpZQH3uks3HwM90rnUXw";
  const apiKey = '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';

  const rateLimitRef = useRef({
    lastTimestamp: 0,
    remainingTokens: 200, // The initial number of tokens (requests) allowed per minute
  });

  const handleSend = async (newMessages = []) => {
    try {
      setChatMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
  
      const userMessage = newMessages[0];
      const messageText = userMessage.text.toLowerCase();
      const keywords = [
        'car',
        'mechanic',
        'fault',
        'issue',
        'not starting',
        'tire',
        'electric',
        'plug',
        'paint',
        'engine',
        'oil',
      ];
  
      if (!keywords.some(keyword => messageText.includes(keyword))) {
        const botMessage = {
          _id: new Date().getTime() + 1,
          text: 'I am your Mechanic Bot, ask me anything related to cars and car faults',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Stepney Mechanic Bot',
          },
        };
  
        setChatMessages(previousMessages => GiftedChat.append(previousMessages, [botMessage]));
      } else {
        const now = Date.now();
        if (rateLimitRef.current.remainingTokens > 0) {
          // There are remaining tokens, make the API call
          rateLimitRef.current.remainingTokens -= 1;
  
          const response = await axios.post(
            'https://api.openai.com/v1/engines/text-davinci-003/completions',
            {
              prompt: `Get me a solution for ${messageText}`,
              max_tokens: 1200,
              temperature: 0.5,
              n: 1,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
              },
            }
          );
    
          const solution = response.data.choices[0].text.trim();
          const botMessage = {
            _id: new Date().getTime() + 1,
            text: solution,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'Stepney Mechanic Bot',
            },
          };
    
          setChatMessages(previousMessages => GiftedChat.append(previousMessages, [botMessage]));
        } else {
          // No remaining tokens, wait until the next minute to reset the token bucket
          const nextMinuteTimestamp = Math.ceil(now / 60000) * 60000; // Round to the next minute
          const delay = nextMinuteTimestamp - now;
          setTimeout(() => {
            rateLimitRef.current.remainingTokens = 200; // Reset the token bucket
          }, delay);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{
        backgroundColor: 'black',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        marginBottom: 5,
      }}>
        <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'white' }}>ChatBot</Text>
      </View>

      <GiftedChat
        messages={chatMessages}
        onSend={newMessages => handleSend(newMessages)}
        user={{ _id: 1, name: 'Your User Name' }}
      />
    </View>
  );
};

export default ChatScreen;
