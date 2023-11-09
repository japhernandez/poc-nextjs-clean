import {AxiosAdapter} from "@/infrastructure/adapters/axios-adapter";
import {HttpClientRepository} from "@/domain/entities/contracts/http-client-repository";

export const makeAxiosHttpClient = (): HttpClientRepository => new AxiosAdapter();