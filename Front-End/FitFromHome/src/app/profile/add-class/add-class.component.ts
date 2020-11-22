import { Component } from '@angular/core';
import { HTTPService } from 'src/app/services/http.service';

@Component({
    selector: 'app-add-class',
    templateUrl: './add-class.component.html',
    styleUrls: ['./add-class.component.scss']
})
export class AddClassComponent {

    constructor(private httpService: HTTPService) {}

    price;
    title;
    createdBy;
    description;

    category;
    endDate;
    startDate;

    

    onSubmit(addClassForm){

    }

}