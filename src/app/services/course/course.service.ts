import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiServerUrl=environment.baseUrl;
  constructor(private http : HttpClient) { }
  getCourses() : Observable<Course[]>{
    return this.http.get<Course[]>(`${this.apiServerUrl}/course/retrieve-all-courses`);
  }


  editCourse(course: Course){
    return this.http.put<Course>(`${this.apiServerUrl}/course/modify-course`,course);
  }

  addCourse(course:Course,logId:number,username:string): Observable<Course>{
    return this.http.post<Course>(`${this.apiServerUrl}/course/add-course/${logId}/${username}`,course);
  }

  deleteCourseById(id:number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/course/remove-course/${id}`);
  }

  getTodaysCourses() : Observable<Course[]>{
    return this.http.get<Course[]>(`${this.apiServerUrl}/course/today`);
  }

  getCoursesByUser(login:string) : Observable<Course[]>{
    return this.http.get<Course[]>(`${this.apiServerUrl}/course/retrieve-course/${login}`);
  }

  getCoursesByDate(startDate: Date, endDate: Date) : Observable<Course[]>{
    return this.http.get<Course[]>(`${this.apiServerUrl}/course/retrieve-course-date/${startDate}/${endDate}`);
  }

  getCoursesByNumCourse(numCourse:number) : Observable<Course>{
    return this.http.get<Course>(`${this.apiServerUrl}/course/get-course/${numCourse}`);
  }

  updateCourse(course: Course,logId:number,username:string){
    return this.http.put<Course>(`${this.apiServerUrl}/course/update-course/${logId}/${username}`,course);
  }

  getCoursesByAgent(login:string) : Observable<Course[]>{
    return this.http.get<Course[]>(`${this.apiServerUrl}/course/get-courseAgent/${login}`);
  }

  countCourses(login:string) : Observable<number>{
    return this.http.get<number>(`${this.apiServerUrl}/course/count-courses/${login}`);
  }

  sumPrixCourses(login:string) : Observable<number>{
    return this.http.get<number>(`${this.apiServerUrl}/course/prix-courses/${login}`);
  }

}
