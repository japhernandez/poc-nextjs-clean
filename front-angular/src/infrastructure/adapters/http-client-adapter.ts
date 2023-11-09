import {
  HttpClientRepository,
  HttpRequest,
  HttpResponse,
} from '@/domain/entities/contracts/http-client-repository';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export class HttpClientAdapter implements HttpClientRepository {
  constructor(private httpClient: HttpClient) {}

  async request(data: HttpRequest): Promise<HttpResponse> {
    const headers = new HttpHeaders(data.headers);

    try {
      const response = await firstValueFrom(
        this.httpClient.request(data.method, data.url, {
          body: data.body,
          headers: headers,
          observe: 'response',
        })
      );

      const responseBody = response?.body;

      return {
        statusCode: 200,
        body: responseBody
      };
    } catch (error: any) {
      throw error;
    }
  }
}
