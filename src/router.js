import Login from "./pages/Login";
import Index from './pages/Index';
import User from './pages/User';
import Register from './pages/Register'
import Search from './pages/Search';
import Following from './pages/Following';
import Topics from './pages/Topics';
import DetailedTopic from "@/pages/DetailedTopic";
import Newest from './components/Newest'
import Hottest from './components/Hottest'
import UserAnswers from './components/UserAnswers'
import UserFollow from './components/UserFollow'
import UserFans from './components/UserFans'
import SearchAnswer from './components/SearchAnswer'
import SearchUser from "./components/SearchUser";
import ModifyPassword from "./pages/ModifyPassword"
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
            }
        ]
    },
    {
        path: '/topic',
        component: Topics
    },
    {
        path:'/detailed_topic/:topic_id',
        component:DetailedTopic
    },
    {
        path: '/modify_password',
        component: ModifyPassword
    }
]