import { Component, OnInit } from '@angular/core';
import {RawImageFacade} from '../../AbstractionLayer/RawImageFacade';
import {IFile} from '../../../utility/contracts/IFile';

@Component({
  selector: 'app-image-canvas',
  templateUrl: './image-canvas.component.html',
  styleUrls: ['./image-canvas.component.css']
})
export class ImageCanvasComponent implements OnInit {

  constructor(private facade: RawImageFacade) { }

  selectedFile: ImageSnippet;

  file: IFile;

  ngOnInit(): void {
    const reader = new FileReader();
    this.facade.files$.subscribe(value => this.file = value[0]);
    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, this.file.file);

    });

    reader.readAsDataURL(this.file.file);
  }

}

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
