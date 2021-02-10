import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {RawImageFacade} from '../../../abstraction-layer/RawImageFacade';
import {IRawImage} from '../../../core-layer/contracts/IRawImage';
import {AnnotationFacade} from '../../../abstraction-layer/AnnotationFacade';
import {fromEvent, Observable, Subscription} from 'rxjs';
import {AnnotationMode} from '../../../core-layer/utility/annotaionModeEnum';
import {ICategory} from '../../../core-layer/contracts/ICategory';
import {IImageAnnotation} from '../../../core-layer/contracts/IImageAnnotation';
import {
  drawExistingAnnotationsBoundingBoxes,
  onMouseDownBoundingBoxen,
  onMouseMoveBoundingBoxen,
  onMouseUpBoundingBoxen
} from './drawing-logic/boundingBoxLogic';
import {setCanvasDimensions} from './drawing-logic/drawingUtilLogic';
import {
  drawExistingPolygonAnnotations,
  drawPointsOfPolygonAnnotation,
  fillExistingPolygonAnnotations,
  fillShape,
  onMouseDownPolygon,
  onMouseMovePolygon,
  onMouseUpPolygon
} from './drawing-logic/polygonLogic';
import {onMouseDownSizingTool, onMouseMoveSizingTool} from './drawing-logic/editingLogic';
import {LabelCategoryFacade} from '../../../abstraction-layer/LabelCategoryFacade';
import {IProject} from '../../../core-layer/contracts/IProject';
import {CocoFormatHelper} from '../../../core-layer/utility/helper/coco-format-helper.service';
import {ComponentCanDeactivate} from '../../../core-layer/guard/PendingChangesGuard';

@Component({
  selector: 'app-image-canvas',
  templateUrl: './image-canvas.component.html',
  styleUrls: ['./image-canvas.component.css']
})

export class ImageCanvasComponent implements ComponentCanDeactivate, OnInit, AfterViewInit, OnDestroy {

  constructor(private annotationFacade: AnnotationFacade,
              private rawImageFacade: RawImageFacade,
              private categoryLabelFacade: LabelCategoryFacade,
              private cocoController: CocoFormatHelper) {
    this.subscription = new Subscription();
  }

  subscription: Subscription;


  // start with of 1400px fits the resolution of full hd best (maybe build a dynamic system later)
  imgWidth = 1400;
  imagePosX = 0;
  imagePosY = 0;

  // specifies if the image can be dragged around on the screen (by pressing ctrl)
  draggable = true;

  // drawing helper variables
  private currentlyDrawing = false;
  private nextAnnotationId: number;
  private opacity = 0.5;
  private mousePositions: { x: number, y: number }[] = [];

  // state data placeholders
  private currentImageAnnotations: IImageAnnotation[];
  private currentAnnotationMode: AnnotationMode;
  private activeLabel: ICategory;
  rawImages: IRawImage[];
  private categories: ICategory[];
  activeRawImage: IRawImage;
  private activeAnnotation: IImageAnnotation;
  private activeProject: IProject;
  // for zooming
  repositioning = 40;


  // specifies the several different modes, when the resizing tool is used
  editingOptions: EditingOption = {
    addBottom: false,
    addLeft: false,
    addRight: false,
    addTop: false,
    annotationDragging: false,
    movePolygon: false,
    polygonIndex: -1
  };

  @ViewChild('canvas') canvas: ElementRef;
  ctx: CanvasRenderingContext2D;

