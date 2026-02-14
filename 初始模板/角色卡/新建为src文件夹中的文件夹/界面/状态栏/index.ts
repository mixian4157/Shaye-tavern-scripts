<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> f761507b911da83fd69f1d4a12af9a3f8c81d148
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> f761507b911da83fd69f1d4a12af9a3f8c81d148
  createApp(App).use(createPinia()).mount('#app');
});
