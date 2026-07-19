<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> a4d60f52b8b1b0f872a80088ba7e339b0933eeb2
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> a4d60f52b8b1b0f872a80088ba7e339b0933eeb2
  createApp(App).use(createPinia()).mount('#app');
});
