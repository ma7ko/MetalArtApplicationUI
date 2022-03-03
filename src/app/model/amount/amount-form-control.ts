import { FormControl } from "@angular/forms";

export class AmountFormControl extends FormControl {
    override setValue(value: any, options: any): void {
        if (value.toString().match(/[^0-9]/gi)) {
            super.setValue(this.value, { ...options, emitModelToViewChange: true });
            return;
        }

        if (value.length == 0) {
            super.setValue(0, { ...options, emitModelToViewChange: true });
            return;
        }

        if (this.value == "0" && value.length > 1) {
            super.setValue(value.substring(1, value.length), { ...options, emitModelToViewChange: true });
            return;
        }

        super.setValue(value, { ...options, emitModelToViewChange: true });
    }
}
