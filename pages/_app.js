import "../styles/globals.css";
import Layout from "../components/Layout.jsx";
import { toast } from "react-hot-toast";
import { StateContext } from "../context/StateContext.js";

function MyApp({ Component, pageProps }) {
	return (
		<StateContext>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</StateContext>
	);
}

export default MyApp;
