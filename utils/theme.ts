import { type ThemeConfig,extendTheme } from "@chakra-ui/react";

const config: ThemeConfig = {
	useSystemColorMode: true,
	cssVarPrefix: "_c",
};

const theme = extendTheme({
	config,
	// other theme config,
});

export default theme;
