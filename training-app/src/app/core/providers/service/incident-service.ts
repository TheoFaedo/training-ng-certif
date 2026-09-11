import { HttpErrorResponse } from '@angular/common/http';
import { debounced, Service, Signal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { debounceTime, delay, distinctUntilChanged, map, of, switchMap, tap } from 'rxjs';
import { Incident, IncidentStatus } from '../../../shared/model/incident.model';
import { INCIDENTS } from './incidents.mock';

@Service()
export class IncidentService {
  private readonly _incidents = signal<Incident[]>(INCIDENTS);
  private readonly DELAY = 150;

  public readonly query = signal<string>('');
  public readonly allResource = this.generateAllResource(this.query);

  getById(id: string) {
    return of(null).pipe(
      delay(this.DELAY),
      switchMap(() => {
        const incident = this._incidents().find((i) => i.id === id);

        if (!incident) {
          throw new HttpErrorResponse({
            status: 404,
          });
        }

        return of(incident);
      }),
    );
  }

  private generateAllResource(query: Signal<string>) {
    const debouncedQuery = debounced(query, 500);

    return rxResource({
      params: () => ({
        query: debouncedQuery.value(),
      }),
      stream: ({ params }) => this.getAll(params.query),
    });
  }

  getAll(query: string = '') {
    return of(query).pipe(
      delay(this.DELAY),
      map((q) => this._incidents().filter((i) => i.title.toLowerCase().includes(q.toLowerCase()))),
    );
  }

  add(incidentDto: Omit<Incident, 'id' | 'createdAt' | 'updatedAt' | 'status'>) {
    return of(incidentDto).pipe(
      delay(this.DELAY),
      map((i) => ({
        ...i,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: crypto.randomUUID(),
        status: 'new' as IncidentStatus,
        assignee: null,
      })),
      tap((i) => this._incidents.update((previous) => [...previous, i])),
      tap(() => this.allResource.reload()),
    );
  }

  update(incidentDto: Omit<Incident, 'createdAt' | 'updatedAt'>) {
    return of(null).pipe(
      delay(this.DELAY),
      switchMap(() => {
        const incident = this._incidents().find((i) => i.id === incidentDto.id);

        if (!incident) {
          throw new HttpErrorResponse({
            status: 404,
          });
        }

        return of(incident);
      }),
      map((existing) => ({
        ...existing,
        ...incidentDto,
        updatedAt: new Date(),
      })),
      tap((i) =>
        this._incidents.update((previous) => {
          const index = previous.findIndex((inc) => inc.id == i.id);

          return [...previous.slice(0, index), i, ...previous.slice(index + 1)];
        }),
      ),
      tap(() => this.allResource.reload()),
    );
  }

  remove(id: string) {
    return of(id).pipe(
      delay(this.DELAY),
      tap((_id) => this._incidents.update((prev) => prev.filter((i) => i.id !== _id))),
      tap(() => this.allResource.reload()),
    );
  }
}
