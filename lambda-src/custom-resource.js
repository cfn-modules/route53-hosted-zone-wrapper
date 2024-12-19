const { Route53Client, GetHostedZoneCommand } = require('@aws-sdk/client-route-53');
const route53 = new Route53Client({apiVersion: '2012-11-05'});

async function cfnCustomResourceSuccess(event, physicalResourceId, optionalData) {
  const response = await fetch(event.ResponseURL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      Status: 'SUCCESS',
      PhysicalResourceId: physicalResourceId,
      StackId: event.StackId,
      RequestId: event.RequestId,
      LogicalResourceId: event.LogicalResourceId,
      ...(optionalData !== undefined && {Data: optionalData})
    })
  });
  if (response.status !== 200) {
    console.log('response status', response.status);
    console.log('response', await response.text());
    throw new Error('unexpected status code');
  }
}

async function cfnCustomResourceFailed(event, physicalResourceId, optionalReason) {
  const response = await fetch(event.ResponseURL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      Status: 'FAILED',
      ...(optionalReason !== undefined && {Reason: optionalReason}),
      PhysicalResourceId: (physicalResourceId === undefined || physicalResourceId === null) ? event.LogicalResourceId : physicalResourceId, // physicalResourceId might not be available if create fails 
      StackId: event.StackId,
      RequestId: event.RequestId,
      LogicalResourceId: event.LogicalResourceId
    })
  });
  if (response.status !== 200) {
    console.log('response status', response.status);
    console.log('response', await response.text());
    throw new Error('unexpected status code');
  }
}

exports.handler = async (event, context, cb) => {
  console.log(JSON.stringify(event));
  try {
    if (event.RequestType === 'Delete') {
      await cfnCustomResourceSuccess(event, event.ResourceProperties.HostedZoneId);
    } else if (event.RequestType === 'Create' || event.RequestType === 'Update') {
      route53.send(new GetHostedZoneCommand({
        Id: event.ResourceProperties.HostedZoneId
      }));
      await cfnCustomResourceSuccess(event, event.ResourceProperties.HostedZoneId, {
        Name: data.HostedZone.Name.replace(/\.$/, '')
      });
    } else {
      error(new Error(`unsupported request type: ${event.RequestType}`));
    }
  } catch(err) {
    console.log(JSON.stringify(err));
    await cfnCustomResourceFailed(event);
  }
};
