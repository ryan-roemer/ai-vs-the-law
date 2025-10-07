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

export const Icon = ({ name, fill = true }) =>
  html`<i class="ph${fill ? "-fill" : ""} ph-${name}"></i>`;

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
