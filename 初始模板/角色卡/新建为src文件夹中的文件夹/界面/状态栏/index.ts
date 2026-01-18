<<<<<<< HEAD
=======
import { waitUntil } from 'async-wait-until';
>>>>>>> eec284c41778b4a6530c5c03db8fd44f91e6db6d
import App from './App.vue';
import './global.css';

$(async () => {
  await waitGlobalInitialized('Mvu');
<<<<<<< HEAD
=======
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
>>>>>>> eec284c41778b4a6530c5c03db8fd44f91e6db6d
  createApp(App).use(createPinia()).mount('#app');
});
