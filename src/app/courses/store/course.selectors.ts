import { createFeatureSelector, createSelector } from "@ngrx/store";
import { courseFeatureKey, CoursesState } from "./reducers/course.reducers";

import * as fromCourses from './reducers/course.reducers';

export const selectCourseState = createFeatureSelector<CoursesState>(courseFeatureKey);

export const selectAllCourses = createSelector(
  selectCourseState,
  fromCourses.selectAll
);

export const selectBeginnerCourses = createSelector(
  selectAllCourses,
  (courses) => courses.filter(course => course.category == 'BEGINNER')
);

export const selectAdvancedCourses = createSelector(
  selectAllCourses,
  (courses) => courses.filter(course => course.category == 'ADVANCED')
);

export const selectIntermediateCourses = createSelector(
  selectAllCourses,
  (courses) => courses.filter(course => course.category == 'INTERMEDIATE')
)

export const selectPromoTotal = createSelector(
  selectAllCourses,
  (courses) => courses.filter(course => course.promo).length
);

export const areCoursesLoaded = createSelector(
  selectCourseState,
  (state) => state.allCoursesLoaded
)