import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  OnInit
} from '@angular/core';
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

  constructor(private annotationFacade: AnnotationFacade,
              private rawImageFacade: RawImageFacade) {
  }

  activeRawImage: IFile;
  imgWidth = 1400;

  currentImageAnnotations: IImageAnnotation[];
  currentAnnotationMode: AnnotaionMode;
  currentlyDrawing = false;
  activeLabel: ICategory;

  activePolygonAnnotation: IImageAnnotation;

  private nextAnnotationId: number;
  private opacity = 0.25;
  dragable = true;

  @ViewChild('canvas') canvas: ElementRef;
  ctx: CanvasRenderingContext2D;

  ngOnInit(): void {
    this.annotationFacade.currentAnnotationImage.subscribe(value => {
      this.activeRawImage = value;
      this.readDataFromRawImage();
      this.redrawCanvas();
    });
    this.annotationFacade.currentAnnotationMode.subscribe(value => this.currentAnnotationMode = value);
    this.annotationFacade.activeLabel.subscribe(value => this.activeLabel = value);
    this.annotationFacade.activePolygonAnnotation.subscribe(value => this.activePolygonAnnotation = value);
    this.annotationFacade.currentImageAnnotations.subscribe(value => {
      this.currentImageAnnotations = value;
    });
    this.annotationFacade.currentImageAnnotations.subscribe(value => {
      this.readDataFromRawImage();
      this.redrawCanvas();
    });
    this.annotationFacade.numberOfCurrentImageAnnotations.subscribe(value => this.nextAnnotationId = value);
    this.readDataFromRawImage();
  }

  readDataFromRawImage() {
    if (this.activeRawImage.height === -1
      || this.activeRawImage.width === -1
      || this.activeRawImage.base64Url === '') {
      const reader = new FileReader();
      const image = new Image();
      reader.addEventListener('load', (event: any) => {
        image.src = event.target.result;
        image.onload = () => {
          const newRawImage = {
            id: this.activeRawImage.id,
            file: this.activeRawImage.file,
            width: image.width,
            height: image.height,
            base64Url: image.src
          };
          this.rawImageFacade.updateRawImage(newRawImage);
          this.annotationFacade.changeCurrentAnnotationImage(newRawImage);
        };
      });
      reader.readAsDataURL(this.activeRawImage.file);
    }
  }

  private redrawCanvas() {
    if (this.canvas !== undefined) {
      const canvasEl = this.canvas.nativeElement;
      this.setCanvasDimensions(canvasEl);
      this.drawExistingAnnotationsBoundingBoxes(canvasEl, this.currentImageAnnotations);
      this.drawExistingPolygonAnnotations(canvasEl);
      this.fillExistingPolygonAnnotations(canvasEl);
    }
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

      if (this.activeLabel !== undefined) {
        this.currentlyDrawing = true;
        this.setCanvasDimensions(canvasEl);
        if (this.currentAnnotationMode === AnnotaionMode.BOUNDING_BOXES) {
          this.onMouseDownBoundingBoxen(lastPos, value, canvasEl);
        } else if (this.currentAnnotationMode === AnnotaionMode.POLYGON) {
          this.onMouseDownPolygon(lastPos, value, canvasEl);
        }
      }
    });

    fromEvent(canvasEl, 'mousemove').subscribe((value: MouseEvent) => {

      if (this.currentlyDrawing && this.activeLabel !== undefined) {
        this.setCanvasDimensions(canvasEl);
        this.drawExistingAnnotationsBoundingBoxes(canvasEl, this.currentImageAnnotations);
        this.drawExistingPolygonAnnotations(canvasEl);
        if (this.currentAnnotationMode === AnnotaionMode.BOUNDING_BOXES) {
          this.onMouseMoveBoundingBoxen(lastPos, value, canvasEl);
        } else if (this.currentAnnotationMode === AnnotaionMode.POLYGON) {
          this.onMouseMovePolygon(lastPos, value, canvasEl);
        }
      }
    });

    fromEvent(canvasEl, 'mouseup').subscribe((value: MouseEvent) => {

      if (this.activeLabel !== undefined) {
        this.currentlyDrawing = false;
        if (this.currentAnnotationMode === AnnotaionMode.BOUNDING_BOXES) {
          this.onMouseUpBoundingBoxen(lastPos, value, canvasEl);
        } else if (this.currentAnnotationMode === AnnotaionMode.POLYGON) {
          this.onMouseUpPolygon(lastPos, value, canvasEl);
        }
      }
    });
  }

  onMouseDownBoundingBoxen(lastPos, value: MouseEvent, canvasEl: HTMLCanvasElement) {
    lastPos.x = (value.clientX - canvasEl.getBoundingClientRect().left);
    lastPos.y = (value.clientY - canvasEl.getBoundingClientRect().top);
  }

  onMouseMoveBoundingBoxen(lastPos, value: MouseEvent, canvasEl: HTMLCanvasElement) {
    this.ctx.strokeStyle = this.activeLabel.colorCode;
    this.ctx.fillStyle = this.hexToRGB(this.activeLabel.colorCode, this.opacity);

    const width = ((value.clientX - canvasEl.getBoundingClientRect().left) - lastPos.x);
    const height = ((value.clientY - canvasEl.getBoundingClientRect().top) - lastPos.y);
    this.ctx.beginPath();
    this.ctx.fillRect(lastPos.x, lastPos.y, width, height);
    this.ctx.rect(lastPos.x, lastPos.y, width, height);
    this.ctx.stroke();
  }

  onMouseUpBoundingBoxen(lastPos, value: MouseEvent, canvasEl: HTMLCanvasElement) {
    const tmpX = lastPos.x / canvasEl.width;
    const tmpY = lastPos.y / canvasEl.height;
    const tmpWidth = ((value.clientX - canvasEl.getBoundingClientRect().left) - lastPos.x) / canvasEl.width;
    const tmpHeight = ((value.clientY - canvasEl.getBoundingClientRect().top) - lastPos.y) / canvasEl.height;

    this.annotationFacade.addImageAnnotation({
      boundingBox: {
        width: tmpWidth * this.activeRawImage.width,
        height: tmpHeight * this.activeRawImage.height,
        xCoordinate: tmpX * this.activeRawImage.width,
        yCoordinate: tmpY * this.activeRawImage.height
      },
      segmentations: [],
      isCrowd: false,
      image: this.activeRawImage,
      id: this.nextAnnotationId,
      categoryLabel: this.activeLabel,
      area: -1,
      annotationMode: AnnotaionMode.BOUNDING_BOXES
    });
  }

  onMouseDownPolygon(lasPos, value: MouseEvent, canvasEl: HTMLCanvasElement) {
    if (this.activePolygonAnnotation === undefined) {
      this.annotationFacade.setActivePolygonAnnotation({
        annotationMode: AnnotaionMode.POLYGON,
        segmentations: [
          (value.clientX - canvasEl.getBoundingClientRect().left) / canvasEl.width,
          (value.clientY - canvasEl.getBoundingClientRect().top) / canvasEl.height
        ],
        isCrowd: false,
        image: this.activeRawImage,
        area: -1,
        boundingBox: undefined,
        categoryLabel: this.activeLabel,
        id: this.nextAnnotationId
      });
    }
  }

  onMouseMovePolygon(lastPos, value: MouseEvent, canvasEl: HTMLCanvasElement) {

    this.ctx.strokeStyle = this.activeLabel.colorCode;

    this.drawExistingPolygonAnnotations(canvasEl);

    if (this.activePolygonAnnotation !== undefined) {
      this.drawPointsOfPolygonAnnoation(canvasEl, this.activePolygonAnnotation);
      this.ctx.beginPath();
      this.ctx.moveTo(this.activePolygonAnnotation.segmentations[this.activePolygonAnnotation.segmentations.length - 2]
        * canvasEl.width,
        this.activePolygonAnnotation.segmentations[this.activePolygonAnnotation.segmentations.length - 1]
        * canvasEl.height);
      this.ctx.lineTo((value.clientX - canvasEl.getBoundingClientRect().left),
        (value.clientY - canvasEl.getBoundingClientRect().top));
      this.ctx.stroke();
    }
  }

  onMouseUpPolygon(lastPos, value: MouseEvent, canvasEl: HTMLCanvasElement) {
    this.annotationFacade.addPointsToActivePolygonAnnotation({
      x: (value.clientX - canvasEl.getBoundingClientRect().left) / canvasEl.width,
      y: (value.clientY - canvasEl.getBoundingClientRect().top) / canvasEl.height
    });

    this.drawExistingPolygonAnnotations(canvasEl);
    this.fillExistingPolygonAnnotations(canvasEl);
    this.drawPointsOfPolygonAnnoation(canvasEl, this.activePolygonAnnotation);
    this.fillShape(canvasEl, this.activePolygonAnnotation);
  }

  setCanvasDimensions(canvasEl: HTMLCanvasElement) {
    canvasEl.height = canvasEl.getBoundingClientRect().bottom - canvasEl.getBoundingClientRect().top;
    canvasEl.width = canvasEl.getBoundingClientRect().right - canvasEl.getBoundingClientRect().left;
  }

  drawExistingPolygonAnnotations(canvasEl: HTMLCanvasElement) {
    for (const item of this.currentImageAnnotations) {
      if (item.annotationMode === AnnotaionMode.POLYGON
        && item.image.id === this.activeRawImage.id) {
        this.drawPointsOfPolygonAnnoation(canvasEl, item);
      }
    }
  }

  fillExistingPolygonAnnotations(canvasEl: HTMLCanvasElement) {
    for (const item of this.currentImageAnnotations) {
      if (item.annotationMode === AnnotaionMode.POLYGON
        && item.image.id === this.activeRawImage.id) {
        this.fillShape(canvasEl, item);
      }
    }
  }

  drawExistingAnnotationsBoundingBoxes(canvasEl: HTMLCanvasElement, elements) {
    this.setCanvasDimensions(canvasEl);

    console.log(this.currentImageAnnotations.length);

    for (const item of elements) {
      if (item.annotationMode === AnnotaionMode.BOUNDING_BOXES
        && item.image.id === this.activeRawImage.id) {
        this.ctx.strokeStyle = item.categoryLabel.colorCode;
        this.ctx.fillStyle = this.hexToRGB(item.categoryLabel.colorCode, this.opacity);

        this.ctx.beginPath();
        this.ctx.fillRect(
          item.boundingBox.xCoordinate / this.activeRawImage.width * canvasEl.width,
          item.boundingBox.yCoordinate / this.activeRawImage.height * canvasEl.height,
          item.boundingBox.width / this.activeRawImage.width * canvasEl.width,
          item.boundingBox.height / this.activeRawImage.height * canvasEl.height
        );
        this.ctx.rect(
          item.boundingBox.xCoordinate / this.activeRawImage.width * canvasEl.width,
          item.boundingBox.yCoordinate / this.activeRawImage.height * canvasEl.height,
          item.boundingBox.width / this.activeRawImage.width * canvasEl.width,
          item.boundingBox.height / this.activeRawImage.height * canvasEl.height
        );
        this.ctx.stroke();
      }
    }
  }

  fillShape(canvasEl: HTMLCanvasElement, annotation: IImageAnnotation) {

    if (annotation.segmentations.length > 0) {
      this.ctx.fillStyle = this.hexToRGB(annotation.categoryLabel.colorCode, this.opacity);
      this.ctx.beginPath();
      this.ctx.moveTo(annotation.segmentations[0] * canvasEl.width, annotation.segmentations[1] * canvasEl.height);
      for (let i = 2; i <= annotation.segmentations.length; i += 2) {
        this.ctx.lineTo(annotation.segmentations[i - 2] * canvasEl.width, annotation.segmentations[i - 1] * canvasEl.height);
      }
      this.ctx.fill();
    }
  }

  drawPointsOfPolygonAnnoation(canvasEl: HTMLCanvasElement, annotation: IImageAnnotation) {
    this.ctx.strokeStyle = annotation.categoryLabel.colorCode;
    for (let i = 2; i <= annotation.segmentations.length; i += 2) {
      this.ctx.beginPath();
      if (i === 2) {
        this.ctx.moveTo(annotation.segmentations[i - 2] * canvasEl.width, annotation.segmentations[i - 1] * canvasEl.height);
      }
      if (i + 2 <= annotation.segmentations.length) {
        this.ctx.lineTo(annotation.segmentations[i - 2] * canvasEl.width, annotation.segmentations[i - 1] * canvasEl.height);
        this.ctx.lineTo(annotation.segmentations[i] * canvasEl.width, annotation.segmentations[i + 1] * canvasEl.height);
      } else if (this.currentlyDrawing === false) {
        this.ctx.lineTo(annotation.segmentations[i - 2] * canvasEl.width, annotation.segmentations[i - 1] * canvasEl.height);
        this.ctx.lineTo(annotation.segmentations[0] * canvasEl.width, annotation.segmentations[1] * canvasEl.height);
      }
      this.ctx.fill();
      this.ctx.stroke();
    }
  }

  canvasKeyUp(event: KeyboardEvent) {
    this.dragable = !event.ctrlKey;
  }

  canvasKeyDown(event: KeyboardEvent) {
    this.dragable = !event.ctrlKey;
  }

  @HostListener('window:keyup', ['$event'])
  keyUpEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (this.activePolygonAnnotation !== undefined) {
        this.annotationFacade.addImageAnnotation(this.activePolygonAnnotation);
      }
      this.annotationFacade.setActivePolygonAnnotation(undefined);
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
