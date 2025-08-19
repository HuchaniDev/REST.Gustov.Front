import { Component, effect, inject } from "@angular/core";
import { UpperCasePipe } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  standalone: true,
  imports: [
    UpperCasePipe
  ]

})
export default class MainHeaderComponent {
  // #authService = inject(authService)
  #router = inject(Router)
  title = 'Gustov'

  userName:string|null = null
  role:string|null = null

  userEffect = effect(()=>{
    // const user = this.#authService.user();
    const user = {
      id:'',
      username: 'daniel Huchani',
      role: 'cajero'
    }

    if(user){
      this.userName = user.username;
      this.role = user.role;
    }
    // console.log('user', user);
    // console.log('userName', this.userName);

  });

  logout(){
    console.log('salir')
    // this.#authService.logout();
  }
  navigateToHome(){
    this.#router.navigate(['/']);
  }
}