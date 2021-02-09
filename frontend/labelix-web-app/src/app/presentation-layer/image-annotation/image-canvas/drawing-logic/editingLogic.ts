import {AnnotationMode} from '../../../../core-layer/utility/annotaionModeEnum';
import {IImageAnnotation} from '../../../../core-layer/contracts/IImageAnnotation';
import {IRawImage} from '../../../../core-layer/contracts/IRawImage';
import {AnnotationFacade} from '../../../../abstraction-layer/AnnotationFacade';
import {EditingOption} from '../image-canvas.component';

// check if sizing tool is in a annotation: END

export function onMouseDownSizingTool(value: MouseEvent, canvasEl: HTMLCanvasElement, currentImageAnnotations: IImageAnnotation[],
                                      activeRawImage: IRawImage, annotationFacade: AnnotationFacade, editingOptions: EditingOption) {
  for (const item of currentImageAnnotations) {
    if (item.annotationMode === AnnotationMode.BOUNDING_BOXES && item.image.id === activeRawImage.id) {
      setEditingFlagBoundingBox(item, activeRawImage, value, canvasEl, annotationFacade, editingOptions);
    } else if (item.annotationMode === AnnotationMode.POLYGON && item.image.id === activeRawImage.id) {
      setEditingFlagPolygon(item, value, canvasEl, activeRawImage, editingOptions, annotationFacade);
    }
  }
}

function setEditingFlagPolygon(item: IImageAnnotation, value: MouseEvent, canvasEl: HTMLCanvasElement,
                               activeRawImage: IRawImage, editingOptions: EditingOption, annotationFacade: AnnotationFacade) {
  const xMousePos = value.clientX - canvasEl.getBoundingClientRect().left;
  const yMousePos = value.clientY - canvasEl.getBoundingClientRect().top;
  const clickField = 10;

  for (let i = 0; i < item.segmentations.length - 1; i = i + 2) {
    const xTmp = (item.segmentations[i] * canvasEl.width);
    const yTmp = (item.segmentations[i + 1] * canvasEl.height);
    if ((xMousePos > xTmp - clickField
      && xMousePos < xTmp + clickField)
      && (yMousePos > yTmp - clickField
        && yMousePos < yTmp + clickField)) {
      annotationFacade.setActiveAnnotation(item);
      editingOptions.movePolygon = true;
      editingOptions.polygonIndex = i;
    }
  }
}

