import {AnnotationFacade} from '../../../AbstractionLayer/AnnotationFacade';
import {AnnotaionMode} from '../../../CoreLayer/annotaionModeEnum';
import {ICategory} from '../../../../utility/contracts/ICategory';
import {drawHandle, hexToRGB, setCanvasDimensions} from './drawingUtilLogic';
import {IRawImage} from '../../../../utility/contracts/IRawImage';
import {IBoundingBox} from '../../../../utility/contracts/IBoundingBox';

export function onMouseDownBoundingBoxen(lastPos, value: MouseEvent, canvasEl: HTMLCanvasElement) {
  lastPos.x = (value.clientX - canvasEl.getBoundingClientRect().left);
  lastPos.y = (value.clientY - canvasEl.getBoundingClientRect().top);
}

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
    annotationMode: AnnotaionMode.BOUNDING_BOXES,
  });
  console.log((tmpX * activeRawImage.width / activeRawImage.width * canvasEl.width)
    + (tmpX * activeRawImage.width / activeRawImage.width * canvasEl.width / 2));
}

export function drawBoundingBox(
  boundingBox: IBoundingBox,
  canvasEl: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  activeRawImage: IRawImage) {

  ctx.beginPath();
  ctx.fillRect(
    boundingBox.xCoordinate / activeRawImage.width * canvasEl.width,
    boundingBox.yCoordinate / activeRawImage.height * canvasEl.height,
    boundingBox.width / activeRawImage.width * canvasEl.width,
    boundingBox.height / activeRawImage.height * canvasEl.height
  );
  ctx.rect(
    boundingBox.xCoordinate / activeRawImage.width * canvasEl.width,
    boundingBox.yCoordinate / activeRawImage.height * canvasEl.height,
    boundingBox.width / activeRawImage.width * canvasEl.width,
    boundingBox.height / activeRawImage.height * canvasEl.height
  );
  ctx.stroke();
}

export function drawExistingAnnotationsBoundingBoxes(
  canvasEl: HTMLCanvasElement,
  elements,
  ctx: CanvasRenderingContext2D,
  activeRawImage: IRawImage,
  opacity: number) {
  setCanvasDimensions(canvasEl);
  for (const item of elements) {
    if (item.annotationMode === AnnotaionMode.BOUNDING_BOXES
      && item.image !== undefined
      && activeRawImage !== undefined
      && item.image.id === activeRawImage.id) {
      ctx.strokeStyle = item.categoryLabel.colorCode;
      ctx.fillStyle = hexToRGB(item.categoryLabel.colorCode, opacity);
      drawBoundingBox(item.boundingBox, canvasEl, ctx, activeRawImage);
      // drawHandle(item.boundingBox.xCoordinate / activeRawImage.width * canvasEl.width + g)
    }
  }
}
