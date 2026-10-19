<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> a5317b873d6a11e0ca2f71d53e45bc23e81faf2a
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> a5317b873d6a11e0ca2f71d53e45bc23e81faf2a
  createApp(App).use(createPinia()).mount('#app');
});
