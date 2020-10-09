import {AnnotaionMode} from '../../../CoreLayer/annotaionModeEnum';
import {IImageAnnotation} from '../../../../utility/contracts/IImageAnnotation';
import {IRawImage} from '../../../../utility/contracts/IRawImage';
import {AnnotationFacade} from '../../../AbstractionLayer/AnnotationFacade';
import {EditingOption} from '../image-canvas.component';

export function onMouseDownSizingTool(value: MouseEvent,
                                      canvasEl: HTMLCanvasElement,
                                      currentImageAnnotations: IImageAnnotation[],
                                      activeRawImage: IRawImage,
                                      annotationFacade: AnnotationFacade,
                                      editingOptions: EditingOption) {
  for (const item of currentImageAnnotations) {
    if (item.annotationMode === AnnotaionMode.BOUNDING_BOXES) {

      const spaceRatio = 0.2;

      const xMousePos = value.clientX - canvasEl.getBoundingClientRect().left;
      const yMousePos = value.clientY - canvasEl.getBoundingClientRect().top;

      const leftBoxBoundary = getActualScale(item.boundingBox.xCoordinate, activeRawImage.width, canvasEl.width);
      const topBoxBoundary = getActualScale(item.boundingBox.yCoordinate, activeRawImage.height, canvasEl.height);
      const actualBoundingBoxWidth = getActualScale(item.boundingBox.width, activeRawImage.width, canvasEl.width);
      const actualBoundingBoxHeight = getActualScale(item.boundingBox.height, activeRawImage.height, canvasEl.height);


      // check if the bounding box can be dragged arround based on the mouse position
      if (leftBoxBoundary + (actualBoundingBoxWidth * spaceRatio) <= xMousePos
        && leftBoxBoundary + (actualBoundingBoxWidth * (1 - spaceRatio)) >= xMousePos
        && topBoxBoundary + (actualBoundingBoxHeight * spaceRatio) <= yMousePos
        && topBoxBoundary + (actualBoundingBoxHeight * (1 - spaceRatio)) >= yMousePos) {
        annotationFacade.setActiveAnnotation(item);
        editingOptions.annotationDragging = true;
      }

      // check if top side can be modified
      if (topBoxBoundary <= yMousePos
        && topBoxBoundary + (actualBoundingBoxHeight * spaceRatio) >= yMousePos
        && checkInBound(xMousePos, leftBoxBoundary, actualBoundingBoxWidth)) {
        annotationFacade.setActiveAnnotation(item);
        editingOptions.addTop = true;
      }

      // check if left side can be modified
      if (leftBoxBoundary <= xMousePos
        && leftBoxBoundary + (actualBoundingBoxWidth * spaceRatio) >= xMousePos
        && checkInBound(yMousePos, topBoxBoundary, actualBoundingBoxHeight)) {
        annotationFacade.setActiveAnnotation(item);
        editingOptions.addLeft = true;
      }

      // check if right side can be modified
      if (leftBoxBoundary + actualBoundingBoxWidth >= xMousePos
        && leftBoxBoundary + (actualBoundingBoxWidth * (1 - spaceRatio)) <= xMousePos
        && checkInBound(yMousePos, topBoxBoundary, actualBoundingBoxHeight)) {
        annotationFacade.setActiveAnnotation(item);
        editingOptions.addRight = true;
      }

      // check if bottom side can be modified
      if (topBoxBoundary + actualBoundingBoxHeight >= yMousePos
        && topBoxBoundary + (actualBoundingBoxHeight * (1 - spaceRatio)) <= yMousePos
        && checkInBound(xMousePos, leftBoxBoundary, actualBoundingBoxWidth)) {
        annotationFacade.setActiveAnnotation(item);
        editingOptions.addBottom = true;
      }
    }
  }
}

function checkInBound(mousePos: number, boxBoundary: number, actualBoundingBoxSize: number): boolean {
  return boxBoundary <= mousePos && boxBoundary + actualBoundingBoxSize >= mousePos ? true : false;
}

// hier ist jehweils immer die Breite oder die Höhe bei rawImageValue und canvasValue anzugeben
function getActualScale(value, rawImageValue, canvasValue): number {
  return value / rawImageValue * canvasValue;
}

function updateImageAnnotation(annotationFacade,
                               activeAnnotation,
                               boundingBox) {
  annotationFacade.updateImageAnnotation({
    id: activeAnnotation.id,
    annotationMode: activeAnnotation.annotationMode,
    boundingBox,
    isCrowd: activeAnnotation.isCrowd,
    area: activeAnnotation.area,
    segmentations: activeAnnotation.segmentations,
    categoryLabel: activeAnnotation.categoryLabel,
    image: activeAnnotation.image
  });
}

