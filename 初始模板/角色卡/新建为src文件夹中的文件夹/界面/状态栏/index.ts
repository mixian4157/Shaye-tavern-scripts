<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 90e6079eeef50e16d8d7f5c8f93576d6212bd51e
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 90e6079eeef50e16d8d7f5c8f93576d6212bd51e
  createApp(App).use(createPinia()).mount('#app');
});
