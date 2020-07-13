import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getAllCurrentCategoryLabels, LabelCategoryState} from '../CoreLayer';
import {Observable} from 'rxjs';
import {ICategory} from '../../utility/contracts/ICategory';

@Injectable()
export class LabelCategoryFacade {

  labelCategories$: Observable<ICategory[]>;

  constructor(private store: Store<LabelCategoryState>) {
    this.labelCategories$ = this.store.pipe(select(getAllCurrentCategoryLabels));
  }
}
