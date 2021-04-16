import * as elbv2 from '@aws-cdk/aws-elasticloadbalancingv2';
import * as ec2 from "@aws-cdk/aws-ec2"
import * as ecs from "@aws-cdk/aws-ecs"
import * as route53 from "@aws-cdk/aws-route53"
import * as ecsPatterns from "@aws-cdk/aws-ecs-patterns"
import * as cdk from "@aws-cdk/core"

export class Capracon21DemoStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const serviceDomain = "cc21.henrist.dev"

    const zone = route53.HostedZone.fromLookup(this, "HostedZone", {
      domainName: "cc21.henrist.dev",
    })

    const vpc = new ec2.Vpc(this, "Vpc", {
      natGateways: 0,
      maxAzs: 2,
    })

    const service = new ecsPatterns.ApplicationLoadBalancedFargateService(this, "Service", {
      vpc,
      desiredCount: 2,
      taskImageOptions: {
        image: ecs.ContainerImage.fromAsset("app"),
      },
      domainZone: zone,
      domainName: serviceDomain,
      protocol: elbv2.ApplicationProtocol.HTTPS,
      redirectHTTP: true,
      assignPublicIp: true,
      taskSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
    })

    service.targetGroup.setAttribute(
      "deregistration_delay.timeout_seconds",
      "10",
    )
    
    service.targetGroup.configureHealthCheck({
      interval: cdk.Duration.seconds(10),
      healthyThresholdCount: 2,
    })
  }
}
