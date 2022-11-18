import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs/operators";
import { CoursesHttpService } from "../services/courses-http.service";
import { CourseActions } from "./action-types";

@Injectable()
export class CourseEffects {

  loadCourses$ = createEffect(
    () => this.actions$.pipe(
      ofType(CourseActions.loadAllCourses),
      concatMap((action) => 
        this.coursesHttpService.findAllCourses()
      ),
      map((courses) => CourseActions.allCoursesLoaded({ courses }))
    )
  );

  saveCourse$ = createEffect(
    () => this.actions$.pipe(
      ofType(CourseActions.courseUpdated),
      concatMap((action) => 
        this.coursesHttpService.saveCourse(action.update.id, action.update.changes)
      )
    ), { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private coursesHttpService: CoursesHttpService ) { }
}