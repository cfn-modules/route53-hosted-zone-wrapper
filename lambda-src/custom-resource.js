const AWS = require('aws-sdk');
const response = require('cfn-response');
const route53 = new AWS.Route53({apiVersion: '2013-04-01'});

exports.handler = (event, context, cb) => {
  console.log(JSON.stringify(event));
  const error = (err) => {
    console.log(JSON.stringify(err));
    response.send(event, context, response.FAILED);
  };
  if (event.RequestType === 'Delete') {
    response.send(event, context, response.SUCCESS);
  } else if (event.RequestType === 'Create' || event.RequestType === 'Update') {
    route53.getHostedZone({
      Id: event.ResourceProperties.HostedZoneId
    }, (err, data) => {
      if (err) {
        error(err);
      } else {
        response.send(event, context, response.SUCCESS, {
          Name: data.HostedZone.Name
        });
      }
    });
  } else {
    error(new Error(`unsupported request type: ${event.RequestType}`));
  }
};
