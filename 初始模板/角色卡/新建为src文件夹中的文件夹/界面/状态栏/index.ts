<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> f447e54f4effc7980891d89ab7e9b3c9aa02737e
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> f447e54f4effc7980891d89ab7e9b3c9aa02737e
  createApp(App).use(createPinia()).mount('#app');
});
