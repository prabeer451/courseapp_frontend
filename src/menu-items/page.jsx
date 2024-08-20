// assets
import { LoginOutlined, ProfileOutlined, ToolOutlined, ShoppingOutlined, CustomerServiceOutlined, UserOutlined, FileTextOutlined } from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined,
  ToolOutlined,
  ShoppingOutlined,
  CustomerServiceOutlined,
  UserOutlined,
  FileTextOutlined
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
      title: 'Service Contracts',
      type: 'item',
      url: '/amc',
      icon: icons.ProfileOutlined
    },
    {
      id: 'complaints',
      title: 'Complaints',
      type: 'item',
      url: '/complaints',
      icon: icons.FileTextOutlined
    }
  ]
};

export default pages;
