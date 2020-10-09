import {IImageAnnotation} from '../../../../utility/contracts/IImageAnnotation';
import {AnnotationFacade} from '../../../AbstractionLayer/AnnotationFacade';
import {IRawImage} from '../../../../utility/contracts/IRawImage';
import {AnnotaionMode} from '../../../CoreLayer/annotaionModeEnum';
import {ICategory} from '../../../../utility/contracts/ICategory';
import {hexToRGB} from './drawingUtilLogic';

export function onMouseDownPolygon(
  value: MouseEvent,
  canvasEl: HTMLCanvasElement,
  activeAnnotation: IImageAnnotation,
  annotationFacade: AnnotationFacade,
  activeRawImage: IRawImage,
  nextAnnotationId: number,
  activeLabel: ICategory) {
  if (activeAnnotation === undefined) {
    annotationFacade.setActiveAnnotation({
      annotationMode: AnnotaionMode.POLYGON,
      segmentations: [
        (value.clientX - canvasEl.getBoundingClientRect().left) / canvasEl.width,
        (value.clientY - canvasEl.getBoundingClientRect().top) / canvasEl.height
      ],
      isCrowd: false,
      image: activeRawImage,
      area: -1,
      boundingBox: undefined,
      categoryLabel: activeLabel,
      id: nextAnnotationId
    });
  }
}

export function onMouseMovePolygon(
  value: MouseEvent,
  canvasEl: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  activeAnnotation: IImageAnnotation,
  currentImageAnnotations: IImageAnnotation[],
  activeRawImage: IRawImage,
  activeLabel: ICategory,
  currentlyDrawing: boolean) {

  ctx.strokeStyle = activeLabel.colorCode;

  drawExistingPolygonAnnotations(canvasEl, currentImageAnnotations, activeRawImage, currentlyDrawing, ctx);

  if (activeAnnotation !== undefined && activeAnnotation.annotationMode === AnnotaionMode.POLYGON) {
    drawPointsOfPolygonAnnotation(canvasEl, activeAnnotation, ctx, currentlyDrawing);

    ctx.beginPath();
    ctx.moveTo(activeAnnotation.segmentations[activeAnnotation.segmentations.length - 2]
      * canvasEl.width,
      activeAnnotation.segmentations[activeAnnotation.segmentations.length - 1]
      * canvasEl.height);
    ctx.lineTo((value.clientX - canvasEl.getBoundingClientRect().left),
      (value.clientY - canvasEl.getBoundingClientRect().top));
    ctx.stroke();
  }
}

export function onMouseUpPolygon(
  lastPos: { x: number; y: number },
  value: MouseEvent,
  canvasEl: HTMLCanvasElement,
  currentImageAnnotations: IImageAnnotation[],
  annotationFacade: AnnotationFacade) {
  annotationFacade.addPointsToActivePolygonAnnotation({
    x: (value.clientX - canvasEl.getBoundingClientRect().left) / canvasEl.width,
    y: (value.clientY - canvasEl.getBoundingClientRect().top) / canvasEl.height
  });
}

export function drawPointsOfPolygonAnnotation(
  canvasEl: HTMLCanvasElement,
  annotation: IImageAnnotation,
  ctx: CanvasRenderingContext2D,
  currentlyDrawing: boolean) {
  ctx.strokeStyle = annotation.categoryLabel.colorCode;
  for (let i = 2; i <= annotation.segmentations.length; i += 2) {
    ctx.beginPath();
    if (i === 2) {
      ctx.moveTo(annotation.segmentations[i - 2] * canvasEl.width, annotation.segmentations[i - 1] * canvasEl.height);
    }
    if (i + 2 <= annotation.segmentations.length) {
      ctx.lineTo(annotation.segmentations[i - 2] * canvasEl.width, annotation.segmentations[i - 1] * canvasEl.height);
      ctx.lineTo(annotation.segmentations[i] * canvasEl.width, annotation.segmentations[i + 1] * canvasEl.height);
    } else if (currentlyDrawing === false) {
      ctx.lineTo(annotation.segmentations[i - 2] * canvasEl.width, annotation.segmentations[i - 1] * canvasEl.height);
      ctx.lineTo(annotation.segmentations[0] * canvasEl.width, annotation.segmentations[1] * canvasEl.height);
    }
    ctx.fill();
    ctx.stroke();
  }
}

export function fillExistingPolygonAnnotations(
  canvasEl: HTMLCanvasElement,
  currentImageAnnotations: IImageAnnotation[],
  activeRawImage: IRawImage,
  ctx: CanvasRenderingContext2D,
  opacity: number) {
  for (const item of currentImageAnnotations) {
    if (item.annotationMode === AnnotaionMode.POLYGON
      && item.image.id === activeRawImage.id) {
      fillShape(canvasEl, item, ctx, opacity);
    }
  }
}

export function drawExistingPolygonAnnotations(
  canvasEl: HTMLCanvasElement,
  currentImageAnnotations: IImageAnnotation[],
  activeRawImage: IRawImage,
  currentlyDrawing: boolean,
  ctx: CanvasRenderingContext2D) {

  for (const item of currentImageAnnotations) {
    if (item.annotationMode === AnnotaionMode.POLYGON
      && item.image.id === activeRawImage.id) {
      drawPointsOfPolygonAnnotation(canvasEl, item, ctx, currentlyDrawing);
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
