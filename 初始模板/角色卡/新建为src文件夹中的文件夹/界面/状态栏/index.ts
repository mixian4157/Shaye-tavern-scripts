<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 1fccafa497a86147fb293397875ec0460136e4f6
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 1fccafa497a86147fb293397875ec0460136e4f6
  createApp(App).use(createPinia()).mount('#app');
});
