import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {
  getAllCurrentCategoryLabels, getNextLabelId,
  getNumberOfExistingLabels,
  LabelCategoryState
} from '../CoreLayer/states/labelCategoryState';
import {Observable} from 'rxjs';
import {ICategory} from '../../utility/contracts/ICategory';
import {AddAnnotationLabel, DeleteCategory, ResetCategoryLabelState, UpdateCategory} from '../CoreLayer/actions/image-annotation.actions';

@Injectable()
export class LabelCategoryFacade {

  labelCategories$: Observable<ICategory[]>;
  numberOfExistingLabels$: Observable<number>;
  nextLabelId$: Observable<number>;

  constructor(private store: Store<LabelCategoryState>) {
    this.labelCategories$ = this.store.pipe(select(getAllCurrentCategoryLabels));
    this.numberOfExistingLabels$ = this.store.pipe(select(getNumberOfExistingLabels));
    this.nextLabelId$ = this.store.pipe(select(getNextLabelId));
  }

  addLabelCategory(input: ICategory) {
    this.store.dispatch(new AddAnnotationLabel(input));
  }

  resetCategoryLabelState() {
    this.store.dispatch(new ResetCategoryLabelState());
  }

  updateCategory(input: ICategory) {
    this.store.dispatch(new UpdateCategory(input));
  }

  deleteCategory(input: number) {
    this.store.dispatch(new DeleteCategory(input));
  }
}
