import { Component } from "@angular/core";
import { ErrorService } from "./error.service";
import { OnInit } from "@angular/core";

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styles: [`
        .backdrop {
            background-color: rgba(0,0,0,0.6);
            position: fixed;
            top: 0;
            left:0;
            width:100%;
            height: 100vh;
        }
    `]
})
export class ErrorComponent implements OnInit{
    appError: Error;
    display = 'none';

    constructor(private errorService: ErrorService) {}

    ngOnInit(): void {
        console.log('on error model');
        this.errorService.errorOccurred.subscribe(
            (error: Error) => {
                 this.appError = error;
                 this.display = 'inline-block';
            }
        );
    }

    onErrorHandled() {
        this.display = 'none';
    }
}