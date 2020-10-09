import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {RawImageFacade} from '../../AbstractionLayer/RawImageFacade';
import {IRawImage} from '../../../utility/contracts/IRawImage';
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
import {LabelCategoryFacade} from '../../AbstractionLayer/LabelCategoryFacade';
import {BitMapController} from '../../CoreLayer/controller/BitMapController';
import {IProject} from '../../../utility/contracts/IProject';
import {CocoFormatController} from '../../CoreLayer/controller/CocoFormatController';

@Component({
  selector: 'app-image-canvas',
  templateUrl: './image-canvas.component.html',
  styleUrls: ['./image-canvas.component.css']
})

export class ImageCanvasComponent implements OnInit, AfterViewInit {

  constructor(private annotationFacade: AnnotationFacade,
              private rawImageFacade: RawImageFacade,
              private categoryLabelFacade: LabelCategoryFacade,
              private cocoController: CocoFormatController) {
  }


  // start with of 1400px fits the resolution of full hd best (maybe build a dynamic system later)
  private imgWidth = 1400;

  // specifies if the image can be dragged arround on the screen (by pressing ctrl)
  private dragable = true;

  // drawing helper variables
  private currentlyDrawing = false;
  private nextAnnotationId: number;
  private opacity = 0.25;
  private mousePositions: { x: number, y: number }[] = [];

  // state data placeholders
  private currentImageAnnotations: IImageAnnotation[];
  private currentAnnotationMode: AnnotaionMode;
  private activeLabel: ICategory;
  private rawImages: IRawImage[];
  private categories: ICategory[];
  private activeRawImage: IRawImage;
  private activeAnnotation: IImageAnnotation;
  private activeProject: IProject;

  // specifies the several different modes, when the resizing tool is used
  editingOptions: EditingOption = {
    addBottom: false,
    addLeft: false,
    addRight: false,
    addTop: false,
    annotationDragging: false
  };

  @ViewChild('canvas') canvas: ElementRef;
  ctx: CanvasRenderingContext2D;

