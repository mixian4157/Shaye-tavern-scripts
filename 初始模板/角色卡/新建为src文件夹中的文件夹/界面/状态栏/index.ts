<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> f1453c36c93c0f091171be522b45a09fe280a2bc
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> f1453c36c93c0f091171be522b45a09fe280a2bc
  createApp(App).use(createPinia()).mount('#app');
});
