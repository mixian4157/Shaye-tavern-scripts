<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> ee3c768ab5d12412115084851bc224c3e0d8a5e5
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> ee3c768ab5d12412115084851bc224c3e0d8a5e5
  createApp(App).use(createPinia()).mount('#app');
});
