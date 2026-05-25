<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 1edcc383164d8213f030dcdfabc0b6563966ae13
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 1edcc383164d8213f030dcdfabc0b6563966ae13
  createApp(App).use(createPinia()).mount('#app');
});
