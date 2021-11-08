import {IImageAnnotation} from "../../../../core-layer/contracts/IImageAnnotation";
import {EditingOption} from "../image-canvas.component";
import {AnnotationFacade} from "../../../../abstraction-layer/AnnotationFacade";
import {IRawImage} from "../../../../core-layer/contracts/IRawImage";
import {AnnotationMode} from "../../../../core-layer/utility/annotation-mode-enum";
import {IBoundingBox} from "../../../../core-layer/contracts/IBoundingBox";
import {ImageAnnotation} from "../../../../core-layer/models/ImageAnnotation";
import {Subscription} from "rxjs";

export class EditingLogicController {
  annotationFacade: AnnotationFacade;
  canvasEl: HTMLCanvasElement;
  editingOptions: EditingOption;
  activeRawImage: IRawImage;
  activeAnnotation: IImageAnnotation;
  currentImageAnnotations: IImageAnnotation[];
  mouseEvent: MouseEvent;
  spaceRatio: number = 0.15;
  missTolerance = 10;
  private subscription: Subscription;

  constructor(canvasEl: HTMLCanvasElement,
              annotationFacade: AnnotationFacade,
              editingOptions: EditingOption) {
    this.canvasEl = canvasEl;
    this.annotationFacade = annotationFacade;
    this.editingOptions = editingOptions;

    this.manageSubscriptions();
  }

  private manageSubscriptions() {
    this.subscription = new Subscription();
    this.subscription
      .add(this.annotationFacade.currentAnnotationImage
        .subscribe(value => this.onSubscriptionToCurrentAnnotationImage(value)));
    this.subscription
      .add(this.annotationFacade.currentImageAnnotations
        .subscribe(value => this.currentImageAnnotations = value));
    this.subscription
      .add(this.annotationFacade.activePolygonAnnotation
        .subscribe(value =>
          this.onSubscriptionToActiveAnnotation(value)));
  }

  dispose() {
    this.subscription.unsubscribe();
  }

  onMouseDownSizingTool() {
    for (const item of this.currentImageAnnotations) {

      if (this.modeIsBoundingBox(item)) {
        this.setEditingFlagBoundingBox(item);
      } else if (this.modeIsPolygon(item)) {
        this.setEditingFlagPolygon(item);
      }
    }
  }

  setEditingFlagBoundingBox(item: IImageAnnotation) {
    if (item.boundingBox !== undefined && item.isVisible) {
      const boundingBox: IBoundingBox = this.getBoundingBox(item);

      this.setDraggeAroundFlag(boundingBox, item);
      this.setDraggeTopFlag(boundingBox, item);
      this.setDraggeLeftFlag(boundingBox, item);
      this.setDraggeRightFlag(boundingBox, item);
      this.setDraggeBottomFlag(boundingBox, item);
    }
  }

  checkIfCanBeDragged(boundingBox: IBoundingBox, spaceRatio: number, xMousePos: number, yMousePos: number) {
    return boundingBox.xCoordinate + (boundingBox.width * spaceRatio) <= xMousePos
      && boundingBox.xCoordinate + (boundingBox.width * (1 - spaceRatio)) >= xMousePos
      && boundingBox.yCoordinate + (boundingBox.height * spaceRatio) <= yMousePos
      && boundingBox.yCoordinate + (boundingBox.height * (1 - spaceRatio)) >= yMousePos;
  }

  checkInBound(mousePos: number, boxBoundary: number, actualBoundingBoxSize: number): boolean {
    return boxBoundary <= mousePos && boxBoundary + actualBoundingBoxSize >= mousePos;
  }

// hier ist jehweils immer die Breite oder die Höhe bei rawImageValue und canvasValue anzugeben
  getActualScale(value: number, rawImageValue: number, canvasValue: number): number {
    return value / rawImageValue * canvasValue;
  }

  setEditingFlagPolygon(item: IImageAnnotation) {
    const mouseClick = new Click();
    mouseClick.x = this.mouseEvent.clientX - this.canvasEl.getBoundingClientRect().left;
    mouseClick.y = this.mouseEvent.clientY - this.canvasEl.getBoundingClientRect().top;

    for (let i = 0; i < item.segmentations.length - 1; i = i + 2) {
      const segmentationPosition = new Click();
      segmentationPosition.x = (item.segmentations[i] * this.canvasEl.width);
      segmentationPosition.y = (item.segmentations[i + 1] * this.canvasEl.height);
      if (this.clickInBounds(mouseClick, segmentationPosition)) {
        this.annotationFacade.setActiveAnnotation(item);
        this.editingOptions.movePolygon = true;
        this.editingOptions.polygonIndex = i;
      }
    }
  }

