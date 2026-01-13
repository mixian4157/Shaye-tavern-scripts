<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 5526c7827136208a6a75e0b37bc0620a9dd63ba4
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 5526c7827136208a6a75e0b37bc0620a9dd63ba4
  createApp(App).use(createPinia()).mount('#app');
});
