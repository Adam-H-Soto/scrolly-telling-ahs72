import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { IntegrationDiagram } from "@/components/visualization/IntegrationDiagram";
import { TimelineStat } from "@/components/visualization/TimelineStat";
import { FlowChart } from "@/components/visualization/FlowChart";
import { CodeSample } from "@/components/visualization/CodeSample";
import { StatGrid, type StatItem } from "@/components/ui/StatGrid";
import { Timeline, type TimelineItem } from "@/components/visualization/Timeline";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContextualLink } from "@/components/ui/ContextualLink";
import { Reveal } from "@/components/motion/Reveal";
import { LayeredRevealGroup } from "@/components/motion/LayeredRevealGroup";
import { SceneCard } from "@/components/ui/SceneCard";
import yaml from "js-yaml";

function parseYamlSource(children: React.ReactNode): unknown {
  const text = String(children).trimEnd();
  try {
    return yaml.load(text);
  } catch {
    return null;
  }
}

const Pre = ({ children }: { children?: React.ReactNode }) => {
  const child = React.Children.only(children) as React.ReactElement<{
    className?: string;
    children?: React.ReactNode;
  }>;

  if (!child || child.type !== "code") {
    return <pre>{children}</pre>;
  }

  const { className, children: code } = child.props;
  const lang = (className ?? "").replace("language-", "");
  const source = String(code ?? "").trimEnd();

  switch (lang) {
    case "integration-diagram":
      return <IntegrationDiagram source={source} />;
    case "timeline-stat":
      return <TimelineStat source={source} />;
    case "flow-chart":
      return <FlowChart source={source} />;
    case "stat-grid": {
      const items = parseYamlSource(code) as StatItem[] | null;
      return items ? <StatGrid items={items} /> : <CodeSample language={lang}>{code}</CodeSample>;
    }
    case "timeline": {
      const items = parseYamlSource(code) as TimelineItem[] | null;
      return items ? <Timeline items={items} /> : <CodeSample language={lang}>{code}</CodeSample>;
    }
    default:
      return <CodeSample language={lang || undefined}>{code}</CodeSample>;
  }
};

const Blockquote = ({ children }: { children?: React.ReactNode }) => {
  const text = extractText(children);
  if (text.startsWith("eyebrow:")) {
    return <Eyebrow>{text.replace("eyebrow:", "").trim()}</Eyebrow>;
  }
  return <blockquote>{children}</blockquote>;
};

function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (React.isValidElement(node)) {
    const el = node as React.ReactElement<{ children?: React.ReactNode }>;
    return extractText(el.props.children);
  }
  return "";
}

const components = {
  pre: Pre,
  blockquote: Blockquote,
  Reveal,
  LayeredRevealGroup,
  ContextualLink,
  SceneCard,
  StatGrid,
};

interface MarkdownRendererProps {
  source: string;
}

export function MarkdownRenderer({ source }: MarkdownRendererProps) {
  return (
    <MDXRemote
      source={source}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      }}
      components={components}
    />
  );
}
