<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 89404ec39adece744d9b83117c686b89b680c869
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 89404ec39adece744d9b83117c686b89b680c869
  createApp(App).use(createPinia()).mount('#app');
});
