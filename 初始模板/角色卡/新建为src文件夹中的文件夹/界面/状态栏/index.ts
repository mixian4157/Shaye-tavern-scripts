<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 3ff3ec895fe0b8683e26537ccb33fbb96c7c9535
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 3ff3ec895fe0b8683e26537ccb33fbb96c7c9535
  createApp(App).use(createPinia()).mount('#app');
});
