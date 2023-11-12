import {PropsWithChildren} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

export default function ReactQueryContainer(props: PropsWithChildren) {
	const queryClient = new QueryClient();

	return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>;
}
