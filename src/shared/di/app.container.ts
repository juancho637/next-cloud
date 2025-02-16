import 'reflect-metadata';
import {Container} from 'inversify';
import { ApiClient } from '../services/api-client.service';

export const appContainer = new Container();

appContainer.bind<ApiClient>("ApiClient").toDynamicValue(() => new ApiClient(process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000"));
