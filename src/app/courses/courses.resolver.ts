import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, finalize, first, tap } from "rxjs/operators";
import { AppState } from "../reducers";
import { CourseActions } from "./store/action-types";
import { areCoursesLoaded } from "./store/course.selectors";

// Resolver para disparar action de carregar cursos apenas uma vez, Evitando diversas requests para o backend.
@Injectable()
export class CoursesResolver implements Resolve<any> {
  loading: boolean = false;

  constructor(private store: Store<AppState>) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
      return this.store.pipe(
        select(areCoursesLoaded),
        tap((coursesLoaded) => {
          if (!this.loading && !coursesLoaded) {
            this.loading = true;
            this.store.dispatch(CourseActions.loadAllCourses());
          }
        }),
        filter((coursesLoaded) => coursesLoaded),
        first(),
        finalize(() => this.loading = false)
      );
  }
}