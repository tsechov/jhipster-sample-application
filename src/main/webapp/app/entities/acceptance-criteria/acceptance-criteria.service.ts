import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAcceptanceCriteria } from 'app/shared/model/acceptance-criteria.model';

type EntityResponseType = HttpResponse<IAcceptanceCriteria>;
type EntityArrayResponseType = HttpResponse<IAcceptanceCriteria[]>;

@Injectable({ providedIn: 'root' })
export class AcceptanceCriteriaService {
    public resourceUrl = SERVER_API_URL + 'api/acceptance-criteria';

    constructor(protected http: HttpClient) {}

    create(acceptanceCriteria: IAcceptanceCriteria): Observable<EntityResponseType> {
        return this.http.post<IAcceptanceCriteria>(this.resourceUrl, acceptanceCriteria, { observe: 'response' });
    }

    update(acceptanceCriteria: IAcceptanceCriteria): Observable<EntityResponseType> {
        return this.http.put<IAcceptanceCriteria>(this.resourceUrl, acceptanceCriteria, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAcceptanceCriteria>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAcceptanceCriteria[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
