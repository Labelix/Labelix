export interface ICocoAnnotation {
  id: number;
  imageId: number;
  categoryId: number;
  segmentation: number[];
  area: number;
  bbox: number[];
  iscrowd: boolean;
}
