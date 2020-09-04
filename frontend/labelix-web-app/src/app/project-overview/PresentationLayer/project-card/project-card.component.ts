import {Component, Input, OnInit} from '@angular/core';
import {IProject} from '../../../utility/contracts/IProject';
import {Router} from '@angular/router';
import {AnnotationFacade} from '../../../image-annotation/AbstractionLayer/AnnotationFacade';
import {ProjectsFacade} from '../../AbstractionLayer/ProjectsFacade';
import {RawImageFacade} from '../../../image-annotation/AbstractionLayer/RawImageFacade';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {

  @Input()
  myProject: IProject;

  constructor(public router: Router,
              private annotationFacade: AnnotationFacade,
              private projectFacade: ProjectsFacade,
              private rawImageFacade: RawImageFacade) {
  }

  ngOnInit(): void {
  }

  onStartAnnotating(event): void {
    this.projectFacade.getProjectObservableNyId(this.myProject.id).subscribe(value => {
      this.rawImageFacade.clearRawImages();
      let imageIdCounter = 0;
      this.rawImageFacade.addRawImagesToState(value.images.map(entry => {
        imageIdCounter++;
        return {
          id: imageIdCounter,
          base64Url: entry.Data,
          width: -1,
          height: -1,
          file: undefined
        };
      }));
      this.annotationFacade.replaceActiveProject(value);
      this.annotationFacade.changeCurrentAnnotationImage({
        id: value.images[0].id,
        base64Url: value.images[0].Data,
        width: -1,
        height: -1,
        file: undefined
      });
    });
    this.router.navigate(['/image-annotation/image-view']);
  }

}
