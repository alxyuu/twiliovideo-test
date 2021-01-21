import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import App from "../components/twilio/App";
import AppStateProvider, { useAppState } from "../components/twilio/state";
import ErrorDialog from "../components/twilio/components/ErrorDialog/ErrorDialog";
import "../components/twilio/types";
import { VideoProvider } from "../components/twilio/components/VideoProvider";
import useConnectionOptions from "../components/twilio/utils/useConnectionOptions/useConnectionOptions";
import UnsupportedBrowserWarning from "../components/twilio/components/UnsupportedBrowserWarning/UnsupportedBrowserWarning";

const VideoApp = () => {
  const { error, setError } = useAppState();
  const connectionOptions = useConnectionOptions();

  return (
    <UnsupportedBrowserWarning>
      <VideoProvider options={connectionOptions} onError={setError}>
        <ErrorDialog dismissError={() => setError(null)} error={error} />
        <App />
      </VideoProvider>
    </UnsupportedBrowserWarning>
  );
};

const WrappedVideoApp = () => {
  return (
    <Router>
      <AppStateProvider>
        <Switch>
          <Route exact path="/">
            <VideoApp />
          </Route>
          <Route path="/room/:URLRoomName">
            <VideoApp />
          </Route>
          <Redirect to="/" />
        </Switch>
      </AppStateProvider>
    </Router>
  );
};

export default WrappedVideoApp;
