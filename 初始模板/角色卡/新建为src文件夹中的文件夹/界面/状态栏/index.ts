<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> dc79e70c2b507a4984bc1620b1a875e1a4ff083d
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> dc79e70c2b507a4984bc1620b1a875e1a4ff083d
  createApp(App).use(createPinia()).mount('#app');
});
