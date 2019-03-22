import * as Keycloak from 'keycloak-js';

export class KeycloakConfig {
    public url: string;
    public realm: string;
    public clientId: string;
    public initOptions: Keycloak.KeycloakInitOptions;
}
