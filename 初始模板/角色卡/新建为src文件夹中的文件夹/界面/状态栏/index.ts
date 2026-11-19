<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 78eb7a3ba462a0fa917dd6ac64129b4b43acd14c
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 78eb7a3ba462a0fa917dd6ac64129b4b43acd14c
  createApp(App).use(createPinia()).mount('#app');
});
