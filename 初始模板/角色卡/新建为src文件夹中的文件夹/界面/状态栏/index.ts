<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> ad523eba6d41b01a9154c98517a61825ef3ea546
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> ad523eba6d41b01a9154c98517a61825ef3ea546
  createApp(App).use(createPinia()).mount('#app');
});
