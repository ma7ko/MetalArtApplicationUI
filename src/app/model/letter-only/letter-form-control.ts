import { FormControl } from "@angular/forms";

export class LetterFormControl extends FormControl {
    override setValue(value: any, options: any): void {

        if (value.match(/[^a-zA-z0-9|\s]/gi)) {
            super.setValue(this.value, { ...options, emitModelToViewChange: true });
            return;
        }

        super.setValue(value, { ...options, emitModelToViewChange: true });
        
    }
}