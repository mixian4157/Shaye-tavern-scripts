<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 144270117e5c2d7250e461da58e402f15c661485
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 144270117e5c2d7250e461da58e402f15c661485
  createApp(App).use(createPinia()).mount('#app');
});
