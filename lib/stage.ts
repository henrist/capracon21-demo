import * as cdk from "@aws-cdk/core"
import { Capracon21DemoStack } from "./capracon21-demo-stack"

export class ServiceStage extends cdk.Stage {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props)

    new Capracon21DemoStack(this, "Service", {
      stackName: `Capracon21Demo${id}`,
    })
  }
}