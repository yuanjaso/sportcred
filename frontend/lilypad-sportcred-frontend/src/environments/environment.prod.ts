export interface EnviromentConfigs {
  production: boolean;
  backendUrl: string;
  apiVersion: number;
  urlProcessor: Function;
}
export const environment: EnviromentConfigs = {
  production: false,
  backendUrl: 'http://127.0.0.1:8000/api',
  apiVersion: 1,
  //easily editable if scheme changes in the future
  urlProcessor: (url: string): string =>
    `${environment.backendUrl}/v${environment.apiVersion}/${url}/`,
};
