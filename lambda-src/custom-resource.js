const AWS = require('aws-sdk');
const response = require('cfn-response');
const { Route53Client, GetHostedZoneCommand } = require('@aws-sdk/client-route-53');
const route53 = new Route53Client({apiVersion: '2012-11-05'});



exports.handler = (event, context, cb) => {
  console.log(JSON.stringify(event));
  const error = (err) => {
    console.log(JSON.stringify(err));
    response.send(event, context, response.FAILED);
  };
  if (event.RequestType === 'Delete') {
    response.send(event, context, response.SUCCESS);
  } else if (event.RequestType === 'Create' || event.RequestType === 'Update') {
    route53.send(new GetHostedZoneCommand({
      Id: event.ResourceProperties.HostedZoneId
    }), (err, data) => {
      if (err) {
        error(err);
      } else {
        response.send(event, context, response.SUCCESS, {
          Name: data.HostedZone.Name.replace(/\.$/, '')
        }, event.ResourceProperties.HostedZoneId);
      }
    });
  } else {
    error(new Error(`unsupported request type: ${event.RequestType}`));
  }
};
