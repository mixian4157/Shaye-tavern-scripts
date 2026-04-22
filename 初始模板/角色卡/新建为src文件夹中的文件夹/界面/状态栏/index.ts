<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 4e7451805c5655a416233e7632d1b0693b9cade6
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 4e7451805c5655a416233e7632d1b0693b9cade6
  createApp(App).use(createPinia()).mount('#app');
});
