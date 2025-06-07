import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as FormActions from './form.actions';
import { FormConfigService } from '../../core/services/form-config.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class FormEffects {
  private actions$ = inject(Actions);
  private formConfigService = inject(FormConfigService);

  loadFormConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FormActions.loadFormConfig),
      mergeMap(action =>
        this.formConfigService.getFormConfig(action.formId).pipe(
          map(config => FormActions.loadFormConfigSuccess({ config })),
          catchError(error => of(FormActions.loadFormConfigFailure({ error: error.message })))
        )
      )
    )
  );
}