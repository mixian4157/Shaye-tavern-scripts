<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> ca4c8b1b9f4d81aabc8d22440a4a180fca5f4409
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> ca4c8b1b9f4d81aabc8d22440a4a180fca5f4409
  createApp(App).use(createPinia()).mount('#app');
});
