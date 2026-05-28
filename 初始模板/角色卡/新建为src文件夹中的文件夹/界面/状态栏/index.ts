<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 6dc4e35995d4d180a1cd4ff223ac9d21f083e2f5
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 6dc4e35995d4d180a1cd4ff223ac9d21f083e2f5
  createApp(App).use(createPinia()).mount('#app');
});
