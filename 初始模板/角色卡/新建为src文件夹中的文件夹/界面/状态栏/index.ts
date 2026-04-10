<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 304e8c08c9a8646568197fb30d79c23676d3a5a0
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 304e8c08c9a8646568197fb30d79c23676d3a5a0
  createApp(App).use(createPinia()).mount('#app');
});
