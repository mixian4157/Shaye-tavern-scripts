<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 0ec95e792bbd1451e45badc1c5b13888d2f7f007
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 0ec95e792bbd1451e45badc1c5b13888d2f7f007
  createApp(App).use(createPinia()).mount('#app');
});
