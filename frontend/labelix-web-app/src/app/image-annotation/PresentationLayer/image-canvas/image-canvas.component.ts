import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RawImageFacade} from '../../AbstractionLayer/RawImageFacade';
import {IFile} from '../../../utility/contracts/IFile';

@Component({
  selector: 'app-image-canvas',
  templateUrl: './image-canvas.component.html',
  styleUrls: ['./image-canvas.component.css']
})
export class ImageCanvasComponent implements OnInit {

  constructor(private facade: RawImageFacade) {
  }

  selectedFile: ImageSnippet;
  imgWidth = 1400;
  @ViewChild('test', { static: false }) pic: ElementRef;

  file: IFile;

  ngOnInit(): void {
    const reader = new FileReader();
    this.facade.files$.subscribe(value => this.file = value[0]);
    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, this.file.file);

    });

    reader.readAsDataURL(this.file.file);
  }

  mouseWheelUpFunc() {
    console.log(this.imgWidth);
    this.imgWidth = this.imgWidth + 20;
  }

  mouseWheelDownFunc() {
    console.log(this.imgWidth);
    this.imgWidth = this.imgWidth - 20;
  }
}

class ImageSnippet {
  constructor(public src: string, public file: File) {
  }
}
