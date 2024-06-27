import React from 'react';
import { Typography, Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon, EyeIcon } from '@heroicons/react/24/outline';
// import JumboTron from "../components/cards/JumboTron";
import NewArrivals from '../components/home/NewArrivals';
import BestSellers from '../components/home/BestSellers';
import CategoryList from '../components/category/CategoryList';
import SubList from '../components/sub/SubList';
import images from '~/images';
import config from '~/config';

const product = {
    ratings: [{ star: 2 }, { star: 2 }, { star: 2 }, { star: 2 }],
};
const Home = () => {
    const screenHeight = window.innerHeight;

    return (
        <div className="mt-24 overflow-x-hidden">
            <section className="relative flex">
                <img src={images.heroImage} alt="Shoe" className={`w-full h-[${screenHeight}px] md:h-auto -mt-64 object-cover rounded-lg`} />
                <div
                    className={`w-[552px] h-[440px] flex absolute self-center bottom-20 right-20 -translate-y-1/4 rounded-xl bg-light-surface-container-low px-14 py-8 flex-col justify-between`}
                >
                    <div className="flex-col space-y-2">
                        <Typography className="text-2xl text-light-on-surface">New Arrival</Typography>
                        <Typography className="text-[57px] font-bold text-light-on-surface leading-[64px]">
                            Discover Our New Collection
                        </Typography>
                        <Typography className="text-base text-light-on-surface-variant">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
                            ullamcorper mattis.
                        </Typography>
                    </div>
                    <Link to={config.routes.shop}>
                        <Button
                            ripple
                            className="lg:inline-block rounded-full bg-light-primary 
                                "
                        >
                            <Typography className="text-light-on-primary hover:bg-light-on-primary/8 text-sm font-medium">
                                Purchase Now!
                            </Typography>
                        </Button>
                    </Link>
                </div>
            </section>

            <section className="mt-[68px]">
                <Typography className="w-full py-4 text-center text-[32px] leading-10 bg-gradient-to-r from-light-secondary via-light-primary to-light-tertiary text-light-on-primary-container rounded-lg">
                    Best Sellers
                </Typography>

                <BestSellers />
            </section>
        </div>
    );
};

export default Home;
