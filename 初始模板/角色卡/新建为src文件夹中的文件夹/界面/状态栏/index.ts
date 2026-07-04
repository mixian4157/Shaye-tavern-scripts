<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 24c09dd0d2e3a345ced6bd6449ff0c89cd686543
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 24c09dd0d2e3a345ced6bd6449ff0c89cd686543
  createApp(App).use(createPinia()).mount('#app');
});
