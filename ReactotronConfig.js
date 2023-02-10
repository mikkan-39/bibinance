import Reactotron from "reactotron-react-native";

Reactotron.configure() // controls connection & communication settings
  .useReactNative({
    networking: {
      ignoreUrls: /symbolicate|127.0.0.1|logs/,
    },
    overlay: false, // just turning off overlay
  }) // add all built-in react native plugins
  .connect(); // let's connect!
