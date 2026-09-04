<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 9c69ceb712d475b9a9bd31fc9b787240061a05a5
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 9c69ceb712d475b9a9bd31fc9b787240061a05a5
  createApp(App).use(createPinia()).mount('#app');
});
