<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 2a6d5c0d5200986ce6636a49ac7890ffa01c801a
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 2a6d5c0d5200986ce6636a49ac7890ffa01c801a
  createApp(App).use(createPinia()).mount('#app');
});
