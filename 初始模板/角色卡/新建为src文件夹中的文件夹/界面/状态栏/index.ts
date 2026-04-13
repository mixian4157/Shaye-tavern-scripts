<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> df19bf5a213c5e38b25c07c65b47a908c4cdd7ce
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> df19bf5a213c5e38b25c07c65b47a908c4cdd7ce
  createApp(App).use(createPinia()).mount('#app');
});
