import { FormControl } from "@angular/forms";

export class SecurityCodeFormControl extends FormControl {
    override setValue(value: any, options: any): void {

        if (value.match(/[^0-9]/gi)) {
            super.setValue(this.value, { ...options, emitModelToViewChange: true });
            return;
        }

        if(value.length > 3) {
            super.setValue(this.value, { ...options, emitModelToViewChange: true });
            return;
        }

        super.setValue(value, { ...options, emitModelToViewChange: true });
        
    }
}
