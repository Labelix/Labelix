import {Component, Input, OnInit} from '@angular/core';
import {IProject} from '../../../core-layer/utility/contracts/IProject';
import {Router} from '@angular/router';
import {AnnotationFacade} from '../../../abstraction-layer/AnnotationFacade';
import {ProjectsFacade} from '../../../abstraction-layer/ProjectsFacade';
import {RawImageFacade} from '../../../abstraction-layer/RawImageFacade';
import {LabelCategoryFacade} from '../../../abstraction-layer/LabelCategoryFacade';
import {CocoFormatController} from '../../../core-layer/controller/CocoFormatController';
import {IImage} from '../../../core-layer/utility/contracts/IImage';
import {ImageApi} from '../../../core-layer/services/image-api.service';

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
              private imageService: ImageApi) {
  }

  ngOnInit(): void {
    // tslint:disable-next-line:max-line-length
    this.imageService.getImageByProjectId(this.myProject.id).subscribe(value => {this.firstImage = value; });
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
    this.rawImageFacade.clearRawImagesOnState();
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

  onDeleteClicked() {
    this.projectFacade.deleteProject(this.myProject);
  }
}
