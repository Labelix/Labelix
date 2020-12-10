import {Component, Input, OnInit} from '@angular/core';
import {IProject} from '../../../utility/contracts/IProject';
import {Router} from '@angular/router';
import {AnnotationFacade} from '../../../image-annotation/AbstractionLayer/AnnotationFacade';
import {ProjectsFacade} from '../../AbstractionLayer/ProjectsFacade';
import {RawImageFacade} from '../../../image-annotation/AbstractionLayer/RawImageFacade';
import {LabelCategoryFacade} from '../../../image-annotation/AbstractionLayer/LabelCategoryFacade';
import {CocoFormatController} from '../../../image-annotation/CoreLayer/controller/CocoFormatController';
import {ImageServiceService} from '../../CoreLayer/services/image-service.service';
import {IImage} from '../../../utility/contracts/IImage';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {

  @Input()
  myProject: IProject;
  firstImage: IImage;

  constructor(public router: Router,
              private annotationFacade: AnnotationFacade,
              private categoryFacade: LabelCategoryFacade,
              private projectFacade: ProjectsFacade,
              private rawImageFacade: RawImageFacade,
              private cocoController: CocoFormatController,
              private imageService: ImageServiceService) {
  }

  ngOnInit(): void {
    // tslint:disable-next-line:max-line-length
    this.imageService.getImageByProjectId(this.myProject.id).subscribe(value => {this.firstImage = value;     console.log(this.firstImage); });
  }

  onStartAnnotating(): void {
    this.annotationFacade.changeCurrentAnnotationImage(undefined);
    this.router.navigate(['/image-annotation/image-view']);
    this.projectFacade.getProjectObservableNyId(this.myProject.id).subscribe(value => {
      // sorry for that ugly thing but it works for now, I guess
      setTimeout(() => this.onProjectLoad(value), 10);
    });
  }

  onProjectLoad(input) {
    this.annotationFacade.resetAnnotationState();
    this.rawImageFacade.clearRawImages();
    this.addRawImages(input);
    let coco;
    if (input.label !== null && input.label !== '') {
      coco = JSON.parse(input.label);
      this.cocoController.getCategoriesFromCocoFormat(coco).forEach(value => this.categoryFacade.addLabelCategory(value));
    }
    this.setActiveProject(input, coco);
    this.setCurrentAnnotationImage(input);
  }

  addRawImages(input) {
    this.rawImageFacade.addRawImagesToState(input.images.map(entry => {
      return {
        id: entry.id,
        base64Url: entry.Data,
        width: -1,
        height: -1,
        file: undefined,
        name: entry.Name
      };
    }));
  }

  setCurrentAnnotationImage(input) {
    if (input.images.length > 0) {
      this.annotationFacade.changeCurrentAnnotationImage({
        id: input.images[0].id,
        base64Url: input.images[0].Data,
        // height and width can only be defined if base64 code is read in a image
        width: -1,
        height: -1,
        file: undefined,
        name: input.images[0].Name
      });
    }
  }

  setActiveProject(input, coco) {
    this.annotationFacade.replaceActiveProject({
      label: input.label,
      cocoExport: input.label !== '' && input.label !== null ? coco : undefined,
      id: input.id,
      timestamp: input.timestamp,
      images: input.images,
      AIModelConfig: input.AIModelConfig,
      finishedAnnotation: input.finishedAnnotation,
      name: input.name,
      creationDate: input.creationDate,
      description: input.description
    });
  }

}
