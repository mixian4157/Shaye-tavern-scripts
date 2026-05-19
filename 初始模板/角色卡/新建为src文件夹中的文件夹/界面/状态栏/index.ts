<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 0d9dfecb71b4f51c033c0121ff2cb25104a412fb
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 0d9dfecb71b4f51c033c0121ff2cb25104a412fb
  createApp(App).use(createPinia()).mount('#app');
});
