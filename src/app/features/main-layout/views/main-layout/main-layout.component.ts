import {Component, inject} from "@angular/core";
import { CommonModule } from "@angular/common";
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import MainHeaderComponent from "../../controls/main-header/main-header.component";
import {IMenuOptions} from "../../models/MenuOptions.interface";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MainHeaderComponent
  ]
})
export default class MainLayoutComponent {
  #router = inject(Router);


  navigateTo(url:string){
    this.#router.navigateByUrl(url);
  }
}