import io from 'socket.io-client';
const socket = io.connect(`http://${process.env.REACT_APP_SERVERURL}`);
export default socket;