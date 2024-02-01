export type AmplifyDependentResourcesAttributes = {
  "api": {
    "parknarcs": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string"
    }
  },
  "auth": {
    "parknarcs500dcef4": {
      "AppClientID": "string",
      "AppClientIDWeb": "string",
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "UserPoolArn": "string",
      "UserPoolId": "string",
      "UserPoolName": "string"
    }
  },
  "custom": {
    "imagesCloudFront": {
      "myCloudFrontDistributionDomainName": "string"
    }
  },
  "function": {
    "S3Triggera885db02": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    },
    "parknarcsawsSDKLayer": {
      "Arn": "string"
    },
    "parknarcssharpLayer": {
      "Arn": "string"
    }
  },
  "storage": {
    "parkNarcsImagesBucket": {
      "BucketName": "string",
      "Region": "string"
    },
    "parknarcsDb": {
      "Arn": "string",
      "Name": "string",
      "PartitionKeyName": "string",
      "PartitionKeyType": "string",
      "Region": "string",
      "SortKeyName": "string",
      "SortKeyType": "string",
      "StreamArn": "string"
    }
  }
}