  ngOnInit(): void {
    this.categoryLabelFacade.resetCategoryLabelState();

    this.rawImageFacade.files$.subscribe(value => {
      this.rawImages = value;
      this.setAnnotationsFromCoco();
    });
    this.annotationFacade.activeProject.subscribe(value => {
      this.activeProject = value;
      this.setAnnotationsFromCoco();
    });
    this.categoryLabelFacade.labelCategories$.subscribe(value => this.categories = value);

    this.annotationFacade.currentAnnotationImage.subscribe(value => {
      if (value !== undefined) {
        this.activeRawImage = value;
        this.readDataFromRawImage();
        this.redrawCanvas();
      }
    });
    this.annotationFacade.currentImageAnnotations.subscribe(value => {
      this.currentImageAnnotations = value;
      this.readDataFromRawImage();
      this.redrawCanvas();
    });

    this.annotationFacade.activeLabel.subscribe(value => this.activeLabel = value);
    this.annotationFacade.activePolygonAnnotation.subscribe(value => this.activeAnnotation = value);
    this.annotationFacade.currentAnnotationMode.subscribe(value => this.currentAnnotationMode = value);
    this.annotationFacade.numberOfCurrentImageAnnotations.subscribe(value => this.nextAnnotationId = value);
  }

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
        this.rawImageFacade.updateRawImage(newRawImage);
        this.annotationFacade.changeCurrentAnnotationImage(newRawImage);
      };
    });
    reader.readAsDataURL(this.activeRawImage.file);
  }

  getDimensionsOfBase64() {
    const image = new Image();
    image.src = this.activeRawImage.base64Url;
    image.addEventListener('load', ev => {
      const newRawImage = {
        id: this.activeRawImage.id,
        file: this.activeRawImage.file,
        width: image.width,
        height: image.height,
        base64Url: image.src,
        name: this.activeRawImage.name
      };
      this.rawImageFacade.updateRawImage(newRawImage);
      this.annotationFacade.changeCurrentAnnotationImage(newRawImage);
    });
  }

  private redrawCanvas() {
    if (this.canvas !== undefined) {
      const canvasEl = this.canvas.nativeElement;
      setCanvasDimensions(canvasEl);
      drawExistingAnnotationsBoundingBoxes(canvasEl, this.currentImageAnnotations, this.ctx, this.activeRawImage, this.opacity);
      drawExistingPolygonAnnotations(canvasEl, this.currentImageAnnotations, this.activeRawImage, this.currentlyDrawing, this.ctx);
      fillExistingPolygonAnnotations(canvasEl, this.currentImageAnnotations, this.activeRawImage, this.ctx, this.opacity);
      if (this.activeAnnotation !== undefined) {
        drawPointsOfPolygonAnnotation(canvasEl, this.activeAnnotation, this.ctx, this.currentlyDrawing);
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
          onMouseDownPolygon(value, canvasEl, this.activeAnnotation,
            this.annotationFacade, this.activeRawImage, this.nextAnnotationId, this.activeLabel);
        } else if (this.currentAnnotationMode === AnnotaionMode.SIZING_TOOL) {
          onMouseDownSizingTool(value, canvasEl,
            this.currentImageAnnotations, this.activeRawImage,
            this.annotationFacade,
            this.editingOptions);
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
          onMouseMovePolygon(value, canvasEl,
            this.ctx, this.activeAnnotation, this.currentImageAnnotations,
            this.activeRawImage, this.activeLabel, this.currentlyDrawing);
        } else if (this.currentAnnotationMode === AnnotaionMode.SIZING_TOOL) {
          onMouseMoveSizingTool(value, canvasEl,
            this.editingOptions, this.mousePositions,
            this.annotationFacade, this.activeAnnotation,
            this.activeRawImage);
          this.redrawCanvas();
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
          this.redrawCanvas();
        } else if (this.currentAnnotationMode === AnnotaionMode.SIZING_TOOL) {
          this.onMouseUpSizingTool();
          this.redrawCanvas();
        }
      }
    });
  }

  onMouseUpSizingTool() {
    this.editingOptions.annotationDragging = false;
    this.editingOptions.addTop = false;
    this.editingOptions.addRight = false;
    this.editingOptions.addBottom = false;
    this.editingOptions.addLeft = false;
    this.mousePositions = [];
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
    } else if (event.key === 'Escape' && this.currentAnnotationMode === AnnotaionMode.POLYGON && this.activeAnnotation !== null) {
      this.onEscapeWhenDrawingPolygon();
      this.redrawCanvas();
    }
  }

  onEscapeWhenDrawingPolygon() {
    const tmpSegs = [];
    for (const anno of this.activeAnnotation.segmentations) {
      tmpSegs.push(anno);
    }
    // pop twice so the last line is  deleted
    tmpSegs.pop();
    tmpSegs.pop();
    this.annotationFacade.updateImageAnnotation({
      segmentations: tmpSegs,
      boundingBox: this.activeAnnotation.boundingBox,
      annotationMode: this.activeAnnotation.annotationMode,
      area: this.activeAnnotation.area,
      categoryLabel: this.activeAnnotation.categoryLabel,
      id: this.activeAnnotation.id,
      image: this.activeAnnotation.image,
      isCrowd: this.activeAnnotation.isCrowd
    });
  }

  // for canvas zooming
  mouseWheelUpFunc() {
    this.imgWidth = this.imgWidth + 20;
  }

  mouseWheelDownFunc() {
    this.imgWidth = this.imgWidth - 20;
  }
}

export class EditingOption {
  // is for the resizing tool an specifies if a whole annotation can be dragged arround the image
  annotationDragging = false;
  addTop = false;
  addRight = false;
  addBottom = false;
  addLeft = false;
}

