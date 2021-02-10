import {CanDeactivate} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {LeavePageDialogComponent} from '../../presentation-layer/image-annotation/leave-page-dialog/leave-page-dialog.component';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable()
export class PendingChangesGuard implements CanDeactivate<ComponentCanDeactivate> {

  constructor(private dialog: MatDialog) {
  }

  canDeactivate(component: ComponentCanDeactivate): boolean | Observable<boolean> {

    return component.canDeactivate() ?
      true :
      this.openDialog();
  }

  private openDialog(): Observable<boolean> {
    const dialogRef = this.dialog.open(LeavePageDialogComponent);
    return dialogRef.afterClosed();
  }
}
