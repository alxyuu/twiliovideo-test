import React from "react";
import dynamic from "next/dynamic";

import { CssBaseline } from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core/styles";

import theme from "../components/twilio/theme";
import "../components/twilio/types";
const VideoApp = dynamic(() => import("../components/VideoApp"), {
  ssr: false,
});

export default function Home() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <VideoApp />
    </MuiThemeProvider>
  );
}