  onMouseMoveSizingTool(postion: MouseEvent, mousePositions: { x: number, y: number }[]) {

    if (this.activeAnnotation !== undefined && this.activeAnnotation.annotationMode === AnnotationMode.BOUNDING_BOXES) {
      this.changeValuesOnBoundingBoxAnnotation(mousePositions, postion);
    } else if (this.activeAnnotation !== undefined && this.activeAnnotation.annotationMode === AnnotationMode.POLYGON) {
      this.changeValuesOnPolygonAnnotation(mousePositions, postion);
    }
  }

  changeValuesOnBoundingBoxAnnotation(mousePositions: { x: number, y: number }[], position: MouseEvent) {
    const currentMousePositionX = position.clientX - this.canvasEl.getBoundingClientRect().left;
    const currentMousePositionY = position.clientY - this.canvasEl.getBoundingClientRect().top;

    let newScaleX: number = 0;
    let newScaleY: number = 0;

    if (mousePositions.length !== 0) {
      newScaleX = this.getActualScale((currentMousePositionX - mousePositions[mousePositions.length - 1].x),
        this.canvasEl.width, this.activeRawImage.width!);
      newScaleY = this.getActualScale((currentMousePositionY - mousePositions[mousePositions.length - 1].y),
        this.canvasEl.height, this.activeRawImage.height!);
    }

    if (this.isAnyFlag()) {
      if (mousePositions.length === 0) {
        mousePositions.push({
          x: currentMousePositionX,
          y: currentMousePositionY
        });
      } else {
        this.checkLocationForChange(newScaleY, newScaleX);
        mousePositions.push({
          x: currentMousePositionX,
          y: currentMousePositionY
        });
      }
    }
  }

  changeValuesOnPolygonAnnotation(mousePositions: { x: number, y: number }[],
                                  position: MouseEvent) {

    const currentMousePos = new Click();
    currentMousePos.x = position.clientX - this.canvasEl.getBoundingClientRect().left;
    currentMousePos.y = position.clientY - this.canvasEl.getBoundingClientRect().top;

    if (mousePositions.length > 0) {
      const segmentations = this.updateSegmentations(currentMousePos, mousePositions);
      this.updateImageAnnotationPolygon(segmentations);
      mousePositions.push({
        x: currentMousePos.x,
        y: currentMousePos.y
      });
    } else {
      mousePositions.push({
        x: currentMousePos.x,
        y: currentMousePos.y
      });
    }
  }

  updateImageAnnotationBoundingBox(boundingBox: IBoundingBox) {
    const newAnnotation = new ImageAnnotation();
    newAnnotation.copyProperties(this.activeAnnotation);
    newAnnotation.boundingBox = boundingBox;
    this.annotationFacade.updateImageAnnotation(newAnnotation);
  }

  updateImageAnnotationPolygon(segmentations: number[]) {
    const newAnnotation = new ImageAnnotation();
    newAnnotation.copyProperties(this.activeAnnotation);
    newAnnotation.segmentations = segmentations;
    this.annotationFacade.updateImageAnnotation(newAnnotation);
  }

  private onSubscriptionToActiveAnnotation(value: IImageAnnotation | undefined) {
    if (value !== undefined) {
      this.activeAnnotation = value;
    }
  }

  private onSubscriptionToCurrentAnnotationImage(value: IRawImage | undefined) {
    if (value !== undefined) {
      this.activeRawImage = value;
    }
  }

  private modeIsPolygon(item: IImageAnnotation) {
    return item.annotationMode === AnnotationMode.POLYGON && item.image.id === this.activeRawImage.id;
  }

  private modeIsBoundingBox(item: IImageAnnotation) {
    return item.annotationMode === AnnotationMode.BOUNDING_BOXES && item.image.id === this.activeRawImage.id;
  }

  private getMouseClick(): Click {
    const click = new Click();
    click.x = this.mouseEvent.clientX - this.canvasEl.getBoundingClientRect().left;
    click.y = this.mouseEvent.clientY - this.canvasEl.getBoundingClientRect().top;
    return click;
  }

  private setDraggeBottomFlag(boundingBox: IBoundingBox, item: IImageAnnotation) {
    const click = this.getMouseClick();

    if (boundingBox.yCoordinate + boundingBox.height >= click.y
      && boundingBox.yCoordinate + (boundingBox.height * (1 - this.spaceRatio)) <= click.y
      && this.checkInBound(click.x, boundingBox.xCoordinate, boundingBox.width)) {
      this.annotationFacade.setActiveAnnotation(item);
      this.editingOptions.addBottom = true;
    }
  }

