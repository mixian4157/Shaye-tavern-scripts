<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 5cbce61438c014a1b01c610cf547c63c2cb8fee1
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 5cbce61438c014a1b01c610cf547c63c2cb8fee1
  createApp(App).use(createPinia()).mount('#app');
});
