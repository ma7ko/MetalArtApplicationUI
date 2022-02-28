import { FormControl } from "@angular/forms";

export class ZipCodeFormControl extends FormControl {
    override setValue(value: any, options: any): void {
        if (value.length > 10) {
            super.setValue(this.value, { ...options, emitModelToViewChange: true });
            return;
        }

        super.setValue(value, { ...options, emitModelToViewChange: true });
    }
}
