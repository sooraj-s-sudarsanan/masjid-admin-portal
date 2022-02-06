import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { NavItem } from 'src/app/core/model/sidebar-navigation-model';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/core/services/header.service';
import { PermissionService } from '../services/permission.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-sidebar-navigation',
  templateUrl: './sidebar-navigation.component.html',
  styleUrls: ['./sidebar-navigation.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class SidebarNavigationComponent implements OnInit {

  expanded: boolean;
  @Input() item: any;
  @Input() depth: number;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;

  constructor(
    public router: Router,
    public headerService: HeaderService,
    public permissionService: PermissionService,
    public authenticationService: AuthenticationService) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {
    this.headerService.currentUrl.subscribe((url: string) => {
      if (this.item.route && url) {
        // console.log(`Checking '/${this.item.route}' against '${url}'`);
        this.expanded = url.indexOf(`/${this.item.route}`) === 0;
        this.ariaExpanded = this.expanded;
        // console.log(`${this.item.route} is expanded: ${this.expanded}`);
      }
    });
  }

  onItemSelected(item: NavItem): any {

    if (!item.children || !item.children.length) {
      this.permissionService.currPagePermission = item;
      this.router.navigate([item.route]);
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }

  }
}
