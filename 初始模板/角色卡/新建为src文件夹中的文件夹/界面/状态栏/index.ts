<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> aa841a49033c68257c3428266534ebbec92e7fb2
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> aa841a49033c68257c3428266534ebbec92e7fb2
  createApp(App).use(createPinia()).mount('#app');
});
