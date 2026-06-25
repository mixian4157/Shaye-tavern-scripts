<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 4f0b745981550e95a66a32adf5b43f01a2cde104
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 4f0b745981550e95a66a32adf5b43f01a2cde104
  createApp(App).use(createPinia()).mount('#app');
});
