import { Component, OnInit } from '@angular/core';
import { HTTPService } from 'src/app/services/http.service';
import { Class } from '../class.model';
//import { Explore } from '../explore.component';

@Component({
    selector: 'app-class-list',
    templateUrl: './class-list.component.html',
    styleUrls: ['./class-list.component.scss']
})
export class ClassListComponent implements OnInit{
    searchWord: string;
    fetchedClasses: any[] = [];
    classes: Class[] = [
        {
          classId: 'IFp1Metqu2ue7uXPjeJU',
          title: "Yoga with Demir!",
          createdBy: "Demir Mensah",
          description: "Beginner's yoga session. All you need is a yoga mat and some space around you!",
          category: "Yoga",
          price: "5",
          startDate: new Date().getTime(),
          endDate: (new Date().getTime() + 3600)
        },
        {
          classId: '124',
          title: "Weight with Arya!",
          createdBy: "Arya Vatan",
          description: "Weights session with Arya. Tiem to get big!",
          category: "Strength",
          price: "15",
          startDate: new Date().getTime(),
          endDate: (new Date().getTime() + 3600)
        }
      ];

      constructor(private httpService: HTTPService) {}

      ngOnInit() {
        this.httpService.getAllClasses().subscribe(classArray => {
            this.fetchedClasses = classArray;
            console.log(this.fetchedClasses);
          }); 
        }
}