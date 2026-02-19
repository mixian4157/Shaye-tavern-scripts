<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 8ff6bdca565e1a9dbd2d942472c26419a7132006
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 8ff6bdca565e1a9dbd2d942472c26419a7132006
  createApp(App).use(createPinia()).mount('#app');
});
