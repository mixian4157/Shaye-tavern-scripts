<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 9aadd35b2a8c888b756179046743cbf920a1a0c8
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 9aadd35b2a8c888b756179046743cbf920a1a0c8
  createApp(App).use(createPinia()).mount('#app');
});
