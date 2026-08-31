<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 457044c57ea6141e665c88603ea84d7542da64a4
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 457044c57ea6141e665c88603ea84d7542da64a4
  createApp(App).use(createPinia()).mount('#app');
});
