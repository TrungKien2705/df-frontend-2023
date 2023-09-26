import {createBrowserRouter} from "react-router-dom";
import {path} from "./path";
import DefaultLayout from "./components/layout/DefaultLayout";
import NotFound from "./views/NotFound";
import Book from "./views/Book";

const route = createBrowserRouter([
    {
        path:path.HOME,
        element: <DefaultLayout/>,
        children: [
            {
                path: path.HOME,
                element: <Book/>
            },
            {
                path: path.NOTFOUND,
                element: <NotFound/>
            }
        ]
    },

]);

export default route;