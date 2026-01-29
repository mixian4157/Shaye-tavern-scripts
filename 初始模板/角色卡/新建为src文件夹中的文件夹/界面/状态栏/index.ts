<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> fb4dbf4e8a1e0af3bd2894822bd954bdc07f65d5
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> fb4dbf4e8a1e0af3bd2894822bd954bdc07f65d5
  createApp(App).use(createPinia()).mount('#app');
});
