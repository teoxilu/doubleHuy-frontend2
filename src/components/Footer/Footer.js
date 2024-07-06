import { Typography, IconButton } from '@material-tailwind/react';
import { FacebookIcon, GithubIcon, TwitterIcon } from '~/components/Icons';
import images from '~/images';
import config from '~/config';
import { Link } from 'react-router-dom';
import { configure } from '@testing-library/react';
import AdvertiseBannerSection from '~/components/home/AdvertiseBannerSection';

const LINKS = [
    {
        title: 'Link',
        items: ['Shop', 'About', 'Contact'],
    },
    {
        title: 'Help',
        items: ['FAQs', 'Term of Use', 'Privacy Policy', 'Shipping and Returns Policy'],
    },
];
function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <>
            <AdvertiseBannerSection />
            <footer className={`px-40 py-4 divide-y divide-light-outline-variant bg-light-surface-container-lowest`}>
                <div className="flex justify-between mb-6">
                    <div className="flex-col space-y-8">
                        <img src={images.logo2} alt="Logo" className="h-auto max-w-full max-h-20 rounded-full z-50" />
                        <Typography className="text-base text-light-on-surface font-normal">
                            01 Vo Van Ngan, Linh Chieu, Thu Duc, Ho Chi Minh City, Vietnam
                        </Typography>
                        <Typography className="text-base text-light-on-surface font-normal">
                            Hotline: 0973711868{' '}
                        </Typography>
                        <div className="flex space-x-5 items-center">
                            <Link to="#">
                                <IconButton
                                    variant="text"
                                    className="rounded-full opacity-80 transition-opacity hover:opacity-100"
                                >
                                    <GithubIcon />
                                </IconButton>
                            </Link>
                            <Link to="#">
                                <IconButton
                                    variant="text"
                                    className="rounded-full opacity-80 transition-opacity hover:opacity-100"
                                >
                                    <FacebookIcon />
                                </IconButton>
                            </Link>
                            <Link to="#">
                                <IconButton
                                    variant="text"
                                    className="rounded-full opacity-80 transition-opacity hover:opacity-100"
                                >
                                    <TwitterIcon />
                                </IconButton>
                            </Link>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 justify-between gap-4">
                        {LINKS.map(({ title, items }) => (
                            <ul key={title}>
                                <Typography
                                    variant="small"
                                    className="text-light-on-surface-variant mb-3 font-medium opacity-40"
                                >
                                    {title}
                                </Typography>
                                {items.map((link) => (
                                    <li key={link}>
                                        <Link
                                            as="a"
                                            to={link === 'Shop' ? '/shop' : '#'}
                                            className="hover:text-light-primary"
                                        >
                                            <Typography className="py-1.5 font-normal transition-colors text-light-on-surface hover:text-light-primary">
                                                {link}
                                            </Typography>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </div>
                </div>
                <div>
                    <Typography
                        variant="small"
                        className="mt-6 mb-4 text-light-on-surface
                         md:mb-0 font-normal"
                    >
                        &copy; {currentYear} 2HS. All Rights Reserved.
                    </Typography>
                </div>
            </footer>
        </>
    );
}

export default Footer;
