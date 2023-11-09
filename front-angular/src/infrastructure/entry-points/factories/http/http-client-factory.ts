import { HttpClientRepository } from '@/domain/entities/contracts/http-client-repository';
import { HttpClientAdapter } from '@/infrastructure/adapters/http-client-adapter';
import {
  HttpClient,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpXhrBackend,
} from '@angular/common/http';

export const makeHttpClientFactory = (): HttpClientRepository =>
  new HttpClientAdapter(
    new HttpClient(
      new CustomHttpHandler(
        [],
        new HttpXhrBackend({ build: () => new XMLHttpRequest() })
      )
    )
  );

/**
 * Creamos la clase CustomHttpHandler que extiende HttpHandler.
 * En el constructor de la clase, recibimos un array de interceptores y
 * el siguiente HttpHandler. Luego, implementamos el método handle que
 * utiliza los interceptores para manipular la solicitud antes de enviarla
 * al siguiente HttpHandler.
 */
export class CustomHttpHandler extends HttpHandler {
  constructor(
    private interceptors: HttpInterceptor[],
    private next: HttpHandler
  ) {
    super();
  }

  handle(
    req: HttpRequest<any>
  ): import('rxjs').Observable<import('@angular/common/http').HttpEvent<any>> {
    const chain = this.interceptors.reduceRight(
      (next, interceptor) => new HttpInterceptorHandler(next, interceptor),
      this.next
    );
    return chain.handle(req);
  }
}

/**
 * Creamos la clase HttpInterceptorHandler que implementa HttpHandler.
 * Esta clase se utiliza para encadenar los interceptores en el orden correcto.
 */
class HttpInterceptorHandler implements HttpHandler {
  constructor(
    private next: HttpHandler,
    private interceptor: HttpInterceptor
  ) {}

  handle(
    req: HttpRequest<any>
  ): import('rxjs').Observable<import('@angular/common/http').HttpEvent<any>> {
    return this.interceptor.intercept(req, this.next);
  }
}
