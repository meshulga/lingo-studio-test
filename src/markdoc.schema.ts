import Markdoc, {
  type Config,
  type RenderableTreeNode,
} from "@markdoc/markdoc";
import React, { type ComponentType } from "react";
import { Callout } from "@/components/markdoc/Callout";
import { BlogHero } from "@/components/markdoc/BlogHero";
import { Bento } from "@/components/markdoc/Bento";
import { BentoTile } from "@/components/markdoc/BentoTile";
import { BentoVideo } from "@/components/markdoc/BentoVideo";
import { BentoPayment } from "@/components/markdoc/BentoPayment";
import { BentoCode } from "@/components/markdoc/BentoCode";

export const schema: Config = {
  tags: {
    callout: {
      render: "Callout",
      attributes: {
        type: {
          type: String,
          default: "note",
          matches: ["note", "warning", "danger"],
        },
      },
    },
    "blog-hero": {
      render: "BlogHero",
      selfClosing: true,
      attributes: {
        brand: { type: String, default: "Markdoc" },
        version: { type: String },
      },
    },
    bento: {
      render: "Bento",
    },
    "bento-tile": {
      render: "BentoTile",
      attributes: {
        colSpan: { type: Number, default: 1 },
        rowSpan: { type: Number, default: 1 },
      },
    },
    "bento-video": {
      render: "BentoVideo",
      selfClosing: true,
      attributes: {
        label: { type: String },
      },
    },
    "bento-payment": {
      render: "BentoPayment",
      selfClosing: true,
      attributes: {
        amount: { type: String, default: "$40.00" },
        label: { type: String, default: "Pay now" },
      },
    },
    "bento-code": {
      render: "BentoCode",
      attributes: {
        language: { type: String, default: "html" },
      },
    },
  },
  nodes: {},
  variables: {},
};

export const components: Record<string, ComponentType<Record<string, unknown>>> = {
  Callout: Callout as ComponentType<Record<string, unknown>>,
  BlogHero: BlogHero as ComponentType<Record<string, unknown>>,
  Bento: Bento as ComponentType<Record<string, unknown>>,
  BentoTile: BentoTile as ComponentType<Record<string, unknown>>,
  BentoVideo: BentoVideo as ComponentType<Record<string, unknown>>,
  BentoPayment: BentoPayment as ComponentType<Record<string, unknown>>,
  BentoCode: BentoCode as ComponentType<Record<string, unknown>>,
};

export function renderMarkdoc(tree: RenderableTreeNode): React.ReactNode {
  return Markdoc.renderers.react(tree, React, { components });
}
