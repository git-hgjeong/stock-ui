import { createBrowserRouter } from 'react-router-dom';
import BlankLayout from '../components/Layouts/BlankLayout';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import { routes } from './routes';

const finalRoutes = routes.map((route) => {
    return {
        ...route,
        element: route.layout === 'blank' ? <BlankLayout>{route.element}</BlankLayout> : <DefaultLayout>{route.element}</DefaultLayout>,
    };
});

let options = {basename:'/stock/ui/dist'}
const url = new URL('./img.png', import.meta.url).href
console.log('>>>>> URL : ', url);
if(url.indexOf('localhost') != -1){
    options = {basename: ''};
}

const router = createBrowserRouter(finalRoutes, options);

export default router;
