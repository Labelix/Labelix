import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RawImageFacade} from '../../AbstractionLayer/RawImageFacade';
import {IFile} from '../../../utility/contracts/IFile';
import {AnnotationFacade} from '../../AbstractionLayer/AnnotationFacade';
import {fromEvent} from 'rxjs';
import {AnnotaionMode} from '../../CoreLayer/annotaionModeEnum';
import {ICategory} from '../../../utility/contracts/ICategory';
import {IImageAnnotation} from '../../../utility/contracts/IImageAnnotation';

@Component({
  selector: 'app-image-canvas',
  templateUrl: './image-canvas.component.html',
  styleUrls: ['./image-canvas.component.css']
})
export class ImageCanvasComponent implements OnInit, AfterViewInit {

  constructor(private annotationFacade: AnnotationFacade, private rawImageFacade: RawImageFacade) {
  }

  file: IFile;
  selectedFile: ImageSnippet;
  imgWidth = 1400;

  currentImageAnnotations: IImageAnnotation[];
  currentAnnotationMode: AnnotaionMode;
  currentlyDrawing = false;
  activeLabel: ICategory;

  private nextAnnotationId: number;
  private opacity = 0.25;

  @ViewChild('canvas') canvas: ElementRef;
  ctx: CanvasRenderingContext2D;

  ngOnInit(): void {
    const reader = new FileReader();

    this.annotationFacade.currentAnnotationImage.subscribe(value => this.file = value);
    this.annotationFacade.currentAnnotationMode.subscribe(value => this.currentAnnotationMode = value);
    this.annotationFacade.activeLabel.subscribe(value => this.activeLabel = value);
    this.annotationFacade.currentImageAnnotations.subscribe(value => {
      this.currentImageAnnotations = value;
    });
    this.annotationFacade.currentImageAnnotations.subscribe(value => {
      if (this.canvas !== undefined){
        this.drawExistingAnnotations(this.canvas.nativeElement, value);
      }
    });
    this.annotationFacade.numberOfCurrentImageAnnotations.subscribe(value => this.nextAnnotationId = value);

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

  ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.ctx = canvasEl.getContext('2d');
    this.ctx.lineWidth = 2;
    this.captureEvents(canvasEl);
  }

  captureEvents(canvasEl: HTMLCanvasElement) {

    const lastPos = {x: undefined, y: undefined};

    // TODO build in exception handling, when no label is selected
    fromEvent(canvasEl, 'mousedown').subscribe((value: MouseEvent) => {

      if (this.currentAnnotationMode === AnnotaionMode.BOUNDING_BOXES && this.activeLabel !== undefined) {
        lastPos.x = (value.clientX - canvasEl.getBoundingClientRect().left);
        lastPos.y = (value.clientY - canvasEl.getBoundingClientRect().top);
        this.currentlyDrawing = true;
      }
    });

    fromEvent(canvasEl, 'mousemove').subscribe((value: MouseEvent) => {

      if (this.currentAnnotationMode === AnnotaionMode.BOUNDING_BOXES
        && this.currentlyDrawing
        && this.activeLabel !== undefined) {

        this.setCanvasDimensions(canvasEl);

        this.drawExistingAnnotations(canvasEl, this.currentImageAnnotations);

        this.ctx.strokeStyle = this.activeLabel.colorCode;
        this.ctx.fillStyle = this.hexToRGB(this.activeLabel.colorCode, this.opacity);

        const width = ((value.clientX - canvasEl.getBoundingClientRect().left) - lastPos.x);
        const height = ((value.clientY - canvasEl.getBoundingClientRect().top) - lastPos.y);
        this.ctx.beginPath();
        this.ctx.fillRect(lastPos.x, lastPos.y, width, height);
        this.ctx.rect(lastPos.x, lastPos.y, width, height);
        this.ctx.stroke();
      }
    });

    fromEvent(canvasEl, 'mouseup').subscribe((value: MouseEvent) => {

      if (this.currentAnnotationMode === AnnotaionMode.BOUNDING_BOXES && this.activeLabel !== undefined) {
        this.currentlyDrawing = false;

        const tmpX = lastPos.x / canvasEl.width;
        const tmpY = lastPos.y / canvasEl.height;
        const tmpWidth = ((value.clientX - canvasEl.getBoundingClientRect().left) - lastPos.x) / canvasEl.width;
        const tmpHeight = ((value.clientY - canvasEl.getBoundingClientRect().top) - lastPos.y) / canvasEl.height;

        this.annotationFacade.addImageAnnotation({
          boundingBox: {
            width: tmpWidth * this.file.width,
            height: tmpHeight * this.file.height,
            xCoordinate: tmpX * this.file.width,
            yCoordinate: tmpY * this.file.height
          },
          segmentations: [],
          isCrowd: false,
          image: this.file,
          id: this.nextAnnotationId,
          categoryLabel: this.activeLabel,
          area: -1,
          annotationMode: AnnotaionMode.BOUNDING_BOXES
        });
      }
    });
  }

  setCanvasDimensions(canvasEl: HTMLCanvasElement) {
    canvasEl.height = canvasEl.getBoundingClientRect().bottom - canvasEl.getBoundingClientRect().top;
    canvasEl.width = canvasEl.getBoundingClientRect().right - canvasEl.getBoundingClientRect().left;
  }

  drawExistingAnnotations(canvasEl: HTMLCanvasElement, elements) {
    this.setCanvasDimensions(canvasEl);
    // this.ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

    console.log(this.currentImageAnnotations.length);

    for (const item of elements) {
      if (item.annotationMode === AnnotaionMode.BOUNDING_BOXES) {
        this.ctx.strokeStyle = item.categoryLabel.colorCode;
        this.ctx.fillStyle = this.hexToRGB(item.categoryLabel.colorCode, this.opacity);

        this.ctx.beginPath();
        this.ctx.fillRect(
          item.boundingBox.xCoordinate / this.file.width * canvasEl.width,
          item.boundingBox.yCoordinate / this.file.height * canvasEl.height,
          item.boundingBox.width / this.file.width * canvasEl.width,
          item.boundingBox.height / this.file.height * canvasEl.height
        );
        this.ctx.rect(
          item.boundingBox.xCoordinate / this.file.width * canvasEl.width,
          item.boundingBox.yCoordinate / this.file.height * canvasEl.height,
          item.boundingBox.width / this.file.width * canvasEl.width,
          item.boundingBox.height / this.file.height * canvasEl.height
        );
        this.ctx.stroke();
      }
    }
  }

  hexToRGB(hex, alpha): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    } else {
      return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }
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
