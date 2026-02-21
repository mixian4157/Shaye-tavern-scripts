<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 3190fb176c50753bdb03667e72b85fbcffe909d1
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 3190fb176c50753bdb03667e72b85fbcffe909d1
  createApp(App).use(createPinia()).mount('#app');
});
