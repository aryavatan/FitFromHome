import { Pipe, PipeTransform } from '@angular/core';
import { Coach } from '../coach.model';

@Pipe({
    name: 'coachListFilter'
})
export class CoachListFilerPipe implements PipeTransform {

    transform(coaches: Coach[], searchTerm: any): Coach[] {
        if (!coaches || !searchTerm) {
            return coaches;
        }

        return coaches.filter(coach => 
            (coach.category.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1));
    }

}