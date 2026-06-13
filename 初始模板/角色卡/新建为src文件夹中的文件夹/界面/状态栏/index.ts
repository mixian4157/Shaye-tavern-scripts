<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 953e75dbee8f57836eb5651fcf1275f064938d35
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 953e75dbee8f57836eb5651fcf1275f064938d35
  createApp(App).use(createPinia()).mount('#app');
});
