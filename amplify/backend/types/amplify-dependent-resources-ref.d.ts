export type AmplifyDependentResourcesAttributes = {
  "api": {
    "parkingInsultsApi": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    },
    "parknarcs": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string",
      "GraphQLAPIKeyOutput": "string"
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
    "insultGenerator": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
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