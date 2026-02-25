<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 95299edcaebf7bb81b1a8d87fb1226c74ed1188a
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 95299edcaebf7bb81b1a8d87fb1226c74ed1188a
  createApp(App).use(createPinia()).mount('#app');
});
