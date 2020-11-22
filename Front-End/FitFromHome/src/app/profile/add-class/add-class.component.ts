import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HTTPService } from 'src/app/services/http.service';

@Component({
    selector: 'app-add-class',
    templateUrl: './add-class.component.html',
    styleUrls: ['./add-class.component.scss']
})
export class AddClassComponent implements OnInit{
    coachId;
    constructor(private httpService: HTTPService, private router: Router) {}

    price;
    title;
    createdBy;
    description;
    category;
    endDate;
    startDate;
    createdClassId;

    ngOnInit() {
        this.coachId = localStorage.getItem('id');
    }

    onSubmit(addClassForm) {
        this.title = addClassForm.value.title;
        this.createdBy = addClassForm.value.createdBy;
        this.description = addClassForm.value.description;
        this.category = addClassForm.value.category;
        this.price = addClassForm.value.price;
        this.startDate = addClassForm.value.startDate;
        this.endDate = addClassForm.value.endDate;

        this.httpService.addNewClass(this.title, this.createdBy, this.description,
            this.category, this.price, this.startDate, this.endDate, this.coachId)
            .subscribe(response => {
                this.createdClassId = response.classID;
                this.router.navigate(['/explore']);
            })

    }
}