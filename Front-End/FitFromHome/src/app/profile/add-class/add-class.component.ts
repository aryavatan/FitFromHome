import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HTTPService } from 'src/app/services/http.service';

@Component({
    selector: 'app-add-class',
    templateUrl: './add-class.component.html',
    styleUrls: ['./add-class.component.scss']
})
export class AddClassComponent {

    creatorId;

    constructor(private httpService: HTTPService, private route: ActivatedRoute, private router: Router) {
        if (this.route.snapshot.params['id']) {
            this.creatorId = this.route.snapshot.paramMap.get('id');
          }
    }

    price;
    title;
    createdBy;
    description;

    category;
    endDate;
    startDate;

    createdClassId;



    onSubmit(addClassForm){
        this.title = addClassForm.value.title;
        this.createdBy = addClassForm.value.createdBy;
        this.description = addClassForm.value.description;
        this.category = addClassForm.value.category;
        this.price = addClassForm.value.price;
        this.startDate = addClassForm.value.startDate;
        this.endDate = addClassForm.value.endDate;
        
        this.httpService.addNewClass(this.title, this.createdBy, this.description,
             this.category, this.price, this.startDate, this.endDate, this.creatorId)
             .subscribe(response => {
                 this.createdClassId = response.classID;
                 console.log(this.createdClassId);
                 this.httpService.AddClassToUser(this.creatorId, this.createdClassId);
                 //this.router.navigate(['/profiles', this.creatorId]);
             });
        
    }

}