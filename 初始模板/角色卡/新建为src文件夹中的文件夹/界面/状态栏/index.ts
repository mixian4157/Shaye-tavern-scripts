<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> 299b9bb0dd0e1b9c9863f20ca4cbc261e552bdd5
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> 299b9bb0dd0e1b9c9863f20ca4cbc261e552bdd5
  createApp(App).use(createPinia()).mount('#app');
});
