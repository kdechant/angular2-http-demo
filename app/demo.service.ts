import {Injectable} from '@angular/core';
import {HTTP_PROVIDERS, Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from 'rxjs/Rx';

@Injectable()
export class DemoService {

    constructor(private http:Http) {
    }

    // Uses http.get() to load a single JSON file
    getFoods() {
        return this.http.get('/app/food.json').map((res:Response) => res.json());
    }

    // Uses Observable.forkJoin() to run multiple concurrent http.get() requests.
    // The entire operation will result in an error state if any single request fails.
    getBooksAndMovies() {
        return Observable.forkJoin(
        this.http.get('/app/books.json').map((res:Response) => res.json()),
        this.http.get('/app/movies.json').map((res:Response) => res.json())
        );
    }

    createFood(food) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        let body = JSON.stringify(food);
        // Note: This is only an example. The following API call will fail because there is no actual API to talk to.
        return this.http.post('/api/food/', body, headers).map((res:Response) => res.json());
    }

    updateFood(food) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        let body = JSON.stringify(food);
        // Note: This is only an example. The following API call will fail because there is no actual API to talk to.
        return this.http.put('/api/food/' + food.id, body, headers).map((res:Response) => res.json());
    }

    deleteFood(food) {
        // Note: This is only an example. The following API call will fail because there is no actual API to talk to.
        return this.http.delete('/api/food/' + food.id);
    }

}
