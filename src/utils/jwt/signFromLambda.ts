import { InvokeCommand, LambdaClient } from '@aws-sdk/client-lambda';

const lambdaClient = new LambdaClient({ region: process.env.AWS_REGION });

export const jwtSignFromLambda = async (payload) => {
  const command = new InvokeCommand({
    FunctionName: process.env.AUTHORIZER_GENERATE_TOKEN_FUNC,
    Payload: JSON.stringify(payload),
  });

  const { Payload } = await lambdaClient.send(command);
  const payloadStr = Buffer.from(Payload).toString('utf-8');
  const { token } = JSON.parse(payloadStr);
  return token;
};
