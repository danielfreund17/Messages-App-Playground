import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "./auth.service";
import { User } from "./user.model";
import { Router } from "@angular/router";

@Component({
    selector: 'app-signin',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    
    constructor(private authService: AuthService, private router: Router){}
    loginForm: FormGroup;


    onSubmit(){
        const user = new User(this.loginForm.value.email,
            this.loginForm.value.password);
       this.authService.login(user).subscribe(
           data => {
               if(!data['token']) {
                   console.log('Didnt recieve token');
               }

               localStorage.setItem('token', data['token']);
               localStorage.setItem('userId', data['userId']);
               this.router.navigateByUrl('/messages');
           },
           error => console.log(error)
       );

       this.loginForm.reset();
    }

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            email : new FormControl(null, [
                Validators.required,
                Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
                        ]),
            password : new FormControl(null, Validators.required),
        })
    }
}