// assets
import { LoginOutlined, ProfileOutlined, ToolOutlined, ShoppingOutlined, CustomerServiceOutlined, UserOutlined } from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined,
  ToolOutlined,
  ShoppingOutlined,
  CustomerServiceOutlined,
  UserOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'pages',
  title: 'Pages',
  type: 'group',
  children: [
    {
      id: 'parts',
      title: 'Parts',
      type: 'item',
      url: '/parts',
      icon: icons.ToolOutlined
    },
    {
      id: 'products',
      title: 'Products',
      type: 'item',
      url: '/products',
      icon: icons.ShoppingOutlined
    },
    {
      id: 'services',
      title: 'Services',
      type: 'item',
      url: '/services',
      icon: icons.CustomerServiceOutlined
    },
    {
      id: 'customers',
      title: 'Customers',
      type: 'item',
      url: '/customers',
      icon: icons.UserOutlined
    },
    {
      id: 'amc',
      title: 'AMC',
      type: 'item',
      url: '/amc',
      icon: icons.ProfileOutlined
    }
  ]
};

export default pages;
