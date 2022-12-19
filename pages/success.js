import { useState, useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";

import { useStateContext } from "../context/StateContext";
import { runFireworks } from "../lib/utils";

function Success() {
	const { setCartItems, setTotalPrice, setTotalQuantities } =
		useStateContext();

	useEffect(() => {
		localStorage.clear();
		setCartItems([]);
		setTotalPrice(0);
		setTotalQuantities(0);
		runFireworks();
	}, []);

	return (
		<div className="success-wrapper">
			<div className="success">
				<p className="icon">
					<BsBagCheckFill />
				</p>
				<h2>Gracias por tu compra! 😀</h2>
				<p className="email-msg">Revisa tu correo para el recibo 📧</p>
				<p className="description">
					Si tienes alguna pregunta, escribenos!
					<a className="email" href="mailto:galdoustares@gmail.com">
						galdoustares@gmail.com
					</a>
				</p>

				{/* Link */}
				<Link href="/">
					<button type="button" width="300px" className="btn">
						Continua Comprando
					</button>
				</Link>
			</div>
		</div>
	);
}

export default Success;
