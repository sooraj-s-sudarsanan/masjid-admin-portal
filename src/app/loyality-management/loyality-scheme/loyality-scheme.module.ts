import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoyalitySchemeListComponent } from './loyality-scheme-list/loyality-scheme-list.component';
import { LoyalitySchemeGridActionComponent } from './loyality-scheme-grid-action/loyality-scheme-grid-action.component';
import { LoyalitySchemeDeleteComponent } from './loyality-scheme-delete/loyality-scheme-delete.component';
import { CoreModule } from '../../core/core.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreModule
  ] 
})
export class LoyalitySchemeModule { }
