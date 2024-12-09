import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Role } from "../interfaces/role.model";

@Injectable({
    providedIn: 'root'
})
export class RoleService {

    private apiUrl = 'http://localhost:8081/api/roles'; // Asegúrate de que esta URL apunte a tu backend

    constructor(private http: HttpClient) { }

    getRoles(): Observable<Role[]> {
        return this.http.get<Role[]>(this.apiUrl);
    }
}