<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 6a834e584103185c14d68e73a012be1010d971d4
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 6a834e584103185c14d68e73a012be1010d971d4
  createApp(App).use(createPinia()).mount('#app');
});
