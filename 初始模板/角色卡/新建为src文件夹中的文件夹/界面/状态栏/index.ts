<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> ad6d1e8e5505fa75c59cbd79365fd12fe00a82eb
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> ad6d1e8e5505fa75c59cbd79365fd12fe00a82eb
  createApp(App).use(createPinia()).mount('#app');
});
