import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RawImageFacade} from '../../AbstractionLayer/RawImageFacade';
import {IFile} from '../../../utility/contracts/IFile';
import {AnnotationFacade} from '../../AbstractionLayer/AnnotationFacade';

@Component({
  selector: 'app-image-canvas',
  templateUrl: './image-canvas.component.html',
  styleUrls: ['./image-canvas.component.css']
})
export class ImageCanvasComponent implements OnInit {

  constructor(private annotationFacade: AnnotationFacade, private rawImageFacade: RawImageFacade) {
  }

  selectedFile: ImageSnippet;
  imgWidth = 1400;
  @ViewChild('test', {static: false}) pic: ElementRef;

  file: IFile;

  ngOnInit(): void {
    const reader = new FileReader();
    this.annotationFacade.currentAnnotationImage.subscribe(value => this.file = value);

    const image = new Image();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, this.file.file);
      image.src = event.target.result;
      image.onload = () => {
        const newRawImage = {
          id: this.file.id,
          file: this.file.file,
          width: image.width,
          height: image.height
        };
        this.rawImageFacade.updateRawImage(newRawImage);
        this.annotationFacade.changeCurrentAnnotationImage(newRawImage);
      };
    });

    reader.readAsDataURL(this.file.file);
  }

  mouseWheelUpFunc() {
    this.imgWidth = this.imgWidth + 20;
  }

  mouseWheelDownFunc() {
    this.imgWidth = this.imgWidth - 20;
  }
}

class ImageSnippet {
  constructor(public src: string, public file: File) {
  }
}
