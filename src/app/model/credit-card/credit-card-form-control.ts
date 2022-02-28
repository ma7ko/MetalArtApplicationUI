import { FormControl } from "@angular/forms";

export class CreditCardFormControl extends FormControl {
    override setValue(value: any, options:any): void {
        
        if (value.match(/[^0-9|\-]/gi)) {
            super.setValue(this.value, { ...options, emitModelToViewChange: true });
            return;
        }

        if ((value == this.value + "" + value[value.length - 1] || value == this.value.substring(0, this.value.length - 1))) {

    
            if (value.match(/\-/gi)) {
                if (value.match(/\-/gi).length > 0 && value.length < 5) {
                    super.setValue(this.value, { ...options, emitModelToViewChange: true });
                    return;
                } else if ((value.match(/\-/gi).length > 1 && value.length < 10)) {
                    super.setValue(this.value, { ...options, emitModelToViewChange: true });
                    return;
                } else if ((value.match(/\-/gi).length > 2 && value.length < 15)) {
                    super.setValue(this.value, { ...options, emitModelToViewChange: true });
                    return;
                } else if (value.match(/\-/gi).length > 3){
                    super.setValue(this.value, { ...options, emitModelToViewChange: true });
                    return;
                }
            }
    
            if (value.length > 19) {
                super.setValue(this.value, { ...options, emitModelToViewChange: true });
                return;
            }
    
            if (value.length % 5 == 0 && this.value.length == value.length + 1) {//(value.length == 5 && this.value.length == 6) || (value.length == 10 && this.value.length == 11) || (value.length == 15 &&  this.value.length == 16)) {
                super.setValue(value.substring(0, value.length - 1), { ...options, emitModelToViewChange: true });
                return;
            }
    
            if (value.length > 0 && value.length % 5 == 0 && value.length < 18) {
                if (value[value.length-1] == "-") {
                    super.setValue(this.value, { ...options, emitModelToViewChange: true });
                    return;
                }
                super.setValue(this.value + "-" + value.substring(value.length - 1, value.length), { ...options, emitModelToViewChange: true });
                return;
            }
    
            super.setValue(value, { ...options, emitModelToViewChange: true });
        }  else {
            super.setValue(this.value, { ...options, emitModelToViewChange: true });
            return;
        }
    }
}
