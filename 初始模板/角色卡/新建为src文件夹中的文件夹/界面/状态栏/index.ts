<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> d8b37673c7eb2745a3439060fbf772c95799b9eb
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> d8b37673c7eb2745a3439060fbf772c95799b9eb
  createApp(App).use(createPinia()).mount('#app');
});
