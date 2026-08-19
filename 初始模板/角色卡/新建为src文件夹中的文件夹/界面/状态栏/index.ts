<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> fe7d6686eaa214f144c2a734be2e26ca399f3d3d
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> fe7d6686eaa214f144c2a734be2e26ca399f3d3d
  createApp(App).use(createPinia()).mount('#app');
});