function setEditingFlagBoundingBox(item: IImageAnnotation, activeRawImage: IRawImage,
                                   value: MouseEvent, canvasEl: HTMLCanvasElement,
                                   annotationFacade: AnnotationFacade, editingOptions: EditingOption) {
  if (item.boundingBox !== undefined) {
    const spaceRatio = 0.15;

    const xMousePos = value.clientX - canvasEl.getBoundingClientRect().left;
    const yMousePos = value.clientY - canvasEl.getBoundingClientRect().top;

    const leftBoxBoundary = getActualScale(item.boundingBox.xCoordinate, activeRawImage.width, canvasEl.width);
    const topBoxBoundary = getActualScale(item.boundingBox.yCoordinate, activeRawImage.height, canvasEl.height);
    const actualBoundingBoxWidth = getActualScale(item.boundingBox.width, activeRawImage.width, canvasEl.width);
    const actualBoundingBoxHeight = getActualScale(item.boundingBox.height, activeRawImage.height, canvasEl.height);


    // check if the bounding box can be dragged around based on the mouse position
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

function checkInBound(mousePos: number, boxBoundary: number, actualBoundingBoxSize: number): boolean {
  return boxBoundary <= mousePos && boxBoundary + actualBoundingBoxSize >= mousePos;
}

// hier ist jehweils immer die Breite oder die Höhe bei rawImageValue und canvasValue anzugeben
function getActualScale(value, rawImageValue, canvasValue): number {
  return value / rawImageValue * canvasValue;
}


// TODO add a solution for this redundancy
function updateImageAnnotationBoundingBox(annotationFacade, activeAnnotation, boundingBox) {
  annotationFacade.updateImageAnnotation({
    id: activeAnnotation.id,
    annotationMode: activeAnnotation.annotationMode,
    boundingBox,
    isCrowd: activeAnnotation.isCrowd,
    area: activeAnnotation.area,
    segmentations: activeAnnotation.segmentations,
    categoryLabel: activeAnnotation.categoryLabel,
    image: activeAnnotation.image,
    isVisible: activeAnnotation.isVisible
  });
}

function updateImageAnnotationPolygon(annotationFacade, activeAnnotation, segmentations) {
  annotationFacade.updateImageAnnotation({
    id: activeAnnotation.id,
    annotationMode: activeAnnotation.annotationMode,
    boundingBox: activeAnnotation.boundingBox,
    isCrowd: activeAnnotation.isCrowd,
    area: activeAnnotation.area,
    segmentations,
    categoryLabel: activeAnnotation.categoryLabel,
    image: activeAnnotation.image,
    isVisible: activeAnnotation.isVisible
  });
}

// check if sizing tool is in a annotation: END

// set new values for selected annotation: START

export function onMouseMoveSizingTool(value: MouseEvent, canvasEl: HTMLCanvasElement, editingOptions: EditingOption,
                                      mousePositions: { x: number, y: number }[], annotationFacade: AnnotationFacade,
                                      activeAnnotation: IImageAnnotation, activeRawImage: IRawImage) {

  if (activeAnnotation !== undefined && activeAnnotation.annotationMode === AnnotationMode.BOUNDING_BOXES) {
    changeValuesOnBoundingBoxAnnotation(annotationFacade, mousePositions, value,
      editingOptions, canvasEl, activeAnnotation, activeRawImage);
  } else if (activeAnnotation !== undefined && activeAnnotation.annotationMode === AnnotationMode.POLYGON) {
    changeValuesOnPolygonAnnotation(annotationFacade, mousePositions, value, editingOptions, canvasEl, activeAnnotation, activeRawImage);
  }
}

function changeValuesOnBoundingBoxAnnotation(annotationFacade: AnnotationFacade, mousePositions: { x: number, y: number }[],
                                             value: MouseEvent, editingOptions: EditingOption, canvasEl: HTMLCanvasElement,
                                             activeAnnotation: IImageAnnotation, activeRawImage: IRawImage) {
  const currentMousePositionX = value.clientX - canvasEl.getBoundingClientRect().left;
  const currentMousePositionY = value.clientY - canvasEl.getBoundingClientRect().top;

  let newScaleX: number;
  let newScaleY: number;

  if (mousePositions.length !== 0) {
    newScaleX = getActualScale((currentMousePositionX - mousePositions[mousePositions.length - 1].x),
      canvasEl.width, activeRawImage.width);
    newScaleY = getActualScale((currentMousePositionY - mousePositions[mousePositions.length - 1].y),
      canvasEl.height, activeRawImage.height);
  }

  if (editingOptions.annotationDragging || editingOptions.addTop
    || editingOptions.addLeft || editingOptions.addRight || editingOptions.addBottom) {
    if (mousePositions.length === 0) {
      mousePositions.push({
        x: currentMousePositionX,
        y: currentMousePositionY
      });
    } else {
      if (editingOptions.addTop && editingOptions.addRight) {
        // move upper right corner
        updateImageAnnotationBoundingBox(annotationFacade, activeAnnotation, {
          xCoordinate: activeAnnotation.boundingBox.xCoordinate,
          yCoordinate: activeAnnotation.boundingBox.yCoordinate + newScaleY,
          height: activeAnnotation.boundingBox.height - newScaleY,
          width: activeAnnotation.boundingBox.width + newScaleX,
        });
      } else if (editingOptions.addTop && editingOptions.addLeft) {
        // move upper left corner
        updateImageAnnotationBoundingBox(annotationFacade, activeAnnotation, {
          xCoordinate: activeAnnotation.boundingBox.xCoordinate + newScaleX,
          yCoordinate: activeAnnotation.boundingBox.yCoordinate + newScaleY,
          height: activeAnnotation.boundingBox.height - newScaleY,
          width: activeAnnotation.boundingBox.width - newScaleX,
        });
      } else if (editingOptions.addBottom && editingOptions.addLeft) {
        // move lower left corner
        updateImageAnnotationBoundingBox(annotationFacade, activeAnnotation, {
          xCoordinate: activeAnnotation.boundingBox.xCoordinate + newScaleX,
          yCoordinate: activeAnnotation.boundingBox.yCoordinate,
          height: activeAnnotation.boundingBox.height + newScaleY,
          width: activeAnnotation.boundingBox.width - newScaleX,
        });
      } else if (editingOptions.addBottom && editingOptions.addRight) {
        // move lower right corner
        updateImageAnnotationBoundingBox(annotationFacade, activeAnnotation, {
          xCoordinate: activeAnnotation.boundingBox.xCoordinate,
          yCoordinate: activeAnnotation.boundingBox.yCoordinate,
          height: activeAnnotation.boundingBox.height + newScaleY,
          width: activeAnnotation.boundingBox.width + newScaleX,
        });
      } else if (editingOptions.annotationDragging) {
        updateImageAnnotationBoundingBox(annotationFacade, activeAnnotation, {
          xCoordinate: activeAnnotation.boundingBox.xCoordinate + newScaleX,
          yCoordinate: activeAnnotation.boundingBox.yCoordinate + newScaleY,
          height: activeAnnotation.boundingBox.height,
          width: activeAnnotation.boundingBox.width
        });
      } else if (editingOptions.addTop) {
        updateImageAnnotationBoundingBox(annotationFacade, activeAnnotation, {
          xCoordinate: activeAnnotation.boundingBox.xCoordinate,
          yCoordinate: activeAnnotation.boundingBox.yCoordinate + newScaleY,
          height: activeAnnotation.boundingBox.height - newScaleY,
          width: activeAnnotation.boundingBox.width
        });
      } else if (editingOptions.addBottom) {
        updateImageAnnotationBoundingBox(annotationFacade, activeAnnotation, {
          xCoordinate: activeAnnotation.boundingBox.xCoordinate,
          yCoordinate: activeAnnotation.boundingBox.yCoordinate,
          height: activeAnnotation.boundingBox.height + newScaleY,
          width: activeAnnotation.boundingBox.width
        });
      } else if (editingOptions.addLeft) {
        updateImageAnnotationBoundingBox(annotationFacade, activeAnnotation, {
          xCoordinate: activeAnnotation.boundingBox.xCoordinate + newScaleX,
          yCoordinate: activeAnnotation.boundingBox.yCoordinate,
          height: activeAnnotation.boundingBox.height,
          width: activeAnnotation.boundingBox.width - newScaleX,
        });
      } else if (editingOptions.addRight) {
        updateImageAnnotationBoundingBox(annotationFacade, activeAnnotation, {
          xCoordinate: activeAnnotation.boundingBox.xCoordinate,
          yCoordinate: activeAnnotation.boundingBox.yCoordinate,
          height: activeAnnotation.boundingBox.height,
          width: activeAnnotation.boundingBox.width + newScaleX,
        });
      }

      mousePositions.push({
        x: currentMousePositionX,
        y: currentMousePositionY
      });
    }
  }
}

function changeValuesOnPolygonAnnotation(annotationFacade: AnnotationFacade, mousePositions: { x: number, y: number }[],
                                         value: MouseEvent, editingOptions: EditingOption, canvasEl: HTMLCanvasElement,
                                         imageAnnotation: IImageAnnotation, activeRawImage: IRawImage) {

  const currentMousePositionX = value.clientX - canvasEl.getBoundingClientRect().left;
  const currentMousePositionY = value.clientY - canvasEl.getBoundingClientRect().top;

  if (mousePositions.length > 0) {
    const tmpSegmentations: number[] = [];
    for (let i = 0; i < imageAnnotation.segmentations.length - 1; i = i + 2) {
      if (i === editingOptions.polygonIndex) {
        const tmpX = getActualScale(((currentMousePositionX - mousePositions[mousePositions.length - 1].x) / activeRawImage.width),
          canvasEl.width, activeRawImage.width);
        const tmpY = getActualScale(((currentMousePositionY - mousePositions[mousePositions.length - 1].y) / activeRawImage.height),
          canvasEl.height, activeRawImage.height);
        tmpSegmentations.push(imageAnnotation.segmentations[i] + tmpX);
        tmpSegmentations.push(imageAnnotation.segmentations[i + 1] + tmpY);
      } else {
        tmpSegmentations.push(imageAnnotation.segmentations[i]);
        tmpSegmentations.push(imageAnnotation.segmentations[i + 1]);
      }
    }
    updateImageAnnotationPolygon(annotationFacade, imageAnnotation, tmpSegmentations);
    mousePositions.push({
      x: currentMousePositionX,
      y: currentMousePositionY
    });
  } else {
    mousePositions.push({
      x: currentMousePositionX,
      y: currentMousePositionY
    });
  }
}

// set new values for selected annotation: END
