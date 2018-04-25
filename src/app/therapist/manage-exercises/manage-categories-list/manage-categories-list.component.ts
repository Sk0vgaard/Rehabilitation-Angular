import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ExerciseModel} from '../../../client/shared/exercise.model';
import {Observable} from 'rxjs/Observable';
import {CategoryService} from '../../../shared/services/category.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'rehab-manage-categories-list',
  templateUrl: './manage-categories-list.component.html',
  styleUrls: ['./manage-categories-list.component.scss']
})
export class ManageCategoriesListComponent implements OnInit {
  @Output()
  categorySelected = new EventEmitter<ExerciseModel>();
  currentCategory: ExerciseModel;
  $categories: Observable<any[]>;
  closeResult: string;


  constructor(private categoryService: CategoryService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.$categories = this.categoryService.getCategories();
  }

  onCategorySelected(exercise: ExerciseModel) {
    this.categorySelected.emit(exercise);
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  addCategory(value: string) {
    console.log(value)
  }
}
