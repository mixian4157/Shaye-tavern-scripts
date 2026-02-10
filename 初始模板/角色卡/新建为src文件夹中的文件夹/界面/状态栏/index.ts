<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 0d05c169dd0622cb404331b23687994fbde743ab
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 0d05c169dd0622cb404331b23687994fbde743ab
  createApp(App).use(createPinia()).mount('#app');
});
