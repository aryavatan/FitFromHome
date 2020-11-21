import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Class } from '../explore/class.model';
import { HTTPService } from '../services/http.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {
  // id of class clicked
  selectedId;
  // holds info of class being fetched
  classData: Class;

  constructor(private route: ActivatedRoute, private http: HTTPService) {
    if (this.route.snapshot.params['id']) {
      this.selectedId = this.route.snapshot.paramMap.get('id');
    }
   }

  ngOnInit() {
    this.http.getClass(this.selectedId).subscribe(response => {
      const fetchedClass: Class = {
        classId: response.fetchedClass.id,
        title: response.fetchedClass.title,
        createdBy: response.fetchedClass.createdBy,
        description: response.fetchedClass.description,
        category: response.fetchedClass.category,
        price: response.fetchedClass.price,
        startDate: response.fetchedClass.startDate,
        endDate: response.fetchedClass.endDate
      }
      this.classData = fetchedClass;
      console.log(this.classData)
    });
  }

}
