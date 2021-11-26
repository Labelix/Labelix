import {Component, OnDestroy, OnInit} from '@angular/core';
import {CocoFormatHelper} from '../../../core-layer/utility/helper/coco-format-helper.service';
import {AnnotationFacade} from '../../../abstraction-layer/AnnotationFacade';
import {RawImageFacade} from '../../../abstraction-layer/RawImageFacade';
import {LabelCategoryFacade} from '../../../abstraction-layer/LabelCategoryFacade';
import {ICategory} from '../../../core-layer/contracts/ICategory';
import {IImageAnnotation} from '../../../core-layer/contracts/IImageAnnotation';
import {IRawImage} from '../../../core-layer/contracts/IRawImage';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-single-annotation-export-form',
  templateUrl: './single-annotation-export-form.component.html',
  styleUrls: ['./single-annotation-export-form.component.css']
})
export class SingleAnnotationExportFormComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  description: string | undefined = undefined;
  contributor: string | undefined = undefined;
  inputUrl: string | undefined = undefined;

  url: SafeUrl | undefined = undefined;

  currentCategoryLabels: ICategory[];
  currentImageAnnotations: IImageAnnotation[];
  currentRawImages: IRawImage[];

  constructor(private annotationFacade: AnnotationFacade,
              private rawImageFacade: RawImageFacade,
              private labelCategoryFacade: LabelCategoryFacade,
              private sanitizer: DomSanitizer,
              private cocoFormatter: CocoFormatHelper) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription.add(this.annotationFacade.currentImageAnnotations.subscribe(value => this.currentImageAnnotations = value));
    this.subscription.add(this.rawImageFacade.rawImages$.subscribe(value => this.currentRawImages = value));
    this.subscription.add(this.labelCategoryFacade.labelCategories$.subscribe(value => this.currentCategoryLabels = value));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
