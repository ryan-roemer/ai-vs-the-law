import { Fragment, createElement } from "react";
import htm from "htm";
import {
  Slide,
  Heading,
  CodePane,
  FlexBox,
  Box,
  FullScreen,
  AnimatedProgress,
  Grid,
  Text,
} from "spectacle";
import { LiveEditor, LivePreview, LiveError, LiveProvider } from "react-live";
import { themes } from "prism-react-renderer";
import { theme, colors } from "./theme.js";

const html = htm.bind(createElement);

// Icon components
export const icon = (args) => {
  const {
    name,
    fill = true,
    color,
  } = typeof args === "object" ? args : { name: args };
  return `<i class="ph${fill ? "-fill" : ""} ph-${name}" ${color ? `style="color: ${color}"` : ""}></i>`;
};

export const iconArrow = icon({
  name: "arrow-right",
  fill: false,
  color: theme.colors.quaternary,
});

export const Icon = ({ name, fill = true, color }) =>
  html`<i class="ph${fill ? "-fill" : ""} ph-${name}" style=${{ color }}></i>`;

export const IconLink = ({ name, href, fill = false, color }) => html`
  <a href=${href} style=${{ color, textDecoration: "none" }}
    ><${Icon} name=${name} fill=${fill}
  /></a>
`;

// Text styling components
export const em = (text) =>
  `<span style="color: ${theme.colors.secondary};">${text}</span>`;

export const Em = ({ children }) =>
  html`<span style=${{ color: theme.colors.secondary }}>${children}</span>`;

export const Template = ({ color = "#fff", slideNumber } = {}) => {
  return html`
    <${FlexBox}
      justifyContent="space-between"
      position="absolute"
      bottom=${0}
      width=${1}
    >
      <${Box} padding="0 1em">
        <${FullScreen} color=${color} />
      <//>
      <${Box} padding="1em">
        <${slideNumber === 1 ? Fragment : AnimatedProgress} color=${color} />
      <//>
    <//>
  `;
};

// Slide components
export const JsSlide = ({ title, code }) => html`
  <${Slide}>
    <${Heading} fontSize="h3" style=${{ margin: "0" }}>${title}</${Heading}>
    <${CodePane} language="javascript" showLineNumbers=${true} >${code}</${CodePane}>
  </${Slide}>
`;

export const TopicSlide = ({
  backgroundUrl,
  fontSize = "8em",
  children,
  ...rest
}) => html`
  <${Slide}
    ...${
      backgroundUrl
        ? {
            backgroundImage: `url(${backgroundUrl})`,
            backgroundOpacity: 0.4,
            backgroundColor: colors.basics.black,
          }
        : {}
    }
    ...${rest}
  >
    <${FlexBox} height="100%" flexDirection="column" alignSelf="center" justifyContent="center" alignItems="center">
      <${Heading} fontSize=${fontSize} color="primary">
        ${children}
      </${Heading}>
    </${FlexBox}>
  </${Slide}>
`;

// Code editor component
export const CodeEditor = ({ code }) => html`
  <${LiveProvider}
    code=${code}
    language="javascript"
    theme=${themes.vsDark}
  >
    <div className="code-editor-container">
      <${LiveEditor}
        className="react-live-editor"
        style=${{
          minHeight: "400px",
          maxHeight: "400px",
        }}
      />
      <${LiveError}
        className="react-live-error"
      />
      <${LivePreview}
        className="react-live-preview"
        style=${{
          minHeight: "50px",
          maxHeight: "50px",
        }}
      />
    </div>
  </${LiveProvider}>
`;

// Case slide component
export const CaseSlide = ({ title, facts = [], holdings = [] }) => {
  const factsCount = Math.max(facts.length, 1);
  const holdingsCount = Math.max(holdings.length, 1);
  const totalRows = factsCount + holdingsCount;
  const gridRows = `repeat(${totalRows}, 1fr)`;

  return html`
    <${Slide}>
      <${Heading}>${title}</${Heading}>
      <${FlexBox} justifyContent="center" alignItems="center">
        <${Grid}
          gridTemplateColumns="1fr 1fr 1fr 1fr"
          gridTemplateRows=${gridRows}
          gridGap="20px"
          width="100%"
        >
          <!-- Facts label - spans all facts rows -->
          <${Box}
            gridRow=${`1 / ${factsCount + 1}`}
            border="1px solid #fff"
            padding="15px"
            borderRadius="8px"
          >
            <${Text} color="secondary" fontSize="2.5em" textAlign="center">
              Facts
            </${Text}>
          </${Box}>

          <!-- Facts content cells -->
          ${facts.map((fact, i) => html`
            <${Box}
              key=${`facts-content-${i}`}
              gridRow=${i + 1}
              gridColumn="2"
              border="1px solid #fff"
              padding="15px"
              borderRadius="8px"
            >
              <${Text} color="primary" fontSize="1.2em">
                ${fact}
              </${Text}>
            </${Box}>
          `)}

          <!-- Holdings label - spans all holdings rows -->
          <${Box}
            gridRow=${`${factsCount + 1} / ${totalRows + 1}`}
            border="1px solid #fff"
            padding="15px"
            borderRadius="8px"
          >
            <${Text} color="secondary" fontSize="2.5em" textAlign="center">
              Holding
            </${Text}>
          </${Box}>

          <!-- Holdings content cells -->
          ${holdings.map((holding, i) => html`
            <${Box}
              key=${`holdings-content-${i}`}
              gridRow=${factsCount + i + 1}
              gridColumn="4"
              border="1px solid #fff"
              padding="15px"
              borderRadius="8px"
            >
              <${Text} color="primary" fontSize="1.2em">
                ${holding}
              </${Text}>
            </${Box}>
          `)}
        </${Grid}>
      </${FlexBox}>
    </${Slide}>
  `;
};
