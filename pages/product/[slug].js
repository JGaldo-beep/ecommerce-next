import { useState } from "react";

import { client, urlFor } from "../../lib/client";
import {
	AiOutlineMinus,
	AiOutlinePlus,
	AiFillStar,
	AiOutlineStar,
} from "react-icons/ai";
import { Product } from "../../components";
import { useStateContext } from "../../context/StateContext";
import { Toaster } from "react-hot-toast";

function ProductDetails({ product, products }) {
	const { image, name, details, price } = product;
	const [index, setIndex] = useState(0);

	const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext(); // from StateContext.js

	const handleBuyNow = () => {
		onAdd(product, qty);
		setShowCart(true);
	};

	return (
		<div>
			<Toaster />
			<div className="product-detail-container">
				<div>
					<div className="image-container">
						<img
							src={urlFor(image && image[index])}
							className="product-detail-image"
						/>
					</div>

					{/* image  */}
					<div className="small-images-container">
						{image?.map((item, i) => (
							<img
								key={i}
								src={urlFor(item)}
								className={
									i === index
										? "small-image selected-image"
										: "small-image"
								}
								onMouseEnter={() => setIndex(i)}
							/>
						))}
					</div>
				</div>

				<div className="product-detail-desc">
					<h1>{name}</h1>
					<div className="reviews">
						<div>
							<AiFillStar />
							<AiFillStar />
							<AiFillStar />
							<AiFillStar />
							<AiOutlineStar />
						</div>

						<p>(20)</p>
					</div>
					<h4>Detalle: </h4>
					<p>{details}</p>
					<p className="price">Bs. {price}</p>
					<div className="quantity">
						<h3>Cantidad:</h3>
						<p className="quantity-desc">
							<span className="minus" onClick={decQty}>
								<AiOutlineMinus />
							</span>
							<span className="num">{qty}</span>
							<span className="plus" onClick={incQty}>
								<AiOutlinePlus />
							</span>
						</p>
					</div>

					<div className="buttons">
						<button
							type="button"
							className="add-to-cart"
							onClick={() => onAdd(product, qty)}
						>
							Agregar al carrito
						</button>
						<button
							type="button"
							className="buy-now"
							onClick={handleBuyNow}
						>
							Comprar ahora
						</button>
					</div>
				</div>
			</div>

			{/* ALso like */}
			<div className="maylike-products-wrapper">
				<h2>También te puede interesar</h2>
				<div className="marquee">
					<div className="maylike-products-container track">
						{products.map(product => (
							<Product key={product._id} product={product} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

// That means to return the current slug of the product, not all the data
export const getStaticPaths = async () => {
	const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

	const products = await client.fetch(query);
	const paths = products.map(product => ({
		// That's because we'll return an object ()
		params: {
			slug: product.slug.current,
		},
	}));

	return {
		paths,
		fallback: "blocking",
	};
};

export const getStaticProps = async ({ params: { slug } }) => {
	const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
	const productsQuery = '*[_type == "product"]';

	const product = await client.fetch(query);
	const products = await client.fetch(productsQuery);

	return {
		props: { product, products },
	};
};

export default ProductDetails;
