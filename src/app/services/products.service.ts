import { Injectable } from "@angular/core";
import { AppHttpService } from "./app-http.service";

@Injectable()
export class ProductsService extends AppHttpService {

    override builder(resource: string = '') {
        return super.builder(resource);
    }
}