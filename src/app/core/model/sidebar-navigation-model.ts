import { ModuleKeyModel } from './module-key-model';

export class SidebarNavigationModel {
  public static navItems: NavItem[] = [
    {
      displayName: 'Merchant Management',
      iconName: 'settings',
      route: '',
      children: [
        {
          displayName: ModuleKeyModel.networkManagement.name,
          iconName: 'list',
          route: 'network-management/list',
          children: []
        },
        {
          displayName: 'Category Management',
          iconName: 'category',
          route: 'category/list',
          children: []
        },
        {
          displayName: 'Service Management',
          iconName: 'settings',
          route: 'service/list',
          children: []
        },
        {
          displayName: 'Merchant Management',
          iconName: 'settings',
          route: 'merchant/list',
          children: []
        },
        {
          displayName: 'Branch Management',
          iconName: 'settings',
          route: 'branch/list',
          children: []
        },
        {
          displayName: 'Branch Service Mapping',
          iconName: 'settings',
          route: 'branch-Service-mapping/list',
          children: []
        },
        {
          displayName: 'Service Person Management',
          iconName: 'engineering',
          route: 'service-person-management/list',
          children: []
        }
      ]
    },
    {
      displayName: 'Admin Activities',
      iconName: 'admin_panel_settings',
      route: '',
      children: [
        {
          displayName: ModuleKeyModel.module.name,
          iconName: 'view_module',
          route: 'module/list',
          children: []
        },
        {
          displayName: ModuleKeyModel.subModule.name,
          iconName: 'view_module',
          route: 'sub-module/list',
          children: []
        },
        {
          displayName: ModuleKeyModel.roleManagement.name,
          iconName: 'account_circle',
          route: 'role/list',
          children: []
        },
        {
          displayName: ModuleKeyModel.menuManagement.name,
          iconName: 'list',
          route: 'menu/list',
          children: []
        },
        {
          displayName: ModuleKeyModel.adminUserManagement.name,
          iconName: 'supervised_user_circle',
          route: 'admin-users/list',
          children: []
        },
        {
          displayName: ModuleKeyModel.customerUserManagement.name,
          iconName: 'supervisor_account',
          route: 'customers/list',
          children: []
        }
      ]
    },
    {
      displayName: 'Content Management',
      iconName: 'pages',
      route: '',
      children: [
        {
          displayName: ModuleKeyModel.pageName.name,
          iconName: 'pages',
          route: 'page-name/list',
          children: []
        },
        {
          displayName: ModuleKeyModel.pageData.name,
          iconName: 'pages',
          route: 'page-data/list',
          children: []
        }
      ]
    }
  ];
}
export interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  children?: NavItem[];
}