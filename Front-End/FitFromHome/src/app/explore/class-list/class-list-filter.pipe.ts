import { Pipe, PipeTransform } from '@angular/core';
import { Class } from '../class.model';

@Pipe({
    name: 'classListFilter'
})
export class ClassListFilerPipe implements PipeTransform {

    transform(classes: Class[], searchTerm: any): Class[] {
        if (!classes || !searchTerm) {
            return classes;
        }

        return classes.filter(aClass => 
            (aClass.category.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1));
    }

}