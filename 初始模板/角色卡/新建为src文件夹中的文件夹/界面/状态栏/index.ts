<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 821d0f7fc2e1ba1b9ee76aa4a9f6fc81238c4bfb
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 821d0f7fc2e1ba1b9ee76aa4a9f6fc81238c4bfb
  createApp(App).use(createPinia()).mount('#app');
});
