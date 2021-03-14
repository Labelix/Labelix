
export function hexToRGB(hex, alpha): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
  } else {
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }
}

export function setCanvasDimensions(canvasEl: HTMLCanvasElement) {
  canvasEl.height = canvasEl.getBoundingClientRect().bottom - canvasEl.getBoundingClientRect().top;
  canvasEl.width = canvasEl.getBoundingClientRect().right - canvasEl.getBoundingClientRect().left;
}

export function  drawHandle(x: number, y: number, ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.strokeStyle = 'white';
  ctx.rect(x - 4,
    y - 4,
    8, 8);
  ctx.stroke();
}

// this function is responsible for drawing the text on top of the annotation to display the identity of the annotation
export function drawAnnotationHeader(ctx: CanvasRenderingContext2D, actualX: number, actualY: number, colorCode: string, name: string) {
  ctx.beginPath();
  ctx.font = '16px Roboto';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'bottom';
  ctx.fillStyle = colorCode;
  ctx.fillText(name, actualX, actualY);
  ctx.stroke();
}
