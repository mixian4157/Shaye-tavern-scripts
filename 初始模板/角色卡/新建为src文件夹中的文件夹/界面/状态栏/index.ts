<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 859af7880ccfb04e96c9f301866693c2fac6de48
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 859af7880ccfb04e96c9f301866693c2fac6de48
  createApp(App).use(createPinia()).mount('#app');
});
