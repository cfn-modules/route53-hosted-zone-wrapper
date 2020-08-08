# cfn-modules: AWS Route53 hosted zone (wrapper)

AWS Route53 hosted zone wrapper for existing zones.

## Install

> Install [Node.js and npm](https://nodejs.org/) first!

```
npm i @cfn-modules/route53-hosted-zone-wrapper
```

## Usage

```
---
AWSTemplateFormatVersion: '2010-09-09'
Description: 'cfn-modules example'
Resources:
  HostedZone:
    Type: 'AWS::CloudFormation::Stack'
    Properties:
      Parameters:
        Id: 'ZQ9I4T2TI3HJ5' # required
      TemplateURL: './node_modules/@cfn-modules/route53-hosted-zone-wrapper/module.yml'
```

## Examples

none

## Related modules

* [route53-hosted-zone-private](https://github.com/cfn-modules/route53-hosted-zone-private)
* [route53-hosted-zone-public](https://github.com/cfn-modules/route53-hosted-zone-public)

## Parameters

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Default</th>
      <th>Required?</th>
      <th>Allowed values</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Id</td>
      <td>The id of the hosted zone</td>
      <td></td>
      <td>yes</td>
      <td></td>
    </tr>
  </tbody>
</table>
