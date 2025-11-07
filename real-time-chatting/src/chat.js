import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000'); 

function ChatRoom({ roomId, username }) {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    if (!roomId) return;
    socket.emit('join_room', roomId);

    socket.on('receive_message', (data) => {
      setChat((prev) => [...prev, data]);
    });

    socket.on('file_uploaded', (data) => {
      setChat((prev) => [...prev, {
        sender: data.sender,
        message: `Shared a file: ${data.fileName}`,
        fileUrl: data.fileUrl
      }]);
    });

    socket.on('upload_error', (error) => {
      alert('Error uploading file: ' + error.message);
    });

    return () => {
      socket.off('receive_message');
      socket.off('file_uploaded');
      socket.off('upload_error');
    };
  }, [roomId]);

  const sendMessage = () => {
    if (message.trim() === '') return;
    const data = { roomId, sender: username, message };
    socket.emit('send_message', data);
    setMessage('');
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.roomName}>💬 Room: {roomId}</h2>
        <span style={styles.username}>You are: {username}</span>
      </div>

      <div style={styles.chatBox}>
        {chat.length === 0 && (
          <p style={styles.placeholder}>No messages yet — start the chat!</p>
        )}
        {chat.map((msg, index) => (
          <div
            key={index}
            style={
              msg.sender === username
                ? { ...styles.message, ...styles.self }
                : { ...styles.message, ...styles.other }
            }
          >
            <strong>{msg.sender}: </strong>
            {msg.fileUrl ? (
              <div style={styles.imageContainer}>
                <img 
                  src={`http://localhost:4000${msg.fileUrl}`}
                  alt={msg.message}
                  style={styles.sharedImage}
                  onClick={() => window.open(`http://localhost:4000${msg.fileUrl}`, '_blank')}
                />
                <span style={styles.fileName}>{msg.message}</span>
              </div>
            ) : (
              <span>{msg.message}</span>
            )}
          </div>
        ))}
      </div>

      <div style={styles.inputContainer}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          style={styles.input}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              // Convert file to base64
              const reader = new FileReader();
              reader.onload = function() {
                const base64File = reader.result;
                socket.emit('upload_file', {
                  roomId,
                  sender: username,
                  file: {
                    data: base64File,
                    name: file.name,
                    type: file.type
                  }
                });
              };
              reader.readAsDataURL(file);
            }
          }}
          style={styles.fileInput}
          id="fileInput"
        />
        <label htmlFor="fileInput" style={styles.fileButton}>📎</label>
        <button onClick={sendMessage} style={styles.button}>Send</button>
      </div>
    </div>
  );
}

// 🧭 Inline Styles
const styles = {
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  sharedImage: {
    maxWidth: '200px',
    maxHeight: '200px',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '5px',
  },
  fileName: {
    fontSize: '0.8rem',
    color: '#666',
  },
  fileInput: {
    display: 'none',
  },
  fileButton: {
    background: '#e0e0e0',
    padding: '10px 15px',
    cursor: 'pointer',
    borderLeft: '1px solid #ddd',
    fontSize: '1.2rem',
  },
  container: {
    width: 400,
    margin: '50px auto',
    borderRadius: 12,
    boxShadow: '0 0 15px rgba(0,0,0,0.1)',
    background: '#fff',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    fontFamily: 'system-ui, sans-serif',
  },
  header: {
    background: '#007bff',
    color: 'white',
    padding: '10px 15px',
    borderBottom: '2px solid #0056b3',
  },
  roomName: {
    margin: 0,
    fontSize: '1.2rem',
  },
  username: {
    fontSize: '0.9rem',
    opacity: 0.9,
  },
  chatBox: {
    flex: 1,
    height: 300,
    padding: 15,
    overflowY: 'auto',
    background: '#f9f9f9',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  message: {
    padding: '8px 12px',
    borderRadius: 10,
    maxWidth: '80%',
    wordBreak: 'break-word',
  },
  self: {
    alignSelf: 'flex-end',
    background: '#dcf8c6',
  },
  other: {
    alignSelf: 'flex-start',
    background: '#ffffff',
    border: '1px solid #ddd',
  },
  placeholder: {
    color: '#999',
    textAlign: 'center',
    marginTop: 50,
  },
  inputContainer: {
    display: 'flex',
    borderTop: '1px solid #ddd',
  },
  input: {
    flex: 1,
    padding: 10,
    border: 'none',
    outline: 'none',
    fontSize: '1rem',
  },
  button: {
    background: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background 0.2s',
  },
};

export default ChatRoom;
