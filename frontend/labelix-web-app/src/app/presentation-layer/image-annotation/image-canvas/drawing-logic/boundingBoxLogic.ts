import {AnnotationFacade} from '../../../../abstraction-layer/AnnotationFacade';
import {AnnotationMode} from '../../../../core-layer/utility/annotation-mode-enum';
import {ICategory} from '../../../../core-layer/contracts/ICategory';
import {drawAnnotationHeader, hexToRGB, setCanvasDimensions} from './drawingUtilLogic';
import {IRawImage} from '../../../../core-layer/contracts/IRawImage';
import {IBoundingBox} from '../../../../core-layer/contracts/IBoundingBox';
import {IImageAnnotation} from '../../../../core-layer/contracts/IImageAnnotation';

// set the starting position of the bounding box
export function onMouseDownBoundingBoxen(lastPos, value: MouseEvent, canvasEl: HTMLCanvasElement) {
  lastPos.x = (value.clientX - canvasEl.getBoundingClientRect().left);
  lastPos.y = (value.clientY - canvasEl.getBoundingClientRect().top);
}

// this function is responsible for drawing the bounding box while the user manually drawing the bounding box
export function onMouseMoveBoundingBoxen(
  lastPos,
  value: MouseEvent,
  canvasEl: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  activeLabel: ICategory,
  opacity: number) {

  ctx.strokeStyle = activeLabel.colorCode;
  ctx.fillStyle = hexToRGB(activeLabel.colorCode, opacity);

  const width = ((value.clientX - canvasEl.getBoundingClientRect().left) - lastPos.x);
  const height = ((value.clientY - canvasEl.getBoundingClientRect().top) - lastPos.y);

  ctx.beginPath();
  ctx.fillRect(lastPos.x, lastPos.y, width, height);
  ctx.rect(lastPos.x, lastPos.y, width, height);
  ctx.stroke();
}

export function onMouseUpBoundingBoxen(
  lastPos,
  value: MouseEvent,
  canvasEl: HTMLCanvasElement,
  annotationFacade: AnnotationFacade,
  activeRawImage: IRawImage,
  nextAnnotationId: number,
  activeLabel: ICategory) {

  const tmpX: number = lastPos.x / canvasEl.width;
  const tmpY: number = lastPos.y / canvasEl.height;
  const tmpWidth: number = ((value.clientX - canvasEl.getBoundingClientRect().left) - lastPos.x) / canvasEl.width;
  const tmpHeight: number = ((value.clientY - canvasEl.getBoundingClientRect().top) - lastPos.y) / canvasEl.height;

  annotationFacade.addImageAnnotation({
    boundingBox: {
      width: tmpWidth * activeRawImage.width,
      height: tmpHeight * activeRawImage.height,
      xCoordinate: tmpX * activeRawImage.width,
      yCoordinate: tmpY * activeRawImage.height
    },
    segmentations: [],
    isCrowd: false,
    image: activeRawImage,
    id: nextAnnotationId,
    categoryLabel: activeLabel,
    area: -1,
    annotationMode: AnnotationMode.BOUNDING_BOXES,
    isVisible: true
  });
}

export function drawBoundingBox(
  boundingBox: IBoundingBox,
  canvasEl: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  activeRawImage: IRawImage,
  name: string) {

  if (boundingBox !== undefined) {
    const actualX = boundingBox.xCoordinate / activeRawImage.width * canvasEl.width;
    const actualY = boundingBox.yCoordinate / activeRawImage.height * canvasEl.height;
    const actualWidth = boundingBox.width / activeRawImage.width * canvasEl.width;
    const actualHeight = boundingBox.height / activeRawImage.height * canvasEl.height;
    ctx.beginPath();
    ctx.fillRect(actualX, actualY, actualWidth, actualHeight);
    ctx.rect(actualX, actualY, actualWidth, actualHeight);
    ctx.stroke();
    drawAnnotationHeader(ctx, actualX, actualY, ctx.strokeStyle.toString(), name);
  }
}

export function drawExistingAnnotationsBoundingBoxes(
  canvasEl: HTMLCanvasElement,
  elements: IImageAnnotation[],
  ctx: CanvasRenderingContext2D,
  activeRawImage: IRawImage,
  opacity: number) {
  setCanvasDimensions(canvasEl);
  for (const item of elements) {
    if (item.annotationMode === AnnotationMode.BOUNDING_BOXES
      && item.image !== undefined
      && activeRawImage !== undefined
      && item.isVisible
      && item.image.id === activeRawImage.id) {
      ctx.strokeStyle = item.categoryLabel.colorCode;
      ctx.fillStyle = hexToRGB(item.categoryLabel.colorCode, opacity);
      drawBoundingBox(item.boundingBox, canvasEl, ctx, activeRawImage, (elements.indexOf(item) + 1) + ': ' + item.categoryLabel.name);
    }
  }
}
