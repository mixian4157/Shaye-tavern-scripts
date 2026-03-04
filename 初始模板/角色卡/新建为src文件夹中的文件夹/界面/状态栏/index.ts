<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> b0dafaa424fd6b2abbf4f32eab5bb8f9ad970e3d
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> b0dafaa424fd6b2abbf4f32eab5bb8f9ad970e3d
  createApp(App).use(createPinia()).mount('#app');
});
