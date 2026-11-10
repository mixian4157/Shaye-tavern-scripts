<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 7f88a390b295f1e436517bdb7a90a2ea6db70293
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 7f88a390b295f1e436517bdb7a90a2ea6db70293
  createApp(App).use(createPinia()).mount('#app');
});
