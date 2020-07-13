import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IFile} from '../../../utility/contracts/IFile';
import {RawImageFacade} from '../../AbstractionLayer/RawImageFacade';
import {Router} from '@angular/router';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  constructor(private facade: RawImageFacade, private router: Router) {
  }

  @ViewChild('fileDropRef', {static: false}) fileDropEl: ElementRef;

  listOfFiles: IFile[];
  nums: number;

  ngOnInit(): void {
    this.facade.numberOfImages$.subscribe(value => this.nums = value);
    this.facade.files$.subscribe(value => this.listOfFiles = value);
  }

  onFileDropped($event) {
    const tmp: IFile[] = [];

    for (const item of $event) {
      console.log(item.name);
      tmp.push({id: this.nums, file: item});
    }
    this.facade.uploadRawImages(tmp);
    this.router.navigate(['image-annotation/image-view']);
  }

}
