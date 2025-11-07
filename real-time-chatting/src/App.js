import React, { useState } from 'react';
import ChatRoom from './chat.js';

function App() {
  const [username, setUsername] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const roomId = 'room123';

  const handleJoinChat = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setIsJoined(true);
    }
  };

  if (!isJoined) {
    return (
      <div style={styles.loginContainer}>
        <div style={styles.loginBox}>
          <h2 style={styles.title}>Join Chat</h2>
          <form onSubmit={handleJoinChat}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name..."
              style={styles.input}
              autoFocus
            />
            <button type="submit" style={styles.button}>
              Join
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <ChatRoom roomId={roomId} username={username} />;
}

const styles = {
  loginContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: '#f0f2f5',
  },
  loginBox: {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 0 15px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    textAlign: 'center',
    color: '#007bff',
    marginBottom: '1.5rem',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  button: {
    width: '100%',
    padding: '10px',
    background: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
};

export default App;
