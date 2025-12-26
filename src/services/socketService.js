import { io } from 'socket.io-client';
import { BASE_URL } from './ApiEndpoints';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.listeners = new Map();
  }

  /**
   * Initialize socket connection
   * @param {string} token - JWT token for authentication
   */
  connect(token) {
    if (this.socket?.connected) {
      console.log('Socket already connected');
      return;
    }

    // Extract base URL without /api
    // If BASE_URL is like "http://localhost:3000/api", remove "/api"
    // If BASE_URL is like "http://localhost:3000", use as is
    let socketUrl = BASE_URL;
    if (socketUrl.endsWith('/api')) {
      socketUrl = socketUrl.replace('/api', '');
    }
    // Fallback to localhost if BASE_URL is not set
    if (!socketUrl || socketUrl === '') {
      socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';
    }

    this.socket = io(socketUrl, {
      auth: {
        token: token
      },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
      reconnectionDelayMax: 5000,
    });

    this.setupEventHandlers();
  }

  /**
   * Setup socket event handlers
   */
  setupEventHandlers() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket.id);
      this.isConnected = true;
      this.emitToListeners('connect', { connected: true });
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
      this.isConnected = false;
      this.emitToListeners('disconnect', { reason });
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      this.isConnected = false;
      this.emitToListeners('connect_error', { error });
    });

    this.socket.on('connected', (data) => {
      console.log('Socket server confirmed connection:', data);
      this.emitToListeners('connected', data);
    });

    this.socket.on('user_typing', (data) => {
      console.log('User typing:', data);
      this.emitToListeners('user_typing', data);
    });
  }

  /**
   * Emit event to all registered listeners
   */
  emitToListeners(event, data) {
    const listeners = this.listeners.get(event) || [];
    listeners.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error in listener for ${event}:`, error);
      }
    });
  }

  /**
   * Register event listener
   * @param {string} event - Event name
   * @param {Function} callback - Callback function
   */
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);

    // Also register with socket if connected
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  /**
   * Remove event listener
   * @param {string} event - Event name
   * @param {Function} callback - Callback function to remove
   */
  off(event, callback) {
    const listeners = this.listeners.get(event) || [];
    const index = listeners.indexOf(callback);
    if (index > -1) {
      listeners.splice(index, 1);
    }

    // Also remove from socket if connected
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  /**
   * Emit event to server
   * @param {string} event - Event name
   * @param {any} data - Data to send
   */
  emit(event, data) {
    if (!this.socket || !this.isConnected) {
      console.warn('Socket not connected. Cannot emit:', event);
      return;
    }
    this.socket.emit(event, data);
  }

  /**
   * Send typing indicator
   * @param {number} receiverId - Receiver user ID
   * @param {boolean} isTyping - Typing status
   */
  sendTyping(receiverId, isTyping) {
    this.emit('typing', {
      receiver_id: receiverId,
      isTyping: isTyping
    });
  }

  /**
   * Disconnect socket
   */
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      this.listeners.clear();
    }
  }

  /**
   * Get connection status
   */
  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      socketId: this.socket?.id || null
    };
  }
}

// Export singleton instance
export const socketService = new SocketService();
export default socketService;

