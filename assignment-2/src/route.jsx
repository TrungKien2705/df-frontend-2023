import {createBrowserRouter} from "react-router-dom";
import {path} from "./path";
import DefaultLayout from "./components/DefaultLayout";
import NotFound from "./views/NotFound";
import TableBook from "./views/TableBook";

const route = createBrowserRouter([
    {
        path:path.HOME,
        element: <DefaultLayout/>,
        children: [
            {
                path: path.HOME,
                element: <TableBook/>
            },
            {
                path: path.NOTFOUND,
                element: <NotFound/>
            }
        ]
    },

]);

export default route;