  private setDraggeRightFlag(boundingBox: IBoundingBox, item: IImageAnnotation) {
    const click = this.getMouseClick();
    if (boundingBox.xCoordinate + boundingBox.width >= click.x
      && boundingBox.xCoordinate + (boundingBox.width * (1 - this.spaceRatio)) <= click.x
      && this.checkInBound(click.y, boundingBox.yCoordinate, boundingBox.height)) {
      this.annotationFacade.setActiveAnnotation(item);
      this.editingOptions.addRight = true;
    }
  }

  private setDraggeLeftFlag(boundingBox: IBoundingBox, item: IImageAnnotation) {
    const click = this.getMouseClick();
    // check if left side can be modified
    if (boundingBox.xCoordinate <= click.x
      && boundingBox.xCoordinate + (boundingBox.width * this.spaceRatio) >= click.x
      && this.checkInBound(click.y, boundingBox.yCoordinate, boundingBox.height)) {
      this.annotationFacade.setActiveAnnotation(item);
      this.editingOptions.addLeft = true;
    }
  }

  private setDraggeTopFlag(boundingBox: IBoundingBox, item: IImageAnnotation) {
    const click = this.getMouseClick();
    if (boundingBox.yCoordinate <= click.y
      && boundingBox.yCoordinate + (boundingBox.height * this.spaceRatio) >= click.y
      && this.checkInBound(click.x, boundingBox.xCoordinate, boundingBox.width)) {
      this.annotationFacade.setActiveAnnotation(item);
      this.editingOptions.addTop = true;
    }
  }

  private getBoundingBox(item: IImageAnnotation): IBoundingBox {
    return {
      xCoordinate: this.getActualScale(item.boundingBox!.xCoordinate, this.activeRawImage.width!, this.canvasEl.width),
      yCoordinate: this.getActualScale(item.boundingBox!.width, this.activeRawImage.width!, this.canvasEl.width),
      width: this.getActualScale(item.boundingBox!.width, this.activeRawImage.width!, this.canvasEl.width),
      height: this.getActualScale(item.boundingBox!.height, this.activeRawImage.height!, this.canvasEl.height)
    }
  }

  private setDraggeAroundFlag(boundingBox: IBoundingBox, item: IImageAnnotation) {
    const click = this.getMouseClick();
    if (this.checkIfCanBeDragged(boundingBox, this.spaceRatio, click.x, click.y)) {
      this.annotationFacade.setActiveAnnotation(item);
      this.editingOptions.annotationDragging = true;
    }
  }

  private clickInBounds(mouseClick: Click, segmentationPosition: Click) {
    return (mouseClick.x > segmentationPosition.x - this.missTolerance
        && mouseClick.x < segmentationPosition.x + this.missTolerance)
      && (mouseClick.y > segmentationPosition.y - this.missTolerance
        && mouseClick.y < segmentationPosition.y + this.missTolerance);
  }

  private isAnyFlag() {
    return this.editingOptions.annotationDragging || this.editingOptions.addTop
      || this.editingOptions.addLeft || this.editingOptions.addRight || this.editingOptions.addBottom;
  }

  private checkLocationForChange(newScaleY: number, newScaleX: number) {
    if (this.editingOptions.addTop && this.editingOptions.addRight) {
      this.moveUpperRightCorner(newScaleY, newScaleX);
    } else if (this.editingOptions.addBottom && this.editingOptions.addRight) {
      this.moveLowerRightCorner(newScaleY, newScaleX);
    } else if (this.editingOptions.addTop && this.editingOptions.addLeft) {
      this.moveUpperLeftCorner(newScaleX, newScaleY);
    } else if (this.editingOptions.addBottom && this.editingOptions.addLeft) {
      this.moveLowerLeftCorner(newScaleX, newScaleY);
    } else if (this.editingOptions.annotationDragging) {
      this.moveWholeBoundingBox(newScaleX, newScaleY);
    } else if (this.editingOptions.addTop) {
      this.moveTop(newScaleY);
    } else if (this.editingOptions.addBottom) {
      this.moveBottom(newScaleY);
    } else if (this.editingOptions.addLeft) {
      this.moveLeft(newScaleX);
    } else if (this.editingOptions.addRight) {
      this.moveRight(newScaleX);
    }
  }

  private moveRight(newScaleX: number) {
    this.updateImageAnnotationBoundingBox({
      xCoordinate: this.activeAnnotation.boundingBox!.xCoordinate,
      yCoordinate: this.activeAnnotation.boundingBox!.yCoordinate,
      height: this.activeAnnotation.boundingBox!.height,
      width: this.activeAnnotation.boundingBox!.width + newScaleX,
    });
  }

