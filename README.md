[![Build Status](https://travis-ci.org/cfn-modules/route53-hosted-zone-wrapper.svg?branch=master)](https://travis-ci.org/cfn-modules/route53-hosted-zone-wrapper)
[![NPM version](https://img.shields.io/npm/v/@cfn-modules/route53-hosted-zone-wrapper.svg)](https://www.npmjs.com/package/@cfn-modules/route53-hosted-zone-wrapper)

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
        Name: 'widdix.net' # required
      TemplateURL: './node_modules/@cfn-modules/route53-hosted-zone-wrapper/module.yml'
```

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
    <tr>
      <td>Name</td>
      <td>The name of the hosted zone</td>
      <td></td>
      <td>yes</td>
      <td></td>
    </tr>
  </tbody>
</table>
