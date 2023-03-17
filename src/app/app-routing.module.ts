import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './core/services/auth-guard.service';
import { AnnonymousGuardService } from './core/services/annonymous-guard.service';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RedirectComponent } from './redirect/redirect.component';
import { RegisterMasterListComponent } from './register-management/register-master/register-master-list/register-master-list.component';
import { ModuleListComponent } from './module/module-list/module-list.component';

const routes: Routes = [

  {
    path: '',
    component: LoginComponent,
    canActivate: [AnnonymousGuardService]
  },
  {
    path: 'redirect/:token/:userId/:roleId/:deviceId',
    component: RedirectComponent,
    canActivate: [AnnonymousGuardService]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AnnonymousGuardService]
  },
  {
    path: 'Dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'network-management',
    loadChildren: () => import('./network-management/network-management.module').then(m => m.NetworkManagementModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'merchant',
    loadChildren: () => import('./merchant/merchant.module').then(m => m.MerchantModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'branch',
    loadChildren: () => import('./branch/branch.module').then(m => m.BranchModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'service',
    loadChildren: () => import('./service/service.module').then(m => m.ServiceModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'mapping',
    loadChildren: () => import('./mapping/mapping.module').then(m => m.MappingModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'module',
    loadChildren: () => import('./module/module.module').then(m => m.ModuleModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'sub-module',
    loadChildren: () => import('./sub-module/sub-module.module').then(m => m.SubModuleModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu-management/menu-management.module').then(m => m.MenuManagementModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'role',
    loadChildren: () => import('./role-management/role-management.module').then(m => m.RoleManagementModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin-users',
    loadChildren: () => import('./admin-users-management/admin-users-management.module').then(m => m.AdminUsersManagementModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'customers-users',
    loadChildren: () => import('./customer-management/customer-management.module').then(m => m.CustomerManagementModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'page-data',
    loadChildren: () => import('./static-page-data/static-page-data.module').then(m => m.StaticPageDataModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'page-name',
    loadChildren: () => import('./static-page-name/static-page-name.module').then(m => m.StaticPageNameModule),
    canActivate: [AuthGuardService]
  }, {
    path: 'category',
    loadChildren: () => import('./category/category.module').then(m => m.CategoryModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'service-module',
    loadChildren: () => import('./service-module/service-module.module').then(m => m.ServiceModuleModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'service-person',
    loadChildren: () => import('./service-person/service-person.module').then(m => m.ServicePersonModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'country',
    loadChildren: () => import('./country/country.module').then(m => m.CountryModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'locality',
    loadChildren: () => import('./locality/locality.module').then(m => m.LocalityModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'faq-category',
    loadChildren: () => import('./faq-category/faq-category.module').then(m => m.FaqCategoryModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'faq',
    loadChildren: () => import('./faq/faq.module').then(m => m.FaqModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'booking',
    loadChildren: () => import('./appoinment/appoinment.module').then(m => m.AppoinmentModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'offer',
    loadChildren: () => import('./offer/offer.module').then(m => m.OfferModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'file-data',
    loadChildren: () => import('./file-data/file-data.module').then(m => m.FileDataModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'features',
    loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'notification-group',
    loadChildren:() => import('./notification-group/notification-group.module').then(m => m.NotificationGroupModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'notifications',
    loadChildren:() => import('./notifications/notifications.module').then(m => m.NotificationsModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'app-details',
    loadChildren:() => import('./manage-app-details/manage-app-details.module').then(m => m.ManageAppDetailsModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'loyality',
    loadChildren:() => import('./loyality-management/loyality-management.module').then(m => m.LoyalityManagementModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'tax',
    loadChildren:() => import('./tax-management/tax-management.module').then(m => m.TaxManagementModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'report',
    loadChildren:() => import('./report-management/report-management.module').then(m => m.ReportManagementModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'register-management',
    loadChildren:() => import('./register-management/register-management.module').then(m => m.RegisterManagementModule),
    canActivate: [AuthGuardService]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
