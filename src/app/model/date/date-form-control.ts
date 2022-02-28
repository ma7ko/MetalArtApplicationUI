import { FormControl } from "@angular/forms";

export class DateFormControl extends FormControl {

    override setValue(value: any, options: any): void {

        if (value.match(/[^0-9|\/]/gi)) {
            super.setValue(this.value, { ...options, emitModelToViewChange: true });
            return;
        }

        if (value.match(/\//gi) && ((value.match(/\//gi).length > 0 && value.length < 3) || (value.match(/\//gi).length > 1 && value.length > 3))) {
            super.setValue(this.value, { ...options, emitModelToViewChange: true });
            return;
        }

        if (value.length > 5) {
            super.setValue(this.value, { ...options, emitModelToViewChange: true });
            return;
        }


        if (value.length == 3 && this.value.length == 2) {
            if (value.match(/\//gi) && value.match(/\//gi).length > 0) {
                super.setValue(this.value, { ...options, emitModelToViewChange: true });
                return;
            } else {
                super.setValue(this.value + "/" + value[value.length-1], { ...options, emitModelToViewChange: true });
                return;
            }
        }

        if(value.length > 2 && !value.includes('/')) {
            super.setValue(value.substring(0,2), { ...options, emitModelToViewChange: true });
            return;
        }

        if (value.length == 3 || (value.length == 2 && this.value.length == 3)) {
            super.setValue(value.replace("/",""), { ...options, emitModelToViewChange: true });
            return;
        }

        if (value.length == 2) {
            super.setValue(value + "/", { ...options, emitModelToViewChange: true });
            return;
        }

        if(value.length > 2 && value[2] != '/') {
            super.setValue(this.value, { ...options, emitModelToViewChange: true });
            return;
        }
        
        super.setValue(value, { ...options, emitModelToViewChange: true });
    }
}
