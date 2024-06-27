import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from '@material-tailwind/react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

import { Link } from 'react-router-dom';
import unknown from '../../images/unknown.jpg';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

import { showAverage } from '../../functions/rating';
import numeral from 'numeral';


const ProductCard = ({ product }) => {

    //redux
    const { user, cart } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        //create cart array
        let cart = [];
        if (typeof window !== 'undefined') {
            //if cart is in local storage, GET
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
            }
            //push new products to cart
            cart.push({
                ...product,
                count: 1,
            });
            //remove duplicates
            let unique = _.uniqWith(cart, _.isEqual);
            //save to localstorage
            localStorage.setItem('cart', JSON.stringify(unique));


            //add to redux state
            dispatch({
                type: 'ADD_TO_CART',
                payload: unique,
            });

            //show cart item in side drawer
            dispatch({
                type: 'SET_VISIBLE',
                payload: true,
            });
        }
    };
    //destructure
    const { images, title, description, slug, price } = product;
    return (
        <Card className="w-72 h-[492px] hover:shadow-lg hover:scale-105 transition">
            <CardHeader shadow={false} floated={false} className="h-52">
                <img
                    src={images && images.length ? images[0].url : unknown}
                    alt={title}
                    className="h-full w-full object-cover"
                />
            </CardHeader>
            <CardBody>
                <div className="pb-2 flex items-center justify-between gap-x-2">
                    <p className="text-xl font-medium text-light-on-surface">{title}</p>
                    <div>
                        <Typography className="text-xl font-medium text-light-primary">
                            {numeral(price).format('0,0')}
                        </Typography>
                    </div>
                </div>
                <Typography variant="small" className="font-normal opacity-75 text-light-on-surface-variant">
                    {description}
                </Typography>
                {product && product.ratings && product.ratings.length > 0 ? (
                    showAverage(product)
                ) : (
                    <Typography className="pt-2 text-light-on-surface text-xs">No ratings yet</Typography>
                )}
            </CardBody>
            <CardFooter className="w-full flex items-center justify-between space-x-2">
                <Link to={`/product/${slug}`}>
                    <Button
                        size="sm"
                        ripple
                        variant="outlined"
                        className="flex items-center space-x-1 rounded-full border-light-outline hover:bg-light-primary/8 text-light-primary shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                    >
                        {/* <EyeIcon className="w-6 h-6" /> */}
                        <Typography className="text-xs font-bold">View Product</Typography>
                    </Button>
                </Link>
                    <Button
                        fullWidth
                        size="sm"
                        onClick={handleAddToCart}
                        disabled={product.quantity < 1}
                        className="flex items-center space-x-1 rounded-full bg-light-primary text-light-on-primary shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                    >
                        <ShoppingCartIcon className="w-6 h-6" />
                        {product.quantity < 1 ? (
                            <Typography className="text-xs font-bold">Out of stock</Typography>
                        ) : (
                            <Typography className="text-xs font-bold">Add to Cart</Typography>
                        )}
                    </Button>
            </CardFooter>
        </Card>

        // {/* <Card
        //     cover={
        //         // <Link to={`/product/${slug}`}>
        //         <Link to={config.routes.product}>
        //             <img
        //                 src={images && images.length ? images[0].url : unknown}
        //                 alt={title}
        //                 style={{ height: '230px', objectFit: 'cover' }}
        //                 className="p-1"
        //             />
        //         </Link>
        //     }
        //     actions={[
        //         <Link to={config.routes.product}>
        //             <EyeOutlined className="text-warning" /> <br /> View Product
        //         </Link>,
        //         <Tooltip title={tooltip}>
        //             <button className="btn mb-2" onClick={handleAddToCart} disabled={product.quantity < 1}>
        //                 <ShoppingCartOutlined className="text-danger" /> <br />{' '}
        //                 {product.quantity < 1 ? 'Out of stock' : 'Add to Cart'}
        //             </button>
        //         </Tooltip>,
        //     ]}
        // >
        //     <Meta
        //         title={`${title} - ${price} VND`}
        //         description={`${description && description.substring(0, 60)}...`}
        //     />
        // </Card> */}
    );
};

export default ProductCard;