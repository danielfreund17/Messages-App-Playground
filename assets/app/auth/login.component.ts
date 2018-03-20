import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
    selector: 'app-signin',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    
    loginForm: FormGroup;


    onSubmit(){
        console.log(this.loginForm);
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