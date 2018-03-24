import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "./auth.service";
import { User } from "./user.model";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
    
    signupForm: FormGroup;
    constructor(private authService : AuthService){}


    onSubmit(){
        const user = new User(this.signupForm.value.email,
             this.signupForm.value.password,
              this.signupForm.value.firstName, 
              this.signupForm.value.lastName);
        this.authService.signup(user).subscribe(
            data => console.log(data)
        );

        this.signupForm.reset();
        //TODO- http request
    }

    ngOnInit(): void {
        this.signupForm = new FormGroup({
            firstName : new FormControl(null, Validators.required),
            lastName : new FormControl(null, Validators.required),
            email : new FormControl(null, [
                Validators.required,
                Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
                        ]),
            password : new FormControl(null, Validators.required),
        })
    }
}