import {Component, OnInit} from '@angular/core';
import {CocoFormatController} from '../../../core-layer/controller/CocoFormatController';
import {AnnotationFacade} from '../../../abstraction-layer/AnnotationFacade';
import {RawImageFacade} from '../../../abstraction-layer/RawImageFacade';
import {LabelCategoryFacade} from '../../../abstraction-layer/LabelCategoryFacade';
import {ICategory} from '../../../core-layer/utility/contracts/ICategory';
import {IImageAnnotation} from '../../../core-layer/utility/contracts/IImageAnnotation';
import {IRawImage} from '../../../core-layer/utility/contracts/IRawImage';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-single-annotation-export-form',
  templateUrl: './single-annotation-export-form.component.html',
  styleUrls: ['./single-annotation-export-form.component.css']
})
export class SingleAnnotationExportFormComponent implements OnInit {

  constructor(private annotationFacade: AnnotationFacade,
              private rawImageFacade: RawImageFacade,
              private labelCategoryFacade: LabelCategoryFacade,
              private sanitizer: DomSanitizer,
              private cocoFormatter: CocoFormatController) {
  }

  description: string = undefined;
  contributor: string = undefined;
  inputUrl: string = undefined;

  url: SafeUrl = undefined;

  currentCategoryLabels: ICategory[];
  currentImageAnnotations: IImageAnnotation[];
  currentRawImages: IRawImage[];

  ngOnInit(): void {
    this.annotationFacade.currentImageAnnotations.subscribe(value => this.currentImageAnnotations = value);
    this.rawImageFacade.rawImages$.subscribe(value => this.currentRawImages = value);
    this.labelCategoryFacade.labelCategories$.subscribe(value => this.currentCategoryLabels = value);
  }

  onExport() {
    const jsonObject = JSON.stringify({
      categories: this.cocoFormatter.createListOfICocoCategory(this.currentCategoryLabels),
      annotations: this.cocoFormatter.getCocoAnnotations(this.currentImageAnnotations),
      licenses: [this.cocoFormatter.getTestLicense()],
      images: this.cocoFormatter.createListOfICocoImages(this.currentRawImages),
      info: {
        year: 2020,
        description: this.description,
        version: '1.0',
        url: this.inputUrl,
        dateCreated: new Date(Date.now()),
        contributor: this.contributor
      }
    });

    this.url = this.sanitizer.bypassSecurityTrustUrl('data:text/json;charset=UTF-8,' + jsonObject);
  }

}
