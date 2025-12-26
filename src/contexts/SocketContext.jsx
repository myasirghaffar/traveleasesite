import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import socketService from '../services/socketService';

const SocketContext = createContext(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [socketId, setSocketId] = useState(null);
  const user = useSelector((state) => state.auth?.user);

  // Connect socket when user is logged in
  useEffect(() => {
    if (user?.token) {
      socketService.connect(user.token);

      // Listen for connection status changes
      const handleConnect = () => {
        setIsConnected(true);
        const status = socketService.getConnectionStatus();
        setSocketId(status.socketId);
      };

      const handleDisconnect = () => {
        setIsConnected(false);
        setSocketId(null);
      };

      const handleConnected = (data) => {
        setIsConnected(true);
        setSocketId(socketService.socket?.id || null);
      };

      socketService.on('connect', handleConnect);
      socketService.on('disconnect', handleDisconnect);
      socketService.on('connected', handleConnected);

      // Check initial connection status
      const status = socketService.getConnectionStatus();
      setIsConnected(status.isConnected);
      setSocketId(status.socketId);

      return () => {
        socketService.off('connect', handleConnect);
        socketService.off('disconnect', handleDisconnect);
        socketService.off('connected', handleConnected);
      };
    } else {
      // Disconnect if user logs out
      socketService.disconnect();
      setIsConnected(false);
      setSocketId(null);
    }
  }, [user?.token]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      socketService.disconnect();
    };
  }, []);

  const sendTyping = useCallback((receiverId, isTyping) => {
    socketService.sendTyping(receiverId, isTyping);
  }, []);

  const emit = useCallback((event, data) => {
    socketService.emit(event, data);
  }, []);

  const on = useCallback((event, callback) => {
    socketService.on(event, callback);
    // Return cleanup function
    return () => socketService.off(event, callback);
  }, []);

  const off = useCallback((event, callback) => {
    socketService.off(event, callback);
  }, []);

  const value = {
    isConnected,
    socketId,
    sendTyping,
    emit,
    on,
    off,
    socket: socketService.socket,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;

