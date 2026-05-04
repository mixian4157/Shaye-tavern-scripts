<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 83d9038af3d5ad60dd9744400c8b94779c47044e
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 83d9038af3d5ad60dd9744400c8b94779c47044e
  createApp(App).use(createPinia()).mount('#app');
});
