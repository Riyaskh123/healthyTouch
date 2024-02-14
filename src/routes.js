import Index from "./component";
import AddCustomer from "./component/AddCustomer";

const RoutesConfig = () => {
    
    const routes = [

        {
            path: '/',
            element: <Index/>,
        },
        {
            path: '/addCustomer',
            element: <AddCustomer />,
        }
    ]

    return routes;
}


export default RoutesConfig;