import { OutputBase } from '#adapter/outputBase'
type BaseResponse = {
  statusCode: number;
  body: string;
}

class ResponseBuilder {
  build (output: OutputBase<any>): BaseResponse {
    const { success } = output
    console.info('[I] BODY RESPONSE', output)
    return {
      statusCode: success ? 200 : 500,
      body: JSON.stringify(output)
    } as BaseResponse

  }
}

export default new ResponseBuilder()
