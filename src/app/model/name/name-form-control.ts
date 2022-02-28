import { FormControl } from "@angular/forms";

export class NameFormControl extends FormControl {
    override setValue(value: any, options: any): void {
        if (value.match(/[^a-zA-Z|\s]/gi)) {
            super.setValue(this.value, { ...options, emitModelToViewChange: true });
            return;
        }

        if(value.length > 50) {
            super.setValue(this.value, { ...options, emitModelToViewChange: true });
            return;
        }

        if (value.length > 1 && value[value.length - 2] == value[value.length - 1] && value[value.length - 1] == " ") {
            super.setValue(this.value, { ...options, emitModelToViewChange: true });
            return;
        }

        if ((value == this.value + "" + value[value.length - 1] || value == this.value.substring(0, this.value.length - 1))) 
            super.setValue(value, { ...options, emitModelToViewChange: true });
        else
            super.setValue(this.value, { ...options, emitModelToViewChange: true });
        
    }
}
