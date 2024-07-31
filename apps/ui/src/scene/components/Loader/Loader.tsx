import "./Loader.css";
export function Loader(props: { message?: string }) {
	return (
		<div className="text-center">
			<span className="ouro ouro3">
				<span className="left">
					<span className="anim"></span>
				</span>
				<span className="right">
					<span className="anim"></span>
				</span>
			</span>
			{props.message && <div>{props.message}</div>}
		</div>
	);
}
