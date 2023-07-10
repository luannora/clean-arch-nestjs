import { IGetCepAdapter } from '@domain/adapters/get-cep-adapter/get-cep.adapter';
import { HttpService } from '@nestjs/axios';

export class GetCepAdapter implements IGetCepAdapter {
  constructor(private readonly httpService: HttpService) {}

  async getCep(zipCode: string): Promise<any> {
    let res = await this.httpService
      .get(`https://api.postmon.com.br/v1/cep/${zipCode}`)
      .toPromise();
    try {
      let objetoRes = {
        district: res.data.bairro,
        city: res.data.cidade,
        street: res.data.logradouro,
        state_info: {
          area_km2: res.data.estado_info.area_km2,
          ibge_code: res.data.estado_info.codigo_ibge,
          name: res.data.estado_info.nome,
        },
        cep: res.data.cep,
        city_info: {
          area_km2: res.data.cidade_info.area_km2,
          ibge_code: res.data.cidade_info.codigo_ibge,
        },
        state: res.data.estado,
      };

      return objetoRes;
    } catch (err) {
      console.log(err);
    }
  }
}
