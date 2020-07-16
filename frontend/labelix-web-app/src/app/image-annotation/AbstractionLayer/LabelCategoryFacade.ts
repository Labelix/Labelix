import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {
  getAllCurrentCategoryLabels,
  getNumberOfExistingLabels,
  LabelCategoryState
} from '../CoreLayer/states/labelCategoryState';
import {Observable} from 'rxjs';
import {ICategory} from '../../utility/contracts/ICategory';
import {AddAnnotationLabel} from '../CoreLayer/actions/image-annotation.actions';

@Injectable()
export class LabelCategoryFacade {

  labelCategories$: Observable<ICategory[]>;
  numberOfExistingLabels$: Observable<number>;

  constructor(private store: Store<LabelCategoryState>) {
    this.labelCategories$ = this.store.pipe(select(getAllCurrentCategoryLabels));
    this.numberOfExistingLabels$ = this.store.pipe(select(getNumberOfExistingLabels));
  }

  addLabelCategory(input: ICategory){
    this.store.dispatch(new AddAnnotationLabel(input));
  }
}
