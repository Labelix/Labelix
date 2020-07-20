import {Component, OnInit} from '@angular/core';
import {CocoFormatter} from '../../CoreLayer/CocoFormatter';
import {AnnotationFacade} from '../../AbstractionLayer/AnnotationFacade';
import {RawImageFacade} from '../../AbstractionLayer/RawImageFacade';
import {LabelCategoryFacade} from '../../AbstractionLayer/LabelCategoryFacade';
import {ICategory} from '../../../utility/contracts/ICategory';
import {IImageAnnotation} from '../../../utility/contracts/IImageAnnotation';
import {IFile} from '../../../utility/contracts/IFile';
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
              private http: HttpClient) {
  }

  description: string = undefined;
  contributor: string = undefined;
  inputUrl: string = undefined;

  url: SafeUrl = undefined;

  currentCategoryLabels: ICategory[];
  currentImageAnnotations: IImageAnnotation[];
  currentRawImages: IFile[];

  private cocoFormatter: CocoFormatter = new CocoFormatter();

  ngOnInit(): void {
    this.annotationFacade.currentImageAnnotations.subscribe(value => this.currentImageAnnotations = value);
    this.rawImageFacade.files$.subscribe(value => this.currentRawImages = value);
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