export function onMouseMoveSizingTool(value: MouseEvent,
                                      canvasEl: HTMLCanvasElement,
                                      editingOptions: EditingOption,
                                      mousePositions: { x: number, y: number }[],
                                      annotationFacade: AnnotationFacade,
                                      activeAnnotation: IImageAnnotation,
                                      activeRawImage: IRawImage) {
  if (editingOptions.annotationDragging) {
    const currentMousePositionX = value.clientX - canvasEl.getBoundingClientRect().left;
    const currentMousePositionY = value.clientY - canvasEl.getBoundingClientRect().top;
    if (mousePositions.length === 0) {
      mousePositions.push({
        x: currentMousePositionX,
        y: currentMousePositionY
      });
    } else {
      updateImageAnnotation(annotationFacade, activeAnnotation, {
        xCoordinate: activeAnnotation.boundingBox.xCoordinate
          + ((currentMousePositionX - mousePositions[mousePositions.length - 1].x)
            / canvasEl.width * activeRawImage.width),
        yCoordinate: activeAnnotation.boundingBox.yCoordinate
          + ((currentMousePositionY - mousePositions[mousePositions.length - 1].y)
            / canvasEl.height * activeRawImage.height),
        height: activeAnnotation.boundingBox.height,
        width: activeAnnotation.boundingBox.width
      });
      mousePositions.push({
        x: currentMousePositionX,
        y: currentMousePositionY
      });
    }
  }
  if (editingOptions.addTop) {
    const currentMousePositionX = value.clientX - canvasEl.getBoundingClientRect().left;
    const currentMousePositionY = value.clientY - canvasEl.getBoundingClientRect().top;
    if (mousePositions.length === 0) {
      mousePositions.push({
        x: currentMousePositionX,
        y: currentMousePositionY
      });
    } else {
      updateImageAnnotation(annotationFacade, activeAnnotation, {
        xCoordinate: activeAnnotation.boundingBox.xCoordinate,
        yCoordinate: activeAnnotation.boundingBox.yCoordinate
          + ((currentMousePositionY - mousePositions[mousePositions.length - 1].y)
            / canvasEl.height * activeRawImage.height),
        height: activeAnnotation.boundingBox.height -
          ((currentMousePositionY - mousePositions[mousePositions.length - 1].y)
            / canvasEl.height * activeRawImage.height),
        width: activeAnnotation.boundingBox.width
      });
      mousePositions.push({
        x: currentMousePositionX,
        y: currentMousePositionY
      });
    }
  }
  if (editingOptions.addBottom) {
    const currentMousePositionX = value.clientX - canvasEl.getBoundingClientRect().left;
    const currentMousePositionY = value.clientY - canvasEl.getBoundingClientRect().top;
    if (mousePositions.length === 0) {
      mousePositions.push({
        x: currentMousePositionX,
        y: currentMousePositionY
      });
    } else {
      updateImageAnnotation(annotationFacade, activeAnnotation, {
        xCoordinate: activeAnnotation.boundingBox.xCoordinate,
        yCoordinate: activeAnnotation.boundingBox.yCoordinate,
        height: activeAnnotation.boundingBox.height +
          ((currentMousePositionY - mousePositions[mousePositions.length - 1].y)
            / canvasEl.height * activeRawImage.height),
        width: activeAnnotation.boundingBox.width
      });
      mousePositions.push({
        x: currentMousePositionX,
        y: currentMousePositionY
      });
    }
  }
  if (editingOptions.addLeft) {
    const currentMousePositionX = value.clientX - canvasEl.getBoundingClientRect().left;
    const currentMousePositionY = value.clientY - canvasEl.getBoundingClientRect().top;
    if (mousePositions.length === 0) {
      mousePositions.push({
        x: currentMousePositionX,
        y: currentMousePositionY
      });
    } else {
      updateImageAnnotation(annotationFacade, activeAnnotation, {
        xCoordinate: activeAnnotation.boundingBox.xCoordinate
          + ((currentMousePositionX - mousePositions[mousePositions.length - 1].x)
            / canvasEl.width * activeRawImage.width),
        yCoordinate: activeAnnotation.boundingBox.yCoordinate,
        height: activeAnnotation.boundingBox.height,
        width: activeAnnotation.boundingBox.width
          - ((currentMousePositionX - mousePositions[mousePositions.length - 1].x)
            / canvasEl.width * activeRawImage.width)
      });
      mousePositions.push({
        x: currentMousePositionX,
        y: currentMousePositionY
      });
    }
  }
  if (editingOptions.addRight) {
    const currentMousePositionX = value.clientX - canvasEl.getBoundingClientRect().left;
    const currentMousePositionY = value.clientY - canvasEl.getBoundingClientRect().top;
    if (mousePositions.length === 0) {
      mousePositions.push({
        x: currentMousePositionX,
        y: currentMousePositionY
      });
    } else {
      updateImageAnnotation(annotationFacade, activeAnnotation, {
        xCoordinate: activeAnnotation.boundingBox.xCoordinate,
        yCoordinate: activeAnnotation.boundingBox.yCoordinate,
        height: activeAnnotation.boundingBox.height,
        width: activeAnnotation.boundingBox.width
          + ((currentMousePositionX - mousePositions[mousePositions.length - 1].x)
            / canvasEl.width * activeRawImage.width)
      });
      mousePositions.push({
        x: currentMousePositionX,
        y: currentMousePositionY
      });
    }
  }
}
