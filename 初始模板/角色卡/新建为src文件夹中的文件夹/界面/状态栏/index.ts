<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 5c392d920d8716df90a81df5e7a51219e546142b
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 5c392d920d8716df90a81df5e7a51219e546142b
  createApp(App).use(createPinia()).mount('#app');
});
