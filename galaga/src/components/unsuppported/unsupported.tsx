export default function Unsupported() {
	return (
		<div
			style={{
				width: "100vw",
				height: "100vh",
				backgroundColor: "#14151d",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<h3
				style={{
					color: "white",
					width: "80vw",
					lineHeight: "30px",
				}}
			>
				Sorry, our game is currently not supported on devices smaller than
				1024 pixels
			</h3>
		</div>
	);
}
