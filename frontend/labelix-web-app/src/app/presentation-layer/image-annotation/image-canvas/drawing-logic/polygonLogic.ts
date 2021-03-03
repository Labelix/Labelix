import {IImageAnnotation} from '../../../../core-layer/contracts/IImageAnnotation';
import {AnnotationFacade} from '../../../../abstraction-layer/AnnotationFacade';
import {IRawImage} from '../../../../core-layer/contracts/IRawImage';
import {AnnotationMode} from '../../../../core-layer/utility/annotation-mode-enum';
import {ICategory} from '../../../../core-layer/contracts/ICategory';
import {drawAnnotationHeader, hexToRGB} from './drawingUtilLogic';

export function onMouseDownPolygon(value: MouseEvent, canvasEl: HTMLCanvasElement, activeAnnotation: IImageAnnotation,
                                   annotationFacade: AnnotationFacade, activeRawImage: IRawImage, nextAnnotationId: number,
                                   activeLabel: ICategory) {
  if (activeAnnotation === undefined) {
    annotationFacade.setActiveAnnotation({
      annotationMode: AnnotationMode.POLYGON,
      segmentations: [
        (value.clientX - canvasEl.getBoundingClientRect().left) / canvasEl.width,
        (value.clientY - canvasEl.getBoundingClientRect().top) / canvasEl.height
      ],
      isCrowd: false,
      image: activeRawImage,
      area: -1,
      boundingBox: undefined,
      categoryLabel: activeLabel,
      id: nextAnnotationId,
      isVisible: true
    });
  }
}

export function onMouseMovePolygon(value: MouseEvent, canvasEl: HTMLCanvasElement, ctx: CanvasRenderingContext2D,
                                   activeAnnotation: IImageAnnotation, currentImageAnnotations: IImageAnnotation[],
                                   activeRawImage: IRawImage, activeLabel: ICategory, currentlyDrawing: boolean) {

  ctx.strokeStyle = activeLabel.colorCode;

  if (activeRawImage !== undefined) {
    drawExistingPolygonAnnotations(canvasEl, currentImageAnnotations, activeRawImage, currentlyDrawing, ctx);
  }

  if (activeAnnotation !== undefined && activeAnnotation.annotationMode === AnnotationMode.POLYGON) {
    drawPointsOfPolygonAnnotation(canvasEl, activeAnnotation, ctx, currentlyDrawing, '');

    const actualX = activeAnnotation.segmentations[activeAnnotation.segmentations.length - 2] * canvasEl.width;
    const actualY = activeAnnotation.segmentations[activeAnnotation.segmentations.length - 1] * canvasEl.height;

    const actualMouseX = value.clientX - canvasEl.getBoundingClientRect().left;
    const actualMouseY = value.clientY - canvasEl.getBoundingClientRect().top;

    ctx.beginPath();
    ctx.moveTo(actualX, actualY);
    ctx.lineTo(actualMouseX, actualMouseY);
    ctx.stroke();
  }
}

export function onMouseUpPolygon(lastPos: { x: number; y: number }, value: MouseEvent, canvasEl: HTMLCanvasElement,
                                 currentImageAnnotations: IImageAnnotation[], annotationFacade: AnnotationFacade) {
  annotationFacade.addPointsToActivePolygonAnnotation({
    x: (value.clientX - canvasEl.getBoundingClientRect().left) / canvasEl.width,
    y: (value.clientY - canvasEl.getBoundingClientRect().top) / canvasEl.height
  });
}

export function drawPointsOfPolygonAnnotation(canvasEl: HTMLCanvasElement, annotation: IImageAnnotation, ctx: CanvasRenderingContext2D,
                                              currentlyDrawing: boolean, name: string) {

  ctx.strokeStyle = annotation.categoryLabel.colorCode;

  for (let i = 2; i <= annotation.segmentations.length; i += 2) {
    ctx.beginPath();
    const pointBeforeX = annotation.segmentations[i - 2] * canvasEl.width;
    const pointBeforeY = annotation.segmentations[i - 1] * canvasEl.height;
    if (i === 2) {
      drawAnnotationHeader(ctx, pointBeforeX, pointBeforeY, ctx.strokeStyle, name);
      ctx.moveTo(pointBeforeX, pointBeforeY);
    }
    if (i + 2 <= annotation.segmentations.length) {
      ctx.lineTo(pointBeforeX, pointBeforeY);
      ctx.lineTo(annotation.segmentations[i] * canvasEl.width, annotation.segmentations[i + 1] * canvasEl.height);
    } else if (currentlyDrawing === false) {
      ctx.lineTo(pointBeforeX, pointBeforeY);
      ctx.lineTo(annotation.segmentations[0] * canvasEl.width, annotation.segmentations[1] * canvasEl.height);
    }
    ctx.fill();
    ctx.stroke();
  }
}

export function fillExistingPolygonAnnotations(canvasEl: HTMLCanvasElement, currentImageAnnotations: IImageAnnotation[],
                                               activeRawImage: IRawImage, ctx: CanvasRenderingContext2D, opacity: number) {
  for (const item of currentImageAnnotations) {
    if (activeRawImage !== undefined
      && item.annotationMode === AnnotationMode.POLYGON
      && item.isVisible
      && item.image.id === activeRawImage.id) {
      fillShape(canvasEl, item, ctx, opacity);
    }
  }
}

export function drawExistingPolygonAnnotations(canvasEl: HTMLCanvasElement, currentImageAnnotations: IImageAnnotation[],
                                               activeRawImage: IRawImage, currentlyDrawing: boolean, ctx: CanvasRenderingContext2D) {

  for (const item of currentImageAnnotations) {
    if (activeRawImage !== undefined
      && item.annotationMode === AnnotationMode.POLYGON
      && item.isVisible
      && item.image.id === activeRawImage.id) {
      drawPointsOfPolygonAnnotation(canvasEl, item, ctx, currentlyDrawing,
        (currentImageAnnotations.indexOf(item) + 1) + ': ' + item.categoryLabel.name);
    }
  }
}

export function fillShape(canvasEl: HTMLCanvasElement, annotation: IImageAnnotation, ctx: CanvasRenderingContext2D, opacity: number) {

  if (annotation.segmentations.length > 0) {
    ctx.fillStyle = hexToRGB(annotation.categoryLabel.colorCode, opacity);
    ctx.beginPath();
    ctx.moveTo(annotation.segmentations[0] * canvasEl.width, annotation.segmentations[1] * canvasEl.height);
    for (let i = 2; i <= annotation.segmentations.length; i += 2) {
      ctx.lineTo(annotation.segmentations[i - 2] * canvasEl.width, annotation.segmentations[i - 1] * canvasEl.height);
    }
    ctx.fill();
  }
}
