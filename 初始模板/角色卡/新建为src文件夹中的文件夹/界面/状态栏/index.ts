<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> f8b20765c5ce38a1e065c2a84b9882d8fac75f97
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> f8b20765c5ce38a1e065c2a84b9882d8fac75f97
  createApp(App).use(createPinia()).mount('#app');
});
