import {ICategory} from '../contracts/ICategory';

export class Category implements ICategory {
  colorCode: string;
  id: number;
  name: string;
  supercategory: string;

  constructor() {

  }

  copyProperties(other: ICategory) {
    if (other !== undefined) {
      this.id = other.id;
      this.colorCode = other.colorCode;
      this.name = other.name;
      this.supercategory = other.supercategory;
    }
  }
}
