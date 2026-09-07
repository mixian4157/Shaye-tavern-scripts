<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> c3dda85b40baa6188b2eff4e263cb20fedabcecf
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> c3dda85b40baa6188b2eff4e263cb20fedabcecf
  createApp(App).use(createPinia()).mount('#app');
});
