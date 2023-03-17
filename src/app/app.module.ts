import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './core/header/header.component';
import { NetworkManagementModule } from './network-management/network-management.module';
import { MenuManagementModule } from './menu-management/menu-management.module';
import { RoleManagementModule } from './role-management/role-management.module';
import { AdminUsersManagementModule } from './admin-users-management/admin-users-management.module';
import { CustomerManagementModule } from './customer-management/customer-management.module';
import {ModuleModule} from './module/module.module';
import {SubModuleModule} from './sub-module/sub-module.module';
import { StaticPageDataModule } from './static-page-data/static-page-data.module';
import { StaticPageNameModule } from './static-page-name/static-page-name.module';
import { CategoryModule } from './category/category.module';
import { DatePipe } from '@angular/common';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { RedirectComponent } from './redirect/redirect.component';
import { BranchModule } from './branch/branch.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForceChangePasswordComponent } from './force-change-password/force-change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxImageCompressService } from 'ngx-image-compress';
import { RegisterManagementModule } from './register-management/register-management.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    RedirectComponent,
    ChangePasswordComponent,
    ForceChangePasswordComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NetworkManagementModule,
    MenuManagementModule,
    RoleManagementModule,
    AdminUsersManagementModule,
    CustomerManagementModule,
    ModuleModule,
    SubModuleModule,
    StaticPageDataModule,
    StaticPageNameModule,
    CategoryModule,
    BranchModule,    
    FlexLayoutModule,
    RegisterManagementModule
  ],
  providers: [
    DatePipe,
    NgxImageCompressService    
  ],
  bootstrap: [AppComponent],
  entryComponents:[
    ChangePasswordComponent
  ]
})
export class AppModule { }
