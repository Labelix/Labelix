import {AnnotaionMode} from '../../../CoreLayer/annotaionModeEnum';
import {IImageAnnotation} from '../../../../utility/contracts/IImageAnnotation';
import {IFile} from '../../../../utility/contracts/IFile';
import {AnnotationFacade} from '../../../AbstractionLayer/AnnotationFacade';
import {EditingOption} from '../image-canvas.component';

export function onMouseDownSizingTool(value: MouseEvent,
                                      canvasEl: HTMLCanvasElement,
                                      currentImageAnnotations: IImageAnnotation[],
                                      activeRawImage: IFile,
                                      annotationFacade: AnnotationFacade,
                                      editingOptions: EditingOption) {
  for (const item of currentImageAnnotations) {
    if (item.annotationMode === AnnotaionMode.BOUNDING_BOXES) {
      const xMousePos = value.clientX - canvasEl.getBoundingClientRect().left;
      const yMousePos = value.clientY - canvasEl.getBoundingClientRect().top;
      // check if the bounding box can be dragged arround based on the mouse position
      if ((item.boundingBox.xCoordinate + item.boundingBox.width * 0.1) / activeRawImage.width * canvasEl.width <= xMousePos
        && (item.boundingBox.xCoordinate - item.boundingBox.width * 0.1) / activeRawImage.width * canvasEl.width
        + item.boundingBox.width / activeRawImage.width * canvasEl.width > xMousePos
        && (item.boundingBox.yCoordinate + item.boundingBox.height * 0.1) / activeRawImage.height * canvasEl.height <= yMousePos
        && (item.boundingBox.yCoordinate - item.boundingBox.height * 0.1) / activeRawImage.height * canvasEl.height
        + item.boundingBox.height / activeRawImage.height * canvasEl.height > yMousePos) {
        annotationFacade.setActivePolygonAnnotation(item);
        editingOptions.annotationDragging = true;
      }

      if (item.boundingBox.xCoordinate / activeRawImage.width * canvasEl.width <= xMousePos
        && (item.boundingBox.xCoordinate + item.boundingBox.width * 0.1) / activeRawImage.width * canvasEl.width > xMousePos) {
        annotationFacade.setActivePolygonAnnotation(item);
        editingOptions.addLeft = true;
      }
      if ((item.boundingBox.xCoordinate / activeRawImage.width * canvasEl.width)
        + (item.boundingBox.width / activeRawImage.width * canvasEl.width) > xMousePos
        && (item.boundingBox.xCoordinate - item.boundingBox.width * 0.1) / activeRawImage.width * canvasEl.width
        + (item.boundingBox.width / activeRawImage.width * canvasEl.width) <= xMousePos) {
        annotationFacade.setActivePolygonAnnotation(item);
        editingOptions.addRight = true;
      }
      if (item.boundingBox.yCoordinate / activeRawImage.height * canvasEl.height < yMousePos
        && (item.boundingBox.yCoordinate + item.boundingBox.height * 0.1) / activeRawImage.height * canvasEl.height >= yMousePos) {
        annotationFacade.setActivePolygonAnnotation(item);
        editingOptions.addTop = true;
      }
      if (item.boundingBox.yCoordinate / activeRawImage.height * canvasEl.height
        + (item.boundingBox.height / activeRawImage.height * canvasEl.height) >= yMousePos
        && (item.boundingBox.yCoordinate - item.boundingBox.height * 0.1) / activeRawImage.height * canvasEl.height
        + (item.boundingBox.height / activeRawImage.height * canvasEl.height) < yMousePos) {
        annotationFacade.setActivePolygonAnnotation(item);
        editingOptions.addBottom = true;
      }
    }
  }
}