  ngOnInit(): void {
    this.annotationFacade.changesPresent = false;
    this.subscription.add(this.rawImageFacade.rawImages$.subscribe(value => {
      this.rawImages = value;
      this.setAnnotationsFromCoco();
    }));

    this.subscription.add(this.annotationFacade.activeProject.subscribe(value => {
      this.activeProject = value;
      this.setAnnotationsFromCoco();
    }));

    this.subscription.add(this.categoryLabelFacade.labelCategories$.subscribe(value => this.categories = value));

    this.subscription.add(this.annotationFacade.currentAnnotationImage.subscribe(value => {
      if (value !== undefined) {
        this.activeRawImage = value;
        this.readDataFromRawImage();
        this.redrawCanvas();
      }
    }));

    this.subscription.add(this.annotationFacade.currentImageAnnotations.subscribe(value => {
      this.currentImageAnnotations = value;
      this.readDataFromRawImage();
      this.redrawCanvas();
    }));

    this.subscription.add(this.annotationFacade.activeLabel.subscribe(value => this.activeLabel = value));
    this.subscription.add(this.annotationFacade.activePolygonAnnotation.subscribe(value => this.activeAnnotation = value));
    this.subscription.add(this.annotationFacade.currentAnnotationMode.subscribe(value => this.currentAnnotationMode = value));
    this.subscription.add(this.annotationFacade.numberOfCurrentImageAnnotations.subscribe(value => this.nextAnnotationId = value));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.categoryLabelFacade.resetCategoryLabelState();
    this.rawImageFacade.clearRawImagesOnState();
  }

  // reads height and width of the images and saves it into the object
  readDataFromRawImage() {
    if (this.activeRawImage !== undefined) {
      if (this.activeRawImage.height === -1 || this.activeRawImage.width === -1) {
        this.activeRawImage.file !== undefined ? this.getDimensionsOfUploadedImage() : this.getDimensionsOfBase64();
      }
    }
  }

  setAnnotationsFromCoco() {
    if (this.activeProject !== undefined
      && this.activeProject.cocoExport !== undefined
      && this.categories !== undefined
      && this.categories.length > 0
      && this.rawImages.length > 0) {
      this.cocoController.getAnnotationsFromCocoFormat(this.activeProject.cocoExport, this.rawImages, this.categories)
        .forEach(annotation => this.annotationFacade.addImageAnnotation(annotation));
    }
  }

  getDimensionsOfUploadedImage() {
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
          base64Url: image.src,
          name: this.activeRawImage.file.name
        };
        this.rawImageFacade.updateRawImagesOnState(newRawImage);
        this.annotationFacade.changeCurrentAnnotationImage(newRawImage);
      };
    });
    reader.readAsDataURL(this.activeRawImage.file);
  }

  getDimensionsOfBase64() {
    const image = new Image();
    image.src = this.activeRawImage.base64Url;
    image.addEventListener('load', () => {
      const newRawImage = {
        id: this.activeRawImage.id,
        file: this.activeRawImage.file,
        width: image.width,
        height: image.height,
        base64Url: image.src,
        name: this.activeRawImage.name
      };
      this.rawImageFacade.updateRawImagesOnState(newRawImage);
      this.annotationFacade.changeCurrentAnnotationImage(newRawImage);
    });
  }

  checkInBound(mousePos: number, boxBoundary: number, actualBoundingBoxSize: number): boolean {
    return boxBoundary <= mousePos && boxBoundary + actualBoundingBoxSize >= mousePos;
  }

