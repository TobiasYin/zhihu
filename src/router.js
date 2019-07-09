import Login from "./pages/Login";
import Index from './pages/Index';
import User from './pages/User';
import Register from './pages/Register'
import Search from './pages/Search';
import Following from './pages/Following';
import Topics from './pages/Topics';
import Topic from "./pages/Topic";
import Example from "./pages/Example";
import Newest from './components/Newest'
import Hottest from './components/Hottest'
import UserAnswers from './components/UserAnswers'
import UserFollow from './components/UserFollow'
import UserFans from './components/UserFans'
import SearchAnswer from './components/SearchAnswer'
import SearchUser from "./components/SearchUser";
import ModifyPassword from "./pages/ModifyPassword";
import QuestionDetailed from "./pages/QuestionDetailed";
import QuestionList from './components/QuestionList'

export default [
    {
        path: '/',
        component: Index,
        children: [
            {
                path: '',
                component: Newest
            }
        ]
    },
    {
        path: '/search/:str',
        component: Search,
        children: [
            {
                path: "answers",
                component: SearchAnswer
            },
            {
                path: "users",
                component: SearchUser
            }
        ]
    },
    {
        path: '/following',
        component: Following
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/index',
        component: Index,
        children: [
            {
                path: '',
                component: Newest
            },
            {
                path: 'newest',
                component: Newest
            },
            {
                path: 'hottest',
                component: Hottest
            }
        ]
    },
    {
        path: '/user/:id',
        component: User,
        children: [
            {
                path: "",
                component: UserAnswers
            },
            {
                path: "answers",
                component: UserAnswers
            },
            {
                path: "follow",
                component: UserFollow
            },
            {
                path: "fans",
                component: UserFans
            },
            {
                path: "ques",
                component: QuestionList
            }
        ]
    },
    {
        path: '/topics',
        component: Topics
    },
    {
        path:'/topic/:id',
        component:Topic
    },
    {
        path: '/example',
        component: Example,
    },
    {  path: '/modify_password',
        component: ModifyPassword
    },
    {
        path:'/question/:id',
        component: QuestionDetailed
    }
]