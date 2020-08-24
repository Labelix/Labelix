import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {RawImageFacade} from '../../AbstractionLayer/RawImageFacade';
import {IFile} from '../../../utility/contracts/IFile';
import {AnnotationFacade} from '../../AbstractionLayer/AnnotationFacade';
import {fromEvent} from 'rxjs';
import {AnnotaionMode} from '../../CoreLayer/annotaionModeEnum';
import {ICategory} from '../../../utility/contracts/ICategory';
import {IImageAnnotation} from '../../../utility/contracts/IImageAnnotation';
import {
  drawExistingAnnotationsBoundingBoxes,
  onMouseDownBoundingBoxen,
  onMouseMoveBoundingBoxen,
  onMouseUpBoundingBoxen
} from './drawing-logic/boundingBoxLogic';
import {hexToRGB, setCanvasDimensions} from './drawing-logic/drawingUtilLogic';
import {
  drawExistingPolygonAnnotations,
  drawPointsOfPolygonAnnotation, fillExistingPolygonAnnotations, fillShape,
  onMouseDownPolygon, onMouseMovePolygon, onMouseUpPolygon
} from './drawing-logic/polygonLogic';

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

  activeAnnotation: IImageAnnotation;

  private nextAnnotationId: number;
  private opacity = 0.25;
  dragable = true;

  annotationDragging = false;
  mousePositions: { x: number, y: number }[] = [];

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
    this.annotationFacade.activePolygonAnnotation.subscribe(value => this.activeAnnotation = value);
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
      setCanvasDimensions(canvasEl);
      drawExistingAnnotationsBoundingBoxes(canvasEl, this.currentImageAnnotations, this.ctx, this.activeRawImage, this.opacity);
      drawExistingPolygonAnnotations(canvasEl, this.currentImageAnnotations, this.activeRawImage, this.currentlyDrawing, this.ctx);
      fillExistingPolygonAnnotations(canvasEl, this.currentImageAnnotations, this.activeRawImage, this.ctx, this.opacity);
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
        setCanvasDimensions(canvasEl);
        drawExistingAnnotationsBoundingBoxes(canvasEl, this.currentImageAnnotations, this.ctx, this.activeRawImage, this.opacity);
        drawExistingPolygonAnnotations(canvasEl, this.currentImageAnnotations, this.activeRawImage, this.currentlyDrawing, this.ctx);
        if (this.currentAnnotationMode === AnnotaionMode.BOUNDING_BOXES) {
          onMouseDownBoundingBoxen(lastPos, value, canvasEl);
        } else if (this.currentAnnotationMode === AnnotaionMode.POLYGON) {
          onMouseDownPolygon(lastPos, value, canvasEl, this.activeAnnotation,
            this.annotationFacade, this.activeRawImage, this.nextAnnotationId, this.activeLabel);
        } else if (this.currentAnnotationMode === AnnotaionMode.SIZING_TOOL) {
          this.onMouseDownSizingTool(value, canvasEl);
        }
      }
    });

    fromEvent(canvasEl, 'mousemove').subscribe((value: MouseEvent) => {

      if (this.currentlyDrawing && this.activeLabel !== undefined) {
        setCanvasDimensions(canvasEl);
        drawExistingAnnotationsBoundingBoxes(canvasEl, this.currentImageAnnotations, this.ctx, this.activeRawImage, this.opacity);
        drawExistingPolygonAnnotations(canvasEl, this.currentImageAnnotations, this.activeRawImage, this.currentlyDrawing, this.ctx);
        if (this.currentAnnotationMode === AnnotaionMode.BOUNDING_BOXES) {
          onMouseMoveBoundingBoxen(lastPos, value, canvasEl, this.ctx, this.activeLabel, this.opacity);
        } else if (this.currentAnnotationMode === AnnotaionMode.POLYGON) {
          onMouseMovePolygon(lastPos, value, canvasEl,
            this.ctx, this.activeAnnotation, this.currentImageAnnotations,
            this.activeRawImage, this.activeLabel, this.currentlyDrawing);
        } else if (this.currentAnnotationMode === AnnotaionMode.SIZING_TOOL && this.annotationDragging) {
          const currentMousePositionX = value.clientX - canvasEl.getBoundingClientRect().left;
          const currentMousePositionY = value.clientY - canvasEl.getBoundingClientRect().top;
          if (this.mousePositions.length === 0) {
            this.mousePositions.push({
              x: currentMousePositionX,
              y: currentMousePositionY
            });
          } else {
            this.annotationFacade.updateImageAnnotation({
              id: this.activeAnnotation.id,
              annotationMode: this.activeAnnotation.annotationMode,
              boundingBox: {
                xCoordinate: this.activeAnnotation.boundingBox.xCoordinate
                  + ((currentMousePositionX - this.mousePositions[this.mousePositions.length - 1].x)
                    / canvasEl.width * this.activeRawImage.width),
                yCoordinate: this.activeAnnotation.boundingBox.yCoordinate
                  + ((currentMousePositionY - this.mousePositions[this.mousePositions.length - 1].y)
                    / canvasEl.height * this.activeRawImage.height),
                height: this.activeAnnotation.boundingBox.height,
                width: this.activeAnnotation.boundingBox.width
              },
              isCrowd: this.activeAnnotation.isCrowd,
              area: this.activeAnnotation.area,
              segmentations: this.activeAnnotation.segmentations,
              categoryLabel: this.activeAnnotation.categoryLabel,
              image: this.activeAnnotation.image
            });
            this.mousePositions.push({
              x: currentMousePositionX,
              y: currentMousePositionY
            });
          }
        }
      }
    });

    fromEvent(canvasEl, 'mouseup').subscribe((value: MouseEvent) => {

      if (this.activeLabel !== undefined) {
        this.currentlyDrawing = false;

        if (this.currentAnnotationMode === AnnotaionMode.BOUNDING_BOXES) {
          onMouseUpBoundingBoxen(lastPos, value, canvasEl, this.annotationFacade,
            this.activeRawImage, this.nextAnnotationId, this.activeLabel);

        } else if (this.currentAnnotationMode === AnnotaionMode.POLYGON) {
          onMouseUpPolygon(lastPos, value, canvasEl, this.currentImageAnnotations, this.annotationFacade);
          drawExistingPolygonAnnotations(canvasEl, this.currentImageAnnotations, this.activeRawImage, this.currentlyDrawing, this.ctx);
          fillExistingPolygonAnnotations(canvasEl, this.currentImageAnnotations, this.activeRawImage, this.ctx, this.opacity);

          drawPointsOfPolygonAnnotation(canvasEl, this.activeAnnotation, this.ctx, this.currentlyDrawing);
          fillShape(canvasEl, this.activeAnnotation, this.ctx, this.opacity);

        } else if (this.currentAnnotationMode === AnnotaionMode.SIZING_TOOL) {
          this.annotationDragging = false;
          this.mousePositions = [];
        }
      }
    });
  }

  onMouseDownSizingTool(value: MouseEvent, canvasEl: HTMLCanvasElement) {
    for (const item of this.currentImageAnnotations) {
      if (item.annotationMode === AnnotaionMode.BOUNDING_BOXES &&
        item.boundingBox.xCoordinate / this.activeRawImage.width * canvasEl.width <= value.clientX
        - canvasEl.getBoundingClientRect().left
        && item.boundingBox.xCoordinate / this.activeRawImage.width * canvasEl.width
        + item.boundingBox.width / this.activeRawImage.width * canvasEl.width > value.clientX
        - canvasEl.getBoundingClientRect().left
        && item.boundingBox.yCoordinate / this.activeRawImage.height * canvasEl.height <= value.clientY
        - canvasEl.getBoundingClientRect().top
        && item.boundingBox.yCoordinate / this.activeRawImage.height * canvasEl.height
        + item.boundingBox.height / this.activeRawImage.height * canvasEl.height > value.clientY
        - canvasEl.getBoundingClientRect().top) {
        this.annotationFacade.setActivePolygonAnnotation(item);
        this.annotationDragging = true;
      }
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
      if (this.activeAnnotation !== undefined && this.currentAnnotationMode === AnnotaionMode.POLYGON) {
        this.annotationFacade.addImageAnnotation(this.activeAnnotation);
      }
      this.annotationFacade.setActivePolygonAnnotation(undefined);
    }
  }

  // for canvas zooming
  mouseWheelUpFunc() {
    this.imgWidth = this.imgWidth + 20;
  }

  mouseWheelDownFunc() {
    this.imgWidth = this.imgWidth - 20;
  }
}
