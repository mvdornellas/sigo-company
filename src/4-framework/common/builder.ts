import { OutputBase, ApplicationError } from '#adapter/outputBase'
type BaseResponse = {
  statusCode: number;
  body: string;
}

class Builder {
  response (output: OutputBase<any>): BaseResponse {
    const { success, errors } = output
    console.info('[I] BODY RESPONSE', output)
    let statusCode = success ? 200 : 500

    if (errors && Array.isArray(errors) && errors.some((appError: ApplicationError) => appError.code)) {
      statusCode = 409
    }

    return {
      statusCode,
      headers: {
        'Access-Control-Allow-Origin' : '*', // Required for CORS support to work
        'Access-Control-Allow-Credentials' : true, // Required for cookies, authorization headers with HTTPS
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(output)
    } as BaseResponse
  }

}

export default new Builder()
