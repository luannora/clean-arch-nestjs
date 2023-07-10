import {
  IActivateTag,
  IActivateTagParams,
  ICancelTagParams,
  IGetTagParams,
  IGreenpassAdapter,
  IOpenDispute,
  IOpenDisputeParams,
  IReleaseTagParams,
  IReplaceTagParams,
  IReturnGreenpass,
} from '@domain/adapters/greenpass-adapter/greenpass-adapter';
import { HttpService } from '@nestjs/axios';
import { Agent } from 'https';

export class GreenPassAdapter implements IGreenpassAdapter {
  constructor(private readonly httpService: HttpService) {}

  async getTag(data: IGetTagParams): Promise<any> {
    const httpsAgent = this.getHttpsAgent();
    const res = await this.httpService
      .get(`${process.env.GREENPASS_URL}/api/tags/${data.tagNumber}/details`, {
        httpsAgent,
      })
      .toPromise();
    return res.data;
  }

  async blockTag(tagNumber: string): Promise<IReturnGreenpass> {
    const httpsAgent = this.getHttpsAgent();
    const res = await this.httpService
      .put(
        `${process.env.GREENPASS_URL}/api/tags/${tagNumber}/block`,
        {},
        { httpsAgent },
      )
      .toPromise();
    return res.data;
  }

  async activateTag(data: IActivateTagParams): Promise<any> {
    const httpsAgent = this.getHttpsAgent();
    const body = {
      blocked: false,
      vehicle: {
        licensePlate: data.licensePlate,
        categoryCode: data.categoryCode,
      },
      billing: {
        invoiceGroupCode: `${process.env.GREENPASS_INVOICE_GROUP_CODE}`,
      },
    };
    const res = await this.httpService
      .put(
        `${process.env.GREENPASS_URL}/api/tags/${data.tagNumber}/activate`,
        body,
        { httpsAgent },
      )
      .toPromise();
    console.log(res);
    return res.data;
  }
  async releaseTag(data: IReleaseTagParams): Promise<IActivateTag> {
    const httpsAgent = this.getHttpsAgent();

    const res = await this.httpService
      .put(
        `${process.env.GREENPASS_URL}/api/tags/${data.tagNumber}/unblock`,
        { statusId: data.statusId ?? 100 },
        { httpsAgent },
      )
      .toPromise();
    return res.data;
  }
  async cancelTag(data: ICancelTagParams): Promise<IActivateTag> {
    const httpsAgent = this.getHttpsAgent();

    const res = await this.httpService
      .put(
        `${process.env.GREENPASS_URL}/api/tags/${data.tagNumber}/cancel`,
        { statusId: data.statusId ?? 300 },
        { httpsAgent },
      )
      .toPromise();
    return res.data;
  }
  async replaceTag(data: IReplaceTagParams): Promise<IActivateTag> {
    const httpsAgent = this.getHttpsAgent();

    const res = await this.httpService
      .put(
        `${process.env.GREENPASS_URL}/api/tags/${data.tagNumber}/replace`,
        { newSerialNumber: data.newTagNumber },
        { httpsAgent },
      )
      .toPromise();
    return res.data;
  }

  async openDispute(data: IOpenDisputeParams): Promise<IOpenDispute> {
    const httpsAgent = this.getHttpsAgent();

    const res = await this.httpService
      .post(
        `${process.env.GREENPASS_URL}/api/transactions/${data.transactionId}/dispute`,
        data,
        { httpsAgent },
      )
      .toPromise();
    return res.data;
  }

  async changeVehicleTag(
    tagNumber: string,
    licensePlate: string,
    categoryCode?: string,
  ): Promise<IReturnGreenpass> {
    const httpsAgent = this.getHttpsAgent();
    const res = await this.httpService
      .patch(
        `${process.env.GREENPASS_URL}/api/tags/${tagNumber}/vehicle`,
        { licensePlate: licensePlate, categoryCode },
        { httpsAgent },
      )
      .toPromise();
    return res.data;
  }

  async changeInvoiceGroupTag(
    tagNumber: string,
    invoiceGroup: string,
  ): Promise<IReturnGreenpass> {
    const httpsAgent = this.getHttpsAgent();
    const res = await this.httpService
      .patch(
        `${process.env.GREENPASS_URL}/api/tags/${tagNumber}/billing`,
        { invoiceGroupCode: invoiceGroup },
        { httpsAgent },
      )
      .toPromise();
    return res.data;
  }

  private getHttpsAgent(): Agent {
    const fs = require('fs');
    const httpsAgent = new Agent();
    httpsAgent.options.pfx = fs.readFileSync(
      `${process.env.GREENPASS_CERT_PATH}`,
    );
    httpsAgent.options.passphrase = process.env.GREENPASS_CERT_PASSPHRASE;
    return httpsAgent;
  }
}
