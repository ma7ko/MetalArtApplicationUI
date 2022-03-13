import { FormControl } from "@angular/forms";

export class LetterFormControl extends FormControl {
    override setValue(value: any, options: any): void {

        if (value.match(/[!„“'%‚‘*()-+=/\\~\|$#@^&`{}\[\]><?:;'"]/gi)) {
            super.setValue(this.value, { ...options, emitModelToViewChange: true });
            return;
        }

        super.setValue(value, { ...options, emitModelToViewChange: true });
        
    }
}