<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 92bc9ed4a5ff1e65a494b9644780983031cdb1df
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 92bc9ed4a5ff1e65a494b9644780983031cdb1df
  createApp(App).use(createPinia()).mount('#app');
});
