<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 1135d5998344ca329c4a49283460954de5cb18ce
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 1135d5998344ca329c4a49283460954de5cb18ce
  createApp(App).use(createPinia()).mount('#app');
});
