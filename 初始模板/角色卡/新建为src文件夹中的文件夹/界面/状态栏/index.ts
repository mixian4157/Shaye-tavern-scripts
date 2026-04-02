<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 9dbfce4f3a8e36fe5fb6a7eb6d355d67cbde74aa
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 9dbfce4f3a8e36fe5fb6a7eb6d355d67cbde74aa
  createApp(App).use(createPinia()).mount('#app');
});