  private moveLeft(newScaleX: number) {
    this.updateImageAnnotationBoundingBox({
      xCoordinate: this.activeAnnotation.boundingBox!.xCoordinate + newScaleX,
      yCoordinate: this.activeAnnotation.boundingBox!.yCoordinate,
      height: this.activeAnnotation.boundingBox!.height,
      width: this.activeAnnotation.boundingBox!.width - newScaleX,
    });
  }

  private moveBottom(newScaleY: number) {
    this.updateImageAnnotationBoundingBox({
      xCoordinate: this.activeAnnotation.boundingBox!.xCoordinate,
      yCoordinate: this.activeAnnotation.boundingBox!.yCoordinate,
      height: this.activeAnnotation.boundingBox!.height + newScaleY,
      width: this.activeAnnotation.boundingBox!.width
    });
  }

  private moveTop(newScaleY: number) {
    this.updateImageAnnotationBoundingBox({
      xCoordinate: this.activeAnnotation.boundingBox!.xCoordinate,
      yCoordinate: this.activeAnnotation.boundingBox!.yCoordinate + newScaleY,
      height: this.activeAnnotation.boundingBox!.height - newScaleY,
      width: this.activeAnnotation.boundingBox!.width
    });
  }

  private moveWholeBoundingBox(newScaleX: number, newScaleY: number) {
    this.updateImageAnnotationBoundingBox({
      xCoordinate: this.activeAnnotation.boundingBox!.xCoordinate + newScaleX,
      yCoordinate: this.activeAnnotation.boundingBox!.yCoordinate + newScaleY,
      height: this.activeAnnotation.boundingBox!.height,
      width: this.activeAnnotation.boundingBox!.width
    });
  }

  private moveLowerRightCorner(newScaleY: number, newScaleX: number) {
    this.updateImageAnnotationBoundingBox({
      xCoordinate: this.activeAnnotation.boundingBox!.xCoordinate,
      yCoordinate: this.activeAnnotation.boundingBox!.yCoordinate,
      height: this.activeAnnotation.boundingBox!.height + newScaleY,
      width: this.activeAnnotation.boundingBox!.width + newScaleX,
    });
  }

  private moveLowerLeftCorner(newScaleX: number, newScaleY: number) {
    this.updateImageAnnotationBoundingBox({
      xCoordinate: this.activeAnnotation.boundingBox!.xCoordinate + newScaleX,
      yCoordinate: this.activeAnnotation.boundingBox!.yCoordinate,
      height: this.activeAnnotation.boundingBox!.height + newScaleY,
      width: this.activeAnnotation.boundingBox!.width - newScaleX,
    });
  }

  private moveUpperLeftCorner(newScaleX: number, newScaleY: number) {
    this.updateImageAnnotationBoundingBox({
      xCoordinate: this.activeAnnotation.boundingBox!.xCoordinate + newScaleX,
      yCoordinate: this.activeAnnotation.boundingBox!.yCoordinate + newScaleY,
      height: this.activeAnnotation.boundingBox!.height - newScaleY,
      width: this.activeAnnotation.boundingBox!.width - newScaleX,
    });
  }

  private moveUpperRightCorner(newScaleY: number, newScaleX: number) {
    this.updateImageAnnotationBoundingBox({
      xCoordinate: this.activeAnnotation.boundingBox!.xCoordinate,
      yCoordinate: this.activeAnnotation.boundingBox!.yCoordinate + newScaleY,
      height: this.activeAnnotation.boundingBox!.height - newScaleY,
      width: this.activeAnnotation.boundingBox!.width + newScaleX,
    });
  }

  private updateSegmentations(currentMousePos: Click, mousePositions: { x: number; y: number }[]) {
    const tmpSegmentations: number[] = [];
    for (let i = 0; i < this.activeAnnotation.segmentations.length - 1; i = i + 2) {
      if (i === this.editingOptions.polygonIndex) {
        const tmpX = this.getActualScale((
            (currentMousePos.x - mousePositions[mousePositions.length - 1].x) / this.activeRawImage.width!),
          this.canvasEl.width, this.activeRawImage.width!);
        const tmpY = this.getActualScale((
            (currentMousePos.y - mousePositions[mousePositions.length - 1].y) / this.activeRawImage.height!),
          this.canvasEl.height, this.activeRawImage.height!);
        tmpSegmentations.push(this.activeAnnotation.segmentations[i] + tmpX);
        tmpSegmentations.push(this.activeAnnotation.segmentations[i + 1] + tmpY);
      } else {
        tmpSegmentations.push(this.activeAnnotation.segmentations[i]);
        tmpSegmentations.push(this.activeAnnotation.segmentations[i + 1]);
      }
    }
    return tmpSegmentations;
  }


}

class Click {
  x: number;
  y: number;
}
