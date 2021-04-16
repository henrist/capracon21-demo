#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Capracon21DemoStack } from '../lib/capracon21-demo-stack';

const app = new cdk.App();

import { PipelineStack } from "../lib/pipeline"
new PipelineStack(app, "Capracon21DemoPipeline", {
  env: {
    account: "607103741379",
    region: "eu-central-1",
  },
})
