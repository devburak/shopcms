import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import ExplicitIcon from '@mui/icons-material/Explicit';
const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
      {
        id: 'default',
        title: 'Dashboard',
        type: 'item',
        url: '/',
        icon: DashboardIcon,
        breadcrumbs: false
      }
    ]
  };

  const sample = {
    id: 'sample',
    title: 'Sample Page',
    type: 'group',
    children: [
        {id: 'sample-page',
        title: 'Sample Page',
        type: 'item',
        url: '/sample-page',
        icon: ExplicitIcon,
        breadcrumbs: false
      }
    ]
  };

  const pages = {
    id: 'pages',
    title: 'Pages',
    caption: 'Pages Caption',
    type: 'group',
    children: [
      {
        id: 'SERVICETERM',
        title: 'SERVICE TERM',
        type: 'collapse',
        icon: ArticleIcon,
  
        children: [
          {
            id: 'login',
            title: 'Login',
            type: 'item',
            url: '/login',
            target: true
          },
          {
            id: 'register',
            title: 'Register',
            type: 'item',
            url: '/user/register',
            target: true
          }
        ]
      }
    ]
  };

const menuItems = {
    items: [
        dashboard, 
        pages, 
       sample
    ]
  };
  
  export default menuItems;