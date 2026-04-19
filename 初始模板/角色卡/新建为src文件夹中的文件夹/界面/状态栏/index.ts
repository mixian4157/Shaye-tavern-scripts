<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 5427fc4312cb5983ca9885b5f500c6082deaadf5
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 5427fc4312cb5983ca9885b5f500c6082deaadf5
  createApp(App).use(createPinia()).mount('#app');
});
