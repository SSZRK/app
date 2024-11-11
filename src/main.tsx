import {createRoot} from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ModuleSelector from "./pages/module-selector.tsx";
import Login from "./pages/login.tsx";
import {disableReactDevTools} from "@fvilers/disable-react-devtools";
import About from "./pages/about.tsx";
import Register from "./pages/register.tsx";
import UserSetter from "./pages/user-setter.tsx";
import ProjectSelector from "./pages/project-selector.tsx";
import Serwo from "./pages/dispatcher/serwo/serwo.tsx";
import DocumentEditor from "./pages/document-editor.tsx";
import VerifyEmail from "./pages/verify-email.tsx";
import Admin from "./pages/admin/admin.tsx";
import UsersAdmin from "./pages/admin/users.tsx";
import PostsAdmin from "./pages/admin/posts.tsx";
import ProjectAdmin from "./pages/admin/project.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <ProjectSelector/>,
    },
    {
        path: '/verification',
        element: <VerifyEmail/>,
    },
    {
        path: '/about',
        element: <About/>,
    },
    {
        path: '/:projectId',
        children: [
            {
                path: 'module-selector',
                element: <ModuleSelector/>,
            },
            {
                path: 'login',
                element: <Login/>,
            },
            {
                path: 'register',
                element: <Register/>,
            },
            {
                path: 'user-setter',
                element: <UserSetter/>,
            },
            {
                path: 'document-editor/:documentId',
                element: <DocumentEditor/>,
            },
            {
                path: 'dispatcher',
                children: [
                    {
                        path: 'serwo',
                        element: <Serwo/>,
                    },
                ],
            },
            {
                path: 'admin',
                element: <Admin/>,
                children: [
                    {
                        path: 'users',
                        element: <UsersAdmin/>,
                    },
                    {
                        path: 'posts',
                        element: <PostsAdmin/>,
                    },
                    {
                        path: 'project',
                        element: <ProjectAdmin/>,
                    },
                ],
            },
        ],
    }
]);

if (import.meta.env.NODE_ENV === 'production') {
    disableReactDevTools();
}

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router}/>
)

declare global {
    interface Window {
        __TAURI__: Record<string, unknown>;
    }
}