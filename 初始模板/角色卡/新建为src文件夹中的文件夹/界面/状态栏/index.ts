<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 5c87e143a47f2eac0521a9f7965b7f21118f88a5
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 5c87e143a47f2eac0521a9f7965b7f21118f88a5
  createApp(App).use(createPinia()).mount('#app');
});