export function onMouseMoveSizingTool(value: MouseEvent,
                                      canvasEl: HTMLCanvasElement,
                                      editingOptions: EditingOption,
                                      mousePositions: { x: number, y: number }[],
                                      annotationFacade: AnnotationFacade,
                                      activeAnnotation: IImageAnnotation,
                                      activeRawImage: IFile) {
  if (editingOptions.annotationDragging) {
    const currentMousePositionX = value.clientX - canvasEl.getBoundingClientRect().left;
    const currentMousePositionY = value.clientY - canvasEl.getBoundingClientRect().top;
    if (mousePositions.length === 0) {
      mousePositions.push({
        x: currentMousePositionX,
        y: currentMousePositionY
      });
    } else {
      annotationFacade.updateImageAnnotation({
        id: activeAnnotation.id,
        annotationMode: activeAnnotation.annotationMode,
        boundingBox: {
          xCoordinate: activeAnnotation.boundingBox.xCoordinate
            + ((currentMousePositionX - mousePositions[mousePositions.length - 1].x)
              / canvasEl.width * activeRawImage.width),
          yCoordinate: activeAnnotation.boundingBox.yCoordinate
            + ((currentMousePositionY - mousePositions[mousePositions.length - 1].y)
              / canvasEl.height * activeRawImage.height),
          height: activeAnnotation.boundingBox.height,
          width: activeAnnotation.boundingBox.width
        },
        isCrowd: activeAnnotation.isCrowd,
        area: activeAnnotation.area,
        segmentations: activeAnnotation.segmentations,
        categoryLabel: activeAnnotation.categoryLabel,
        image: activeAnnotation.image
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
      annotationFacade.updateImageAnnotation({
        id: activeAnnotation.id,
        annotationMode: activeAnnotation.annotationMode,
        boundingBox: {
          xCoordinate: activeAnnotation.boundingBox.xCoordinate,
          yCoordinate: activeAnnotation.boundingBox.yCoordinate
            + ((currentMousePositionY - mousePositions[mousePositions.length - 1].y)
              / canvasEl.height * activeRawImage.height),
          height: activeAnnotation.boundingBox.height -
            ((currentMousePositionY - mousePositions[mousePositions.length - 1].y)
              / canvasEl.height * activeRawImage.height),
          width: activeAnnotation.boundingBox.width
        },
        isCrowd: activeAnnotation.isCrowd,
        area: activeAnnotation.area,
        segmentations: activeAnnotation.segmentations,
        categoryLabel: activeAnnotation.categoryLabel,
        image: activeAnnotation.image
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
      annotationFacade.updateImageAnnotation({
        id: activeAnnotation.id,
        annotationMode: activeAnnotation.annotationMode,
        boundingBox: {
          xCoordinate: activeAnnotation.boundingBox.xCoordinate,
          yCoordinate: activeAnnotation.boundingBox.yCoordinate,
          height: activeAnnotation.boundingBox.height +
            ((currentMousePositionY - mousePositions[mousePositions.length - 1].y)
              / canvasEl.height * activeRawImage.height),
          width: activeAnnotation.boundingBox.width
        },
        isCrowd: activeAnnotation.isCrowd,
        area: activeAnnotation.area,
        segmentations: activeAnnotation.segmentations,
        categoryLabel: activeAnnotation.categoryLabel,
        image: activeAnnotation.image
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
      annotationFacade.updateImageAnnotation({
        id: activeAnnotation.id,
        annotationMode: activeAnnotation.annotationMode,
        boundingBox: {
          xCoordinate: activeAnnotation.boundingBox.xCoordinate
            + ((currentMousePositionX - mousePositions[mousePositions.length - 1].x)
              / canvasEl.width * activeRawImage.width),
          yCoordinate: activeAnnotation.boundingBox.yCoordinate,
          height: activeAnnotation.boundingBox.height,
          width: activeAnnotation.boundingBox.width
            - ((currentMousePositionX - mousePositions[mousePositions.length - 1].x)
              / canvasEl.width * activeRawImage.width)
        },
        isCrowd: activeAnnotation.isCrowd,
        area: activeAnnotation.area,
        segmentations: activeAnnotation.segmentations,
        categoryLabel: activeAnnotation.categoryLabel,
        image: activeAnnotation.image
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
      annotationFacade.updateImageAnnotation({
        id: activeAnnotation.id,
        annotationMode: activeAnnotation.annotationMode,
        boundingBox: {
          xCoordinate: activeAnnotation.boundingBox.xCoordinate,
          yCoordinate: activeAnnotation.boundingBox.yCoordinate,
          height: activeAnnotation.boundingBox.height,
          width: activeAnnotation.boundingBox.width
            + ((currentMousePositionX - mousePositions[mousePositions.length - 1].x)
              / canvasEl.width * activeRawImage.width)
        },
        isCrowd: activeAnnotation.isCrowd,
        area: activeAnnotation.area,
        segmentations: activeAnnotation.segmentations,
        categoryLabel: activeAnnotation.categoryLabel,
        image: activeAnnotation.image
      });
      mousePositions.push({
        x: currentMousePositionX,
        y: currentMousePositionY
      });
    }
  }
}
