import { EventEmitter, Injectable } from "@angular/core";


@Injectable()
export class ErrorService {
    errorOccurred = new EventEmitter<Error>();

    handleError(error: any) {
        const errorData = new Error(error.message);
        this.errorOccurred.emit(errorData);
    }
}