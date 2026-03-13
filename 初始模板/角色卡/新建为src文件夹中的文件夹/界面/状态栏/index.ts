<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 02647e016aaace9564401c0202c9d2456ff91653
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 02647e016aaace9564401c0202c9d2456ff91653
  createApp(App).use(createPinia()).mount('#app');
});
