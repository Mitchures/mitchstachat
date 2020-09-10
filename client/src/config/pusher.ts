import Pusher, { Channel } from 'pusher-js';

const pusher: Pusher = new Pusher('e91275f65615dab0a5e9', {
  cluster: 'us2',
});

export { Channel };
export default pusher;