// hier ist jehweils immer die Breite oder die Höhe bei rawImageValue und canvasValue anzugeben
  getActualScale(value, rawImageValue, canvasValue): number {
    return value / rawImageValue * canvasValue;
  }

  private redrawCanvas() {

    if (this.canvas !== undefined) {

      const canvasEl = this.canvas.nativeElement;

      setCanvasDimensions(canvasEl);

      drawExistingAnnotationsBoundingBoxes(canvasEl, this.currentImageAnnotations, this.ctx, this.activeRawImage, this.opacity);

      drawExistingPolygonAnnotations(canvasEl, this.currentImageAnnotations, this.activeRawImage, this.currentlyDrawing, this.ctx);
      fillExistingPolygonAnnotations(canvasEl, this.currentImageAnnotations, this.activeRawImage, this.ctx, this.opacity);

      if (this.activeAnnotation !== undefined) {
        drawPointsOfPolygonAnnotation(canvasEl, this.activeAnnotation, this.ctx, this.currentlyDrawing,
          (this.currentImageAnnotations.indexOf(this.activeAnnotation) + 1  !== 0
            ? (this.currentImageAnnotations.indexOf(this.activeAnnotation) + 1)
            : '') + ': ' + this.activeAnnotation.categoryLabel.name);
        fillShape(canvasEl, this.activeAnnotation, this.ctx, this.opacity);
      }
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
    this.annotationFacade.changesPresent = true;

    fromEvent(canvasEl, 'mousedown').subscribe((value: MouseEvent) => {
      if (this.activeLabel !== undefined && this.activeRawImage !== undefined) {
        this.currentlyDrawing = true;

        setCanvasDimensions(canvasEl);
        drawExistingAnnotationsBoundingBoxes(canvasEl, this.currentImageAnnotations, this.ctx, this.activeRawImage, this.opacity);
        drawExistingPolygonAnnotations(canvasEl, this.currentImageAnnotations, this.activeRawImage, this.currentlyDrawing, this.ctx);

        if (this.currentAnnotationMode === AnnotationMode.BOUNDING_BOXES) {
          onMouseDownBoundingBoxen(lastPos, value, canvasEl);
        } else if (this.currentAnnotationMode === AnnotationMode.POLYGON) {
          onMouseDownPolygon(value, canvasEl, this.activeAnnotation,
            this.annotationFacade, this.activeRawImage, this.nextAnnotationId, this.activeLabel);
        }
        this.redrawCanvas();
      }
      if (this.currentAnnotationMode === AnnotationMode.SIZING_TOOL) {
        onMouseDownSizingTool(value, canvasEl,
          this.currentImageAnnotations, this.activeRawImage,
          this.annotationFacade,
          this.editingOptions);
      }
    });

    fromEvent(canvasEl, 'mousemove').subscribe((value: MouseEvent) => {

      let noAnnotation = true;

      if (this.currentAnnotationMode === AnnotationMode.POLYGON || this.currentAnnotationMode === AnnotationMode.BOUNDING_BOXES) {
        this.canvas.nativeElement.style.cursor = 'crosshair';
        noAnnotation = false;
      }
      if (this.currentAnnotationMode === AnnotationMode.SIZING_TOOL) {
        for (const item of this.currentImageAnnotations) {
          if (item.image.id === this.activeRawImage.id && item.isVisible) {
            const spaceRatio = 0.15;
            const clickField = 10;

            const xMousePos = value.clientX - canvasEl.getBoundingClientRect().left;
            const yMousePos = value.clientY - canvasEl.getBoundingClientRect().top;

            if (item.annotationMode === AnnotationMode.BOUNDING_BOXES && item.boundingBox !== undefined) {

              const leftBoxBoundary = this.getActualScale(item.boundingBox.xCoordinate, this.activeRawImage.width, canvasEl.width);
              const topBoxBoundary = this.getActualScale(item.boundingBox.yCoordinate, this.activeRawImage.height, canvasEl.height);
              const actualBoundingBoxWidth = this.getActualScale(item.boundingBox.width, this.activeRawImage.width, canvasEl.width);
              const actualBoundingBoxHeight = this.getActualScale(item.boundingBox.height, this.activeRawImage.height, canvasEl.height);
              // check if the bounding box can be dragged around based on the mouse position
              if (leftBoxBoundary + (actualBoundingBoxWidth * spaceRatio) <= xMousePos
                && leftBoxBoundary + (actualBoundingBoxWidth * (1 - spaceRatio)) >= xMousePos
                && topBoxBoundary + (actualBoundingBoxHeight * spaceRatio) <= yMousePos
                && topBoxBoundary + (actualBoundingBoxHeight * (1 - spaceRatio)) >= yMousePos) {
                this.canvas.nativeElement.style.cursor = 'grab';
                noAnnotation = false;
              }

              // check if top side can be modified
              if (topBoxBoundary <= yMousePos
                && topBoxBoundary + (actualBoundingBoxHeight * spaceRatio) >= yMousePos
                && this.checkInBound(xMousePos, leftBoxBoundary, actualBoundingBoxWidth)) {
                this.canvas.nativeElement.style.cursor = 'n-resize';
                noAnnotation = false;
              }

              // check if left side can be modified
              if (leftBoxBoundary <= xMousePos
                && leftBoxBoundary + (actualBoundingBoxWidth * spaceRatio) >= xMousePos
                && this.checkInBound(yMousePos, topBoxBoundary, actualBoundingBoxHeight)) {
                this.canvas.nativeElement.style.cursor = 'w-resize';
                noAnnotation = false;
              }

              // check if right side can be modified
              if (leftBoxBoundary + actualBoundingBoxWidth >= xMousePos
                && leftBoxBoundary + (actualBoundingBoxWidth * (1 - spaceRatio)) <= xMousePos
                && this.checkInBound(yMousePos, topBoxBoundary, actualBoundingBoxHeight)) {
                this.canvas.nativeElement.style.cursor = 'e-resize';
                noAnnotation = false;
              }

              // check if bottom side can be modified
              if (topBoxBoundary + actualBoundingBoxHeight >= yMousePos
                && topBoxBoundary + (actualBoundingBoxHeight * (1 - spaceRatio)) <= yMousePos
                && this.checkInBound(xMousePos, leftBoxBoundary, actualBoundingBoxWidth)) {
                this.canvas.nativeElement.style.cursor = 's-resize';
                noAnnotation = false;
              }
            }
            if (item.annotationMode === AnnotationMode.POLYGON) {
              for (let i = 0; i < item.segmentations.length - 1; i = i + 2) {
                const xTmp = (item.segmentations[i] * canvasEl.width);
                const yTmp = (item.segmentations[i + 1] * canvasEl.height);
                if ((xMousePos > xTmp - clickField
                  && xMousePos < xTmp + clickField)
                  && (yMousePos > yTmp - clickField
                    && yMousePos < yTmp + clickField)) {
                  this.canvas.nativeElement.style.cursor = 'grab';
                  noAnnotation = false;
                }
              }
            }
            if (noAnnotation) {
              this.canvas.nativeElement.style.cursor = 'default';
            }
          }
        }
      }

      if (this.currentlyDrawing && this.activeLabel !== undefined && this.activeRawImage !== undefined) {

        setCanvasDimensions(canvasEl);
        drawExistingAnnotationsBoundingBoxes(canvasEl, this.currentImageAnnotations, this.ctx, this.activeRawImage, this.opacity);
        drawExistingPolygonAnnotations(canvasEl, this.currentImageAnnotations, this.activeRawImage, this.currentlyDrawing, this.ctx);

        if (this.currentAnnotationMode === AnnotationMode.BOUNDING_BOXES) {
          onMouseMoveBoundingBoxen(lastPos, value, canvasEl, this.ctx, this.activeLabel, this.opacity);
        } else if (this.currentAnnotationMode === AnnotationMode.POLYGON) {
          onMouseMovePolygon(value, canvasEl,
            this.ctx, this.activeAnnotation, this.currentImageAnnotations,
            this.activeRawImage, this.activeLabel, this.currentlyDrawing);
        }
      }
      if (this.currentAnnotationMode === AnnotationMode.SIZING_TOOL) {
        onMouseMoveSizingTool(value, canvasEl,
          this.editingOptions, this.mousePositions,
          this.annotationFacade, this.activeAnnotation,
          this.activeRawImage);
        this.redrawCanvas();
      }
    });

    fromEvent(canvasEl, 'mouseup').subscribe((value: MouseEvent) => {

      if (this.activeLabel !== undefined) {
        this.currentlyDrawing = false;

        if (this.currentAnnotationMode === AnnotationMode.BOUNDING_BOXES) {
          onMouseUpBoundingBoxen(lastPos, value, canvasEl, this.annotationFacade,
            this.activeRawImage, this.nextAnnotationId, this.activeLabel);
        } else if (this.currentAnnotationMode === AnnotationMode.POLYGON) {
          onMouseUpPolygon(lastPos, value, canvasEl, this.currentImageAnnotations, this.annotationFacade);
        }
        this.redrawCanvas();
      }
      if (this.currentAnnotationMode === AnnotationMode.SIZING_TOOL && this.checkIfResizingOptionIsActive()) {
        this.onMouseUpSizingTool();
      }
    });
  }

  checkIfResizingOptionIsActive(): boolean {
    return this.editingOptions.annotationDragging
      || this.editingOptions.addTop
      || this.editingOptions.addRight
      || this.editingOptions.addLeft
      || this.editingOptions.addBottom
      || this.editingOptions.movePolygon;
  }

  // when finishing the dragging actions all involved variables should be reset
  onMouseUpSizingTool() {
    this.editingOptions.annotationDragging = false;
    this.editingOptions.addTop = false;
    this.editingOptions.addRight = false;
    this.editingOptions.addBottom = false;
    this.editingOptions.addLeft = false;
    this.mousePositions = [];
    this.editingOptions.movePolygon = false;
    this.editingOptions.polygonIndex = -1;
    this.annotationFacade.resetActiveImageAnnotation();
  }


  canvasKeyUp(event: KeyboardEvent) {
    this.draggable = !event.ctrlKey;
  }

  canvasKeyDown(event: KeyboardEvent) {
    this.draggable = !event.ctrlKey;
  }

  @HostListener('window:keyup', ['$event'])
  keyUpEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (this.activeAnnotation !== undefined && this.currentAnnotationMode === AnnotationMode.POLYGON) {
        this.annotationFacade.addImageAnnotation(this.activeAnnotation);
      }
      this.annotationFacade.setActiveAnnotation(undefined);
    } else if (event.key === 'Escape' && this.currentAnnotationMode === AnnotationMode.POLYGON && this.activeAnnotation !== null) {
      this.onEscapeWhenDrawingPolygon();
      this.redrawCanvas();
    }
  }

  onEscapeWhenDrawingPolygon() {
    const tmpSegmentations = [];
    for (const segmentation of this.activeAnnotation.segmentations) {
      tmpSegmentations.push(segmentation);
    }
    // pop twice so the last action (last drawn line)  is  deleted
    tmpSegmentations.pop();
    tmpSegmentations.pop();
    this.annotationFacade.updateImageAnnotation({
      segmentations: tmpSegmentations,
      boundingBox: this.activeAnnotation.boundingBox,
      annotationMode: this.activeAnnotation.annotationMode,
      area: this.activeAnnotation.area,
      categoryLabel: this.activeAnnotation.categoryLabel,
      id: this.activeAnnotation.id,
      image: this.activeAnnotation.image,
      isCrowd: this.activeAnnotation.isCrowd,
      isVisible: this.activeAnnotation.isVisible
    });
  }

  // for canvas zooming
  mouseWheelUpFunc(value: MouseEvent) {
    const xMousePos = value.clientX - this.canvas.nativeElement.getBoundingClientRect().left;
    const yMousePos = value.clientY - this.canvas.nativeElement.getBoundingClientRect().top;

    this.imgWidth = this.imgWidth + this.repositioning;
    this.imagePosX = this.imagePosX - (this.repositioning * (xMousePos / this.canvas.nativeElement.getBoundingClientRect().width / 2));
    this.imagePosY = this.imagePosY - (this.repositioning * (yMousePos / this.canvas.nativeElement.getBoundingClientRect().height / 2));
  }

  mouseWheelDownFunc(value: MouseEvent) {

    const xMousePos = value.clientX - this.canvas.nativeElement.getBoundingClientRect().left;
    const yMousePos = value.clientY - this.canvas.nativeElement.getBoundingClientRect().top;

    this.imgWidth = this.imgWidth - this.repositioning;
    this.imagePosX = this.imagePosX + (this.repositioning * (xMousePos / this.canvas.nativeElement.getBoundingClientRect().width / 2));
    this.imagePosY = this.imagePosY + (this.repositioning * (yMousePos / this.canvas.nativeElement.getBoundingClientRect().height / 2));
  }

  @HostListener('window:beforeunload')
  canDeactivate(): boolean | Observable<boolean> {
    return !this.annotationFacade.changesPresent;
  }
}


export class EditingOption {
  // is for the resizing tool an specifies if a whole annotation can be dragged around the image
  annotationDragging = false;
  addTop = false;
  addRight = false;
  addBottom = false;
  addLeft = false;
  movePolygon = false;
  polygonIndex = -1;
}

