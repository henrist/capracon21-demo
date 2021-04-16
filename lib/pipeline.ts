import * as codepipeline from "@aws-cdk/aws-codepipeline"
import * as codepipeline_actions from "@aws-cdk/aws-codepipeline-actions"
import * as cdk from "@aws-cdk/core"
import * as pipelines from "@aws-cdk/pipelines"
import { ServiceStage } from "./stage"

export class PipelineStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const sourceArtifact = new codepipeline.Artifact()
    const cloudAssemblyArtifact = new codepipeline.Artifact()

    const pipeline = new pipelines.CdkPipeline(this, "Pipeline", {
      pipelineName: "capracon21-demo",
      cloudAssemblyArtifact,
      sourceAction: new codepipeline_actions.GitHubSourceAction({
        actionName: "GitHub",
        output: sourceArtifact,
        oauthToken: cdk.SecretValue.secretsManager("github-token"),
        owner: "henrist",
        repo: "capracon21-demo",
      }),
      synthAction: pipelines.SimpleSynthAction.standardNpmSynth({
        sourceArtifact,
        cloudAssemblyArtifact,
      }),
    })

    pipeline.addApplicationStage(
      new ServiceStage(this, "Prod", {
        env: {
          account: "607103741379",
          region: "eu-central-1",
        },
      }),
    )
  